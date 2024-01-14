
const express = require("express");
const { openAi } = require("../controllers/openAiController");
const router = express.Router();

router.route("/chatbot").post(openAi);


module.exports = router