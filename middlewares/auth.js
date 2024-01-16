const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET_KEY
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    res.status(404).send({
      success: false,
      message: "Please login to continue the process",
    });
  }
};

module.exports = { isAuthenticated };
