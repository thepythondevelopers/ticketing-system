const Calender = require("../models/calender");
const {validationResult} = require("express-validator");

exports.createCalender = (req,res) =>{
    const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }
  data = {
        startDate : req.body.startDate,
        endDate : req.body.endDate,
        title : req.body.title,
        notes : req.body.notes,
        user : req.user._id,
        location : req.body.location
    }
  
    calender =new Calender(data);
    calender.save((err,calender)=>{
        if(err){
            return res.status(400).json({
                message : "Unable to sabe in db"
            })
        }
        return res.json(calender);
    })
}

exports.getCalenderData = (req,res)=>{
    Calender.find({user:req.user._id,location:req.params.location_id}).exec((err,calender)=>{
        if(err){
            return res.status(400).json({
                message : "No Data Found"
            })
        }
        return res.json(calender);
    })    
}

exports.updateCalender = (req,res) =>{
    id = req.params.id;
    const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }
  data = {
    startDate : req.body.startDate,
    endDate : req.body.endDate,
    title : req.body.title,
    notes : req.body.notes
  }
  Calender.findOneAndUpdate(
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

exports.deleteCalender = (req,res) =>{
    let id = req.params.id;
    Calender.deleteOne(
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