const Location = require("../models/location");
const {validationResult} = require("express-validator");
var fs = require('fs');

exports.createLocation = (req,res) =>{
    const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }
    data={
        company_name : req.body.company_name,
        house_number : req.body.house_number,
        street : req.body.street,
        postal_code : req.body.postal_code,
        city : req.body.city,
        location_image : req.file.filename,
        location : req.body.location,
        user : req.user._id
    }    
    location =new Location(data);
    location.save((err,location)=>{
        if(err){
            return res.status(400).json({
                message : "Unable to sabe in db"
            })
        }
        return res.json(location);
    })
}

exports.updateLocation =async (req,res) =>{
    let id = req.params.id;
    const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }
  if(req.file){
        data={
            company_name : req.body.company_name,
            house_number : req.body.house_number,
            street : req.body.street,
            postal_code : req.body.postal_code,
            city : req.body.city,
            location_image : req.file.filename,
            location : req.body.location,
            user : req.user._id
        }    
    }else{
        data={
            company_name : req.body.company_name,
            house_number : req.body.house_number,
            street : req.body.street,
            postal_code : req.body.postal_code,
            city : req.body.city,
            location : req.body.location,
            user : req.user._id
        }
    }  
    await Location.findOne({_id:id,user:req.user._id}).exec((err,l)=>{
        if(err){
            return res.status(400).json({
                message : "Something Went Wrong"
            })
        }
        fs.unlink('./uploads/'+l.location_image, function (err) {
            
            console.log('File deleted!');
        });
    })    

    await Location.findOneAndUpdate(
        {_id : id,user:req.user._id},
        {$set : data},
        {new: true},
        (err,location) => {
            if(err){
                return res.status(404).json({
                    error : err
                })
            
            }
    
            if(location===null){
                return res.status(404).json({
                    message : "No Data Found"
                })
            }
    
            return res.json(location);
        }
        )
}

exports.getSingleLocation =  (req,res)=>{
    let id = req.params.id;
    Location.findOne({_id:id,user:req.user._id}).exec((err,location)=>{
        if(err){
            return res.status(400).json({
                message : "Something Went Wrong"
            })
        }
        return res.json(location);
    })    
}

exports.getLocationData = (req,res)=>{
    Location.find({user:req.user._id}).exec((err,location)=>{
        if(err){
            return res.status(400).json({
                message : "No Data Found"
            })
        }
        return res.json(location);
    })    
}


exports.deleteLocation = (req,res) =>{
    let id = req.params.id;
    Location.deleteOne(
        {_id : id,user:req.user._id},
        (err,location) => {
            if(err){
                return res.status(404).json({
                    error : err
                })
            
            }
            
            if(location.deletedCount==1){
                return res.json({id : id});
            }
            if(location.deletedCount==0){
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