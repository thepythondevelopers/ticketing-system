const express = require("express");
const router = express.Router();
const { check} = require("express-validator");
const {createCalender,getCalenderData,updateCalender,deleteCalender} = require("../controllers/calender");
const {verifyToken} = require("../middleware/auth");


//actual routes
router.post("/create-calender",verifyToken,[
    check("startDate").not().isEmpty().withMessage('Must Have value'),
    check("endDate").not().isEmpty().withMessage('Must Have value'),
    check("title").not().isEmpty().withMessage('Must Have value'),
    check("notes").not().isEmpty().withMessage('Must Have value'),
    check("location").not().isEmpty().withMessage('Must Have value')
],createCalender);
router.post("/get-calender/:location_id",verifyToken,getCalenderData);
router.put("/update-calender/:id",[
    check("startDate").not().isEmpty().withMessage('Must Have value'),
    check("endDate").not().isEmpty().withMessage('Must Have value'),
    check("title").not().isEmpty().withMessage('Must Have value'),
    check("notes").not().isEmpty().withMessage('Must Have value')
],verifyToken,updateCalender);
router.delete("/delete-calender/:id",verifyToken,deleteCalender);

module.exports = router;

