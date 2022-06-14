const express = require("express");
const router = express.Router();
const { check} = require("express-validator");
const {createSidebar,getSidebarData,updateSidebar,deleteSidebar} = require("../controllers/sidebar");


//actual routes
router.post("/create-sidebar",[
    check("title").not().isEmpty().withMessage('Must Have value')
],createSidebar);
router.post("/get-sidebar",getSidebarData);
router.put("/update-sidebar/:id",[
    check("title").not().isEmpty().withMessage('Must Have value')
],updateSidebar);
router.delete("/delete-sidebar/:id",deleteSidebar);
module.exports = router;

