const axios = require("axios");

const openAi = async (req, res) => {
  try {
    const { message } = req.body;
    const apiKey = process.env.OPENAI_API_KEY;

    const response = await axios.post(
      "https://api.openai.com/v1/engines/gpt-3.5-turbo-instruct/completions",
      {
        prompt: message,
        max_tokens: 100,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const answer = response.data.choices[0].text.trim();
    res.json({ answer });
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error("API Response Data:", error.response.data);
      console.error("API Response Status:", error.response.status);
      console.error("API Response Headers:", error.response.headers);
      res
        .status(error.response.status)
        .json({ error: "OpenAI API Error", details: error.response.data });
    } else if (error.request) {
      console.error("No response from OpenAI API");
      res.status(500).json({ error: "No response from OpenAI API" });
    } else {
      console.error("Error during request setup", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

module.exports = { openAi };
