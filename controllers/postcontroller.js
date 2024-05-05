const Post=require("../models/postmodel");

const getallposts=async(req, res, next)=>{
    try{
        const posts=await Post.find({});
        return res.status(200).send({
            status: "success",
            result:posts.length,
            data:posts
        })
    }catch(err){
        return res.status(500).send({
            status:"failed",
            error:err
        })
    }
};

const getonepost=async(req,res,next)=>{
    try{
        const {id}=req.params;
        const post=await Post.findById(id);
        return res.status(200).send({
            status: "success",
            data:post
        })
    }catch(err){
        return res.status(500).send({
            status:"failed",
            error:err
        })
    }
}

const createpost=async(req, res, next)=>{
    try{
        const {title, description}=req.body;
        const newpost=new Post({
            title:title,
            description:description
        });

        await newpost.save();

        return res.status(200).send({
            status:"success",
            data:newpost
        });
    }catch(err){
        return res.status(500).send({
            status:"failed",
            error:err
        })
    }
}

const updatepost=async(req,res,next)=>{
    try {
        const id=req.params.id;
        const updatedpost=await Post.findByIdAndUpdate(id, req.body, {new:true, runValidators:true});

        return res.status(200).send({
            status:"success",
            data:updatedpost
        })
    } catch (error) {
        return res.status(500).send({
            status:"failed",
            error:error
        })
    }
}

const deletepost=async(req,res,next)=>{
    try{
        const {id}=req.params;
        const post=await Post.findByIdAndDelete(id);
        return res.status(200).send({
            status: "success",
            data:post
        })
    }catch(err){
        return res.status(500).send({
            status:"failed",
            error:err
        })
    }
}
module.exports={
    getallposts, getonepost, createpost, updatepost, deletepost
}