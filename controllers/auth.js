const User = require("../models/user");
const {validationResult} = require("express-validator");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');
var jwt = require('jsonwebtoken');
require('dotenv').config();



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

  
  User.create(user_data)
  .then(async user => {

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
          
        var token = jwt.sign({ id: user.guid, access_group: user.access_group }, process.env.SECRET,{ expiresIn: '1d'  });


        user_email = user.email;

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
    guid = uuid();
  token = guid.replace(/-/g,""); 
  
    content =  { 
      password_reset_token: token
    }
    User.findOne({
      where: {
          email: req.body.email
             }
    }).then(function (user) {
     if (!user) {
        res.json({error:'User Not Found'});
     } else {

    User.update(
      content,
      { where: { email: req.body.email }
     }
    )
    .then(async data => {
      
      //url = process.env.BASE_URL+'api/confirm-password/'
      url = 'http://udify.pamsar.com/reset-password/'+token
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
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while generating reset password."
      });
    });
  } })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while checking user profile."
    });
  });
  } 

  exports.change_password = (req,res)=>{
    const password_reset_token = req.params.password_reset_token;
    User.findOne({
      where: {
        password_reset_token: password_reset_token
             }
    }).then(function (user) {
     if (!user) {
        res.json({error:'Token Expire or Incorrect'});
     } else { 
      content =  { 
        password: req.body.password,
        password_reset_token: ""
      }
      
      User.update(
        content,
        { where: { password_reset_token: password_reset_token }
       }
      )
      .then(data => {
        
        res.send({message:'Password Changed Successfully.'});
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while generating reset password."
        });
      });


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
  const token =
  req.body.token || req.query.token || req.headers["x-access-token"];
  UserToken.destroy({
    where: {
       token: token
    }
 }).then(function(rowDeleted){
   if(rowDeleted === 1){
      res.status(200).send({
        message:"Logout Successfully"
      });
    }
 }, function(err){
  res.status(500).send({
    message:
      err.message || "Some error occurred."
  }); 
 });
}

