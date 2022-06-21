const UserToken = require("../models/userToken");
const Drag = require("../models/drag");
var jwt = require('jsonwebtoken');
exports.verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({error:"A token is required for authentication"});
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    
    user_token = await UserToken.findOne({token: token});
   if (user_token === null) {
    return res.status(401).send({
      error : "Token Not Found"
    });
  }
  req.user = decoded;

  } catch (err_m) {
    return res.status(401).send({
      error : "Invalid Token",
      error_m :err_m
    });
  }
  return next();
};

exports.checkDragExist = async (req, res, next) => {
  
drag = await Drag.findOne({user:req.user._id});
if(drag!=null){
  return res.status(401).json({
    message : "Already Exist"
    })
  }
return next();  
}