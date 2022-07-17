const User = require("../models/user");

const {validationResult} = require("express-validator");

require('dotenv').config();


exports.getUser =  (req,res)=>{
    User.findOne({_id:req.user._id}).select('-password').exec((err,user)=>{
        if(err){
            return res.status(400).json({
                message : "Something Went Wrong"
            })
        }
        return res.json(user);
    })    
}


exports.updateUser =  (req,res)=>{
    id = req.params.id;
    const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }
  data = {
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    company_name : req.body.company_name,
    phone_number : req.body.phone_number,
    street : req.body.street,
    house_number : req.body.house_number,
    about : req.body.about,
    postal_code : req.body.postal_code,
    city : req.body.city,
    land : req.body.land,
    sales_tax_id : req.body.sales_tax_id
  }
  User.findOneAndUpdate(
    {_id:req.user._id},
    {$set : data},
    {new: true, select: "-password"},
    (err,user) => {
        if(err){
            return res.status(404).json({
                error : err
            })
        
        }

        if(user===null){
            return res.status(404).json({
                message : "No Data Found"
            })
        }

        return res.json(user);
    }
    )   
}


exports.userDeactivate =  (req,res)=>{
    id = req.params.id;
    const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }
  data = {
    status : 0
  }
  User.findOneAndUpdate(
    {_id:id},
    {$set : data},
    {new: true, select: "-password"},
    (err,user) => {
        if(err){
            return res.status(404).json({
                error : err
            })
        
        }

        if(user===null){
            return res.status(404).json({
                message : "No Data Found"
            })
        }

        return res.json({message:"User Deactive Successfully."});
    }
    )   
}

exports.userActive =  (req,res)=>{
    id = req.params.id;
    const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }
  data = {
    status : 1
  }
  User.findOneAndUpdate(
    {_id:id},
    {$set : data},
    {new: true, select: "-password"},
    (err,user) => {
        if(err){
            return res.status(404).json({
                error : err
            })
        
        }

        if(user===null){
            return res.status(404).json({
                message : "No Data Found"
            })
        }

        return res.json({message:"User Activate Successfully."});
    }
    )   
}

exports.getUserListing =  (req,res)=>{
    User.find({role:'user'}).select('-password').exec((err,user)=>{
        if(err){
            return res.status(400).json({
                message : "Something Went Wrong"
            })
        }
        return res.json(user);
    })    
}
exports.getUserAdmin =  (req,res)=>{
    User.findOne({_id:req.params.id}).select('-password').exec((err,user)=>{
        if(err){
            return res.status(400).json({
                message : "Something Went Wrong"
            })
        }
        return res.json(user);
    })    
}

exports.updateUserAdmin =  (req,res)=>{
    id = req.params.id;
    const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }
  data = {
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    company_name : req.body.company_name,
    phone_number : req.body.phone_number,
    street : req.body.street,
    house_number : req.body.house_number,
    about : req.body.about,
    postal_code : req.body.postal_code,
    city : req.body.city,
    land : req.body.land,
    sales_tax_id : req.body.sales_tax_id
  }
  User.findOneAndUpdate(
    {_id:id},
    {$set : data},
    {new: true, select: "-password"},
    (err,user) => {
        if(err){
            return res.status(404).json({
                error : err
            })
        
        }

        if(user===null){
            return res.status(404).json({
                message : "No Data Found"
            })
        }

        return res.json(user);
    }
    )   
}

exports.deleteUser = (req,res) =>{
    let id = req.params.id;
    User.deleteOne(
        {_id : id,role:'user'},
        (err,user) => {
            if(err){
                return res.status(404).json({
                    error : err
                })
            
            }
            
            if(user.deletedCount==1){
                return res.json({id : id});
            }
            if(user.deletedCount==0){
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