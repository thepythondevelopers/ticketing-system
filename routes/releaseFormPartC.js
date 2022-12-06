const express = require("express");
const router = express.Router();
const { check} = require("express-validator");
const {createFormPartC} = require("../controllers/releaseFormPartC");
const {verifyToken} = require("../middleware/auth");
var multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
      cb(null,"./uploads/releaseform")
    },
    filename : function(req,file,cb){
      cb(null,Date.now()+file.originalname)
    }
  })
  
  const fileFilter = (req,file,cb)=>{
    if(file.mimetype==='image/jpeg' || file.mimetype==='image/png' || file.mimetype==='image/jpg'){
      cb(null,true)
    }else{
      cb(null,false)
    }
  }
  var upload = multer({
    storage:storage,
    fileFilter:fileFilter
  })

  router.post("/create-form-part-c",verifyToken,upload.fields([{name:'file_upload',maxCount:1}]),createFormPartC);

  
module.exports = router;