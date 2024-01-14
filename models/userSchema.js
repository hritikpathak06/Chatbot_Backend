const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//models
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "USername is Required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password length should be 6 character long"],
    },
    customerId: {
      type: String,
      default: "",
    },
    subscription: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);


// Hashed Password
userSchema.pre('save',async function(next){
  if(!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password,10);
  next();
})

// Compare Password
userSchema.methods.comparePassword = async function(password){
  console.log("Password:" ,this.password);
  return await bcrypt.compare(password,this.password);
}

// Get JWT Token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id },process.env.JWT_SECRET_KEY, {
    expiresIn: "15d",
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
