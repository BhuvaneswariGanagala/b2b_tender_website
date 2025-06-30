// controllers take requests, interact with models, and send back responses

const User = require("../models/user-module");
const bcrypt=require("bcryptjs");

const home = async (req, res) => {
    try {
        res.json("hello it is register page welcome through the controller");
    } catch (error) {
        console.log(error);
    }
};

const register = async (req, res) => {
    try {
        console.log(req.body);
        const {username,email,password}=req.body;
        const userExist=await User.findOne({email});
        if(userExist){
            return res.status(400).json({message:"email already exists"})
        }

        //hash the password
        // const saltRound=10;
        // const hash_password=await bcrypt.hash(password,saltRound);
         const userCreated=await User.create(
            {
                username,
                email,
                password //:hash_password,
            });

         res.status(200).json({msg:"Registration is successfull"/*userCreated*/,token: await userCreated.generateToken(),
            userid:userCreated._id.toString()});
    } catch (error) {
        console.log("internal server error");
    }
};
/* login...............................................*/
const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const userExist=await User.findOne({email});

        if(!userExist){
            return res.status(400).json({message:"Invalid credentaials go for registration"});
        }
        // const user=await bcrypt.compare(password,userExist.password);
        const user=await userExist.comparePassword(password);

        if(user){
             res.status(200).json({msg:"login is successfull"/*userCreated*/,token: await userExist.generateToken(),
            userid:userExist._id.toString()});
        }else{
          res.status(401).json({message:"inavlid password"});
          
        }
    } catch (error) {
        res.status(500).json("internal server error in login page")
    }
}

//user logic-to send user data
const user=async(req,res)=>{
    try {
        const userData=req.user;
        console.log(userData);
        // res.status(200).json({message:"hi user"});
        return res.status(200).json({userData});
    } catch (error) {
        console.log(`error from user route ${error}`);
    }
}

module.exports = { home, register ,login,user};
