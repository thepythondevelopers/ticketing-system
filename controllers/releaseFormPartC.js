const ReleaseFormPartC = require("../models/releaseFormPartC");
const {validationResult} = require("express-validator");
var fs = require('fs');

exports.createFormPartC = (req,res) =>{
    const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }
   
  file_upload = (typeof(req.files.file_upload) != "undefined" && req.files.file_upload !== null) ? req.files.file_upload[0].filename : null; 
    data={
        introduction : req.body.introduction,
        fire_protection : req.body.fire_protection,
        alert_procedure : req.body.alert_procedure,
        safety_measures : req.body.safety_measures,
        extingush_measure : req.body.extingush_measure,
        fire_department : req.body.fire_department,
        aftercare : req.body.aftercare,
        site_specific : req.body.site_specific,
        appendix : req.body.appendix,
        file_upload : file_upload,
        user : req.user._id
    }    
    
    releaseFormPartC =new ReleaseFormPartC(data);
    releaseFormPartC.save((err,release)=>{
        if(err){
            return res.status(400).json({
                message : "Unable to save in db",
                error : err
            })
        }
        return res.json(release);
    })
}
