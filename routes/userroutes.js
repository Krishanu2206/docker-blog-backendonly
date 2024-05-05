const express= require("express");
const {signup, login}= require("../controllers/authcontroller");

const router=express.Router();

//defining routes
router.post("/signup", signup);
router.post("/login", login);

module.exports=router;