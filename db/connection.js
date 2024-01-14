const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database Connected Successfully at ${mongoose.connection.host}😄`.blue);
  } catch (error) {
    console.log("Something Went wrong".red);
    console.log(error);
  }
};

module.exports = connectDB;
