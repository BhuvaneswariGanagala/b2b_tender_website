const jwt = require('jsonwebtoken');
const User=require("../models/user-module");
const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("Decoded token:", decoded); // 👈 Add this

    const userData=await User.findOne({email:decoded.email}).
    select(
      {password:0,
      });
    console.log(userData);
    req.user=userData;
    req.token=token;
    req.userID=userData._id;
    next();
  } catch (error) {
    console.error("JWT Error:", error.message); // 👈 Add this
    return res.status(401).json({ message: "Token is not valid" });
  }
};
module.exports=protect;