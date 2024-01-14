const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");


const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please Login To Access",
      });
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded._id);
    next();
  } catch (error) {
    console.log(error);
   res.status(500).json({
    success:false,
    message:"Internal Server Error While Authenticating User"
   })
  }
};

module.exports = {isAuthenticated};
