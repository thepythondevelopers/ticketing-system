const express = require("express");
const router = express.Router();
const { check} = require("express-validator");
const {createSidebar,getSidebarData,getCheckedSidebarData,updateSidebar,deleteSidebar,checkedSidebar,uncheckedSidebar} = require("../controllers/sidebar");
const {verifyToken} = require("../middleware/auth");

//actual routes
router.post("/create-sidebar",verifyToken,[
    check("title").not().isEmpty().withMessage('Must Have value'),
    check("location").not().isEmpty().withMessage('Must Have value')
],createSidebar);
router.post("/get-sidebar/:location_id",verifyToken,getSidebarData);
router.post("/get-checked-sidebar/:location_id",verifyToken,getCheckedSidebarData);

router.put("/update-sidebar/:id",verifyToken,[
    check("title").not().isEmpty().withMessage('Must Have value'),
    check("checked").not().isEmpty().withMessage('Must Have value')
],updateSidebar);
router.delete("/delete-sidebar/:id",verifyToken,deleteSidebar);

router.put("/checked-sidebar/:id",verifyToken,checkedSidebar);
router.put("/unchecked-sidebar/:id",verifyToken,uncheckedSidebar);
module.exports = router;

