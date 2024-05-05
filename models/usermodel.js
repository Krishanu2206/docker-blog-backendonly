const mongoose=require("mongoose");

const userschema=new mongoose.Schema({
    username:{
        type:String,
        required:[true, "USER MUST HAVE A USERNAME"],
        unique:true
    },
    password:{
        type:String,
        required:[true, "USER MUST HAVE A PASSWORD"]
    },
}, {timestamps:true});

const User=mongoose.model("User", userschema);
module.exports=User;