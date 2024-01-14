const User = require("../models/userSchema");
const sendToken = require("../utils/sendToken");

// Register User
const registerUserController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter all the fields",
      });
    }
    let user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        success: false,
        message: "Email Already Exists",
      });
    }
    //  add user to the database
    user = await User.create({ username, email, password });
    sendToken(res, user, "user registered successfully", 201);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Intrnal Server Error While Registering the User",
    });
  }
};

// Login User
const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please Fill All The Fields",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User Doesn't Exists",
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    sendToken(res, user, `Welcome Back,${user.username}`, 200);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Intrnal Server Error While Login the User",
    });
  }
};


// Logout User
const logoutUserController = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
      })
      .json({
        success: true,
        message: "User Loggeout Successfullly",
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Intrnal Server Error While Logout the User",
    });
  }
};


// Get User Profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({
      success:true,
      user
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Intrnal Server Error While Getting the User",
    });
  }
};


// Update Profile
const updateUserProfile = async (req, res) => {
  try {
    res.json("update Controller");
  
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Intrnal Server Error While Updating the User",
    });
  }
};

module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  getUserProfile,
  updateUserProfile,
};
