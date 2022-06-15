const User = require("../models/user");
const UserToken = require("../models/userToken");
const {validationResult} = require("express-validator");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');
var jwt = require('jsonwebtoken');
require('dotenv').config();
const moment= require('moment') 
const sendGridMail = require('@sendgrid/mail');
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.signup =  (req,res)=>{
  
  const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }

  const hash = bcrypt.hashSync(req.body.password, 10);
  user_data = {
    password : hash,
    email: req.body.email
  }

  
  User.create(user_data).then(async user => {

    res.json({message : "Sign Up Successfully."
   
  });
  }).catch((err)=>{
    return res.status(400).json({
        message : "Unable to save in db",
        error : err 
    })
  })   
  
}; 

exports.signin = (req,res) =>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }
  const {email} = req.body;
  User.findOne({email}, function(err, user) {
    
   if (!user) {
      res.json({error:'User Not Found'});
   } else {
    bcrypt.compare(req.body.password, user.password, async function (err, result) {
      if (result == true) {
          //create token          
        var token = jwt.sign({ _id: user._id,email:user.email }, process.env.SECRET,{ expiresIn: '1d'  });
        user_email = user.email;

        

      await UserToken.create({token:token}).then( usertoken => {
      }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred."
        });
      });
      await UserToken.deleteOne({ created_at:{$lte:moment().subtract(2, 'days').toDate()} });

        res.json({token,user:{user_email}});
      } else {
        res.json({error:"Incorrect Password"});
      }
    });
  }
}).catch(err => {
  res.status(500).send({
    message:
      err.message || "Some error occurred."
  });
});
}




  exports.forget_password =  (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            error : errors.array()
        })
    }
    guid = uuidv4();
  token = guid.replace(/-/g,""); 
  
    content =  { 
      password_reset_token: token
    }
    User.findOne({email: req.body.email}).then(function  (user) {
     if (!user) {
        res.json({error:'User Not Found'});
     } else {
      User.findOneAndUpdate(
        {email: req.body.email},
        {$set : content},
        {new: true},
        async (err,calender) =>  {
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
          //url = process.env.BASE_URL+'api/confirm-password/'
      url = 'http://localhost:800/reset-password/'+token
      try {
        await sendGridMail.send(forgetpassword_email(req.body.email,url));
       
       console.log('Test email sent successfully');
        res.send({url:url,message:'Email Send Successfully'});
      } catch (error) {
        res.status(500).send({
          message:
            error.message || "Some error occurred while generating reset password."
        });
        
      }              
        })
  } })
  .catch(err => {
    res.status(500).send({
      message:err.message 
    });
  });
  } 

  exports.change_password = (req,res)=>{
    const password_reset_token = req.params.password_reset_token;
    User.findOne({password_reset_token: password_reset_token}).then(function (user) {
     if (!user) {
        res.json({error:'Token Expire or Incorrect'});
     } else { 
      const hash = bcrypt.hashSync(req.body.password, 10);
      content =  { 
        password: hash,
        password_reset_token: ""
      }
      

      User.findOneAndUpdate(
        {email:req.body.email},
        {$set : content},
        {new: true},
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
    
            res.send({message:'Password Changed Successfully.'});
        }
        )


     }
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating password."
      });
    });
  }



  function forgetpassword_email(email,url) {
    const body = `<p>Hello, Please click on the <a href="${url}">Link</a> to change the password</p>`;
    return {
      to: email,
      from: process.env.SENDGRID_FROM_ADDRESS,
      subject: 'Password Reset',
      text: body,
      html: `<strong>${body}</strong>`,
    };
  }
  

exports.logout = (req,res) =>{
  const token = req.headers["x-access-token"];
  UserToken.deleteOne({token: token}).then(function(rowDeleted){
   
    if(rowDeleted.deletedCount==1){
      res.status(200).send({
        message:"Logout Successfully"
      });
    }
    if(rowDeleted.deletedCount==0){
      res.status(200).send({
        message:"Not Found"
      });
    }
    
      res.status(401).send({
        message:"Something Went Wrong"
      });
    
 }, function(err){
  res.status(500).send({
    message:
      err.message || "Some error occurred."
  }); 
 });
}