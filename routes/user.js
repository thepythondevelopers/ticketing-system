const express = require("express");
const router = express.Router();
const { check} = require("express-validator");
const {getUser,updateUser,userActive,userDeactivate} = require("../controllers/user");
const {verifyToken,adminroleCheck} = require("../middleware/auth");

//actual routes
router.post("/get-profile",verifyToken,getUser);
router.put("/update-profile",verifyToken,[
    check("first_name").not().isEmpty().withMessage('Must Have value'),
    check("last_name").not().isEmpty().withMessage('Must Have value'),
    check("company_name").not().isEmpty().withMessage('Must Have value'),
    check("phone_number").not().isEmpty().withMessage('Must Have value'),
    check("street").not().isEmpty().withMessage('Must Have value'),
    check("house_number").not().isEmpty().withMessage('Must Have value'),
    check("about").not().isEmpty().withMessage('Must Have value')
],updateUser);

router.post("/user-active/:id",verifyToken,adminroleCheck,userActive);
router.post("/user-deactive/:id",verifyToken,adminroleCheck,userDeactivate);


module.exports = router;

