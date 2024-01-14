const express = require("express");
const { registerUserController, loginUserController, logoutUserController, getUserProfile, updateUserProfile } = require("../controllers/userController");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();


router.route("/register").post(registerUserController);
router.route("/login").post(loginUserController);
router.route("/logout").post(logoutUserController);
router.route("/me").get(isAuthenticated, getUserProfile).put(updateUserProfile);



module.exports = router;