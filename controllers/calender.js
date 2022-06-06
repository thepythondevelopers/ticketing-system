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
