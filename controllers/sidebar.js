const Sidebar = require("../models/sidebar");


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
