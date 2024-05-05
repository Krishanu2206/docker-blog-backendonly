const protect=(req, res, next)=>{
    const user = req.session.user;
    
    if(!user){
        return res.status(400).send({
            status:"failed",
            message:"unauthorised"
        })
    }

    req.user=user;
    next();
}

module.exports=protect;