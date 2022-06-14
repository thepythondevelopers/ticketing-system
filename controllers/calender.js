const Calender = require("../models/calender");
const {validationResult} = require("express-validator");

exports.createCalender = (req,res) =>{
    const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }
    calender =new Calender(req.body);
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
    Calender.find().exec((err,order)=>{
        if(err){
            return res.status(400).json({
                message : "No Data Found"
            })
        }
        return res.json(order);
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
  Calender.findByIdAndUpdate(
    {_id : id},
    {$set : data},
    {new: true},
    (err,calender) => {
        if(err){
            return res.status(404).json({
                error : err
            })
        
        }

        return res.json(calender);
    }
    )   
}

exports.deleteCalender = (req,res) =>{
    let id = req.params.id;
    Calender.deleteOne(
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