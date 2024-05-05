const mongoose=require("mongoose");

const postschema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, "post must have title"]
    },
    description:{
        type:String,
        required:[true, "post must have body"]
    }
}, {timestamps:true})

const Post = mongoose.model('Post', postschema);
module.exports=Post;