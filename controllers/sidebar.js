const Sidebar = require("../models/sidebar");
const {validationResult} = require("express-validator");

exports.createSidebar = (req,res) =>{
    
    sidebar =new Sidebar(req.body);
    sidebar.save((err,order)=>{
        if(err){
            return res.status(400).json({
                message : "Unable to sabe in db"
            })
        }
        return res.json(sidebar);
    })
}

exports.getSidebarData = (req,res)=>{

    Sidebar.find().exec((err,order)=>{
        if(err){
            return res.status(400).json({
                message : "No Data Found"
            })
        }
        return res.json(order);
    })    
}

exports.updateSidebar = (req,res) =>{
    id = req.params.id;
    const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }
  data = {
    title : req.body.title
  }
  Sidebar.findByIdAndUpdate(
    {_id : id},
    {$set : data},
    {new: true},
    (err,sidebar) => {
        if(err){
            return res.status(404).json({
                error : err
            })
        
        }

        return res.json(sidebar);
    }
    )   
}

exports.deleteSidebar = (req,res) =>{
    let id = req.params.id;
    Sidebar.deleteOne(
        {_id : id},
        (err,calender) => {
            if(err){
                return res.status(404).json({
                    error : err
                })
            
            }
    
            return res.json({id : id});
        }
        )
  }
