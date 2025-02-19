const mongoose = require("mongoose");

const mailSchema = new mongoose.Schema({
  email: String,
  subject: String,
  sender: String,
  body: String,
  receivedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("mail", mailSchema);
