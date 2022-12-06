const ReleaseFormPartB = require("../models/releaseFormPartB");
const {validationResult} = require("express-validator");
var fs = require('fs');

exports.createFormPartB = (req,res) =>{
    const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({
          error : errors.array()
      })
  }
  fire_security_regulation = (typeof(req.files.fire_security_regulation) != "undefined" && req.files.fire_security_regulation !== null) ? req.files.fire_security_regulation[0].filename : null; 
  file_upload = (typeof(req.files.file_upload) != "undefined" && req.files.file_upload !== null) ? req.files.file_upload[0].filename : null; 
    data={
        introduction : req.body.introduction,
        fire_security_regulation : fire_security_regulation,
        fire_protection : req.body.fire_protection,
        fire_smoke_propegation : req.body.fire_smoke_propegation,
        rescue_routes : req.body.rescue_routes,
        sihnalization : req.body.sihnalization,
        behaviour : req.body.behaviour,
        report_fire : req.body.report_fire,
        observaion_alarm : req.body.observaion_alarm,
        bring_to_safety : req.body.bring_to_safety,
        attemp_extingush : req.body.attemp_extingush,
        special_rule : req.body.special_rule,
        appendix : req.body.appendix,
        file_upload : file_upload,
        user : req.user._id
    }    
    
    releaseFormPartB =new ReleaseFormPartB(data);
    releaseFormPartB.save((err,release)=>{
        if(err){
            return res.status(400).json({
                message : "Unable to save in db",
                error : err
            })
        }
        return res.json(release);
    })
}
