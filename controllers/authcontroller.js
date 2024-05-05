const User = require("../models/usermodel");
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Hash the password synchronously
        const hashedpassword = await bcrypt.hash(password, 10);

        const newuser = new User({
            username: username,
            password: hashedpassword
        });

        await newuser.save();

        return res.status(200).send({
            status: "success",
            data: newuser
        });
    } catch (err) {
        return res.status(500).send({
            status: "failed",
            error: err
        })
    }
};

const login =async(req, res)=>{
    try{
        const {username, password}= req.body;
        if(!username || !password){
            return res.status(400).send({
                status:"Failed",
                data:"Enter username and password"
            })
        }
        const user=await User.findOne({username:username});
        if(!user){
            return res.status(400).send({
                status:"failed",
                data:"Enter vaid username and password"
            })
        }
        const match = await bcrypt.compare(password, user.password);

        if(match) {
            req.session.user=user;
            console.log(req.session);
            return res.status(200).send({
                status:"success",
                data:`WELCOME ${username}`
            })
        }else{
            return res.status(400).send({
                status:"failed",
                data:"Enter valid username and password"
            })
        }
    }catch(err){
        res.status(500).send({
            status:"failed",
            data:"Try again later",
            error:err
        })
    }
}

module.exports = {signup, login};