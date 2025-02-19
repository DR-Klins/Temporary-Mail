const express = require("express");
const router = express.Router();
const axios = require("axios");
const crypto = require("crypto");
const { generateTemporaryMail } = require("../controllers/GTMcontroller");
const apiKey = process.env.API_KEY;

// Function to generate MD5 hash of an email

const md5Hash = (email) => {
  return crypto
    .createHash("md5")
    .update(email.trim().toLowerCase())
    .digest("hex");
};

// API Route to fetch temp mail data
router.get("/get-temporary-mail-data", async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const emailHash = md5Hash(email); // Convert email to MD5
    const options = {
      method: "GET",
      url: `https://privatix-temp-mail-v1.p.rapidapi.com/request/mail/id/${emailHash}/`,
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "privatix-temp-mail-v1.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);
    res.json(response.data); // Send API response to client
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch temp mail data" });
  }
});

// API Route to fetch temp mail id
router.route("/get-temporary-mail").get(generateTemporaryMail);

module.exports = router;
