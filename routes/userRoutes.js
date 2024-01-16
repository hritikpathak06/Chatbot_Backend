const express = require("express");
const { registerUserController, loginUserController, getUserProfile, updateUserProfile } = require("../controllers/userController");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();


router.route("/register").post(registerUserController);
router.route("/login").post(loginUserController);
router.route("/me").get(isAuthenticated, getUserProfile).put(updateUserProfile);



module.exports = router;