const Sidebar = require("../models/sidebar");
const {validationResult} = require("express-validator");

exports.createSidebar = (req,res) =>{
    const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }
    data={
        title : req.body.title,
        user : req.user._id
    }    
    sidebar =new Sidebar(data);
    sidebar.save((err,sidebar)=>{
        if(err){
            return res.status(400).json({
                message : "Unable to sabe in db"
            })
        }
        return res.json(sidebar);
    })
}

exports.getSidebarData = (req,res)=>{

    Sidebar.find({user:req.user._id,checked:0}).exec((err,order)=>{
        if(err){
            return res.status(400).json({
                message : "No Data Found"
            })
        }
        return res.json(order);
    })    
}

exports.getCheckedSidebarData = (req,res)=>{

    Sidebar.find({user:req.user._id,checked:1}).exec((err,order)=>{
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
  Sidebar.findOneAndUpdate(
    {_id : id,user:req.user._id},
    {$set : data},
    {new: true},
    (err,calender) => {
        if(err){
            return res.status(404).json({
                error : err
            })
        
        }

        if(calender===null){
            return res.status(404).json({
                message : "No Data Found"
            })
        }

        return res.json(calender);
    }
    )   
}

exports.deleteSidebar = (req,res) =>{
    let id = req.params.id;
    Sidebar.deleteOne(
        {_id : id,user:req.user._id},
        (err,calender) => {
            if(err){
                return res.status(404).json({
                    error : err
                })
            
            }
            if(calender.deletedCount==1){
                return res.json({id : id});
            }
            if(calender.deletedCount==0){
                return res.status(404).json({
                    message : "No Data Found"
                })
            }
            return res.status(404).json({
                message : "Something Went Wrong"
            })
    
            
        }
        )
  }
 
  exports.checkedSidebar = (req,res) =>{
    id = req.params.id;
    const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }
  data = {
    checked : 1,
    completedate : Date.now()
  }
  Sidebar.findOneAndUpdate(
    {_id : id,user:req.user._id},
    {$set : data},
    {new: true},
    (err,calender) => {
        if(err){
            return res.status(404).json({
                error : err
            })
        
        }

        if(calender===null){
            return res.status(404).json({
                message : "No Data Found"
            })
        }

        return res.json(calender);
    }
    )   
}

exports.uncheckedSidebar = (req,res) =>{
    id = req.params.id;
    const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }
  data = {
    checked : 0,
    completedate : null
  }
  Sidebar.findOneAndUpdate(
    {_id : id,user:req.user._id},
    {$set : data},
    {new: true},
    (err,calender) => {
        if(err){
            return res.status(404).json({
                error : err
            })
        
        }

        if(calender===null){
            return res.status(404).json({
                message : "No Data Found"
            })
        }

        return res.json(calender);
    }
    )   
}
 