const express = require("express");
const router = express.Router();
const { check} = require("express-validator");
const {createSidebar,getSidebarData} = require("../controllers/sidebar");


//actual routes
router.post("/create-sidebar",[
    check("title").not().isEmpty().withMessage('Must Have value')
],createSidebar);
router.post("/get-sidebar",getSidebarData);

module.exports = router;

