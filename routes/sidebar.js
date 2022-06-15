const express = require("express");
const router = express.Router();
const { check} = require("express-validator");
const {createSidebar,getSidebarData,updateSidebar,deleteSidebar} = require("../controllers/sidebar");
const {verifyToken} = require("../middleware/auth");

//actual routes
router.post("/create-sidebar",verifyToken,[
    check("title").not().isEmpty().withMessage('Must Have value')
],createSidebar);
router.post("/get-sidebar",verifyToken,getSidebarData);
router.put("/update-sidebar/:id",verifyToken,[
    check("title").not().isEmpty().withMessage('Must Have value')
],updateSidebar);
router.delete("/delete-sidebar/:id",verifyToken,deleteSidebar);
module.exports = router;

