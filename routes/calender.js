const express = require("express");
const router = express.Router();
const { check} = require("express-validator");
const {createCalender,getCalenderData,updateCalender,deleteCalender} = require("../controllers/calender");


//actual routes
router.post("/create-calender",[
    check("startDate").not().isEmpty().withMessage('Must Have value'),
    check("endDate").not().isEmpty().withMessage('Must Have value'),
    check("title").not().isEmpty().withMessage('Must Have value'),
    check("notes").not().isEmpty().withMessage('Must Have value')
],createCalender);
router.post("/get-calender",getCalenderData);
router.put("/update-calender/:id",[
    check("startDate").not().isEmpty().withMessage('Must Have value'),
    check("endDate").not().isEmpty().withMessage('Must Have value'),
    check("title").not().isEmpty().withMessage('Must Have value'),
    check("notes").not().isEmpty().withMessage('Must Have value')
],updateCalender);
router.delete("/delete-calender/:id",deleteCalender);

module.exports = router;

