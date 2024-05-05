const express= require("express");
const { getallposts, createpost, getonepost, updatepost, deletepost } = require("../controllers/postcontroller");
const protect=require("../middleware/authmiddleware");

const router=express.Router();

//defining routes
router
    .route("/")
    .get(protect, getallposts)
    .post(protect, createpost);

router
    .route("/:id")
    .get(protect, getonepost)
    .put(protect, updatepost)
    .delete(protect, deletepost);

module.exports=router;