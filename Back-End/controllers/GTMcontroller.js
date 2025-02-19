const BigPromise = require("../middlewares/bigPromise");
const crypto = require("crypto");

// Array of random domains
const randomDomains = [
  "@cevipsa.com",
  "@cpav3.com",
  "@nuclene.com",
  "@steveix.com",
  "@mocvn.com",
  "@tenvil.com",
  "@tgvis.com",
  "@amozix.com",
  "@anypsd.com",
  "@maxric.com",
];

exports.generateTemporaryMail = BigPromise(async (req, res) => {
  const randomString = crypto.randomBytes(3).toString("hex"); // Random 6-character string
  const randomDomain =
    randomDomains[Math.floor(Math.random() * randomDomains.length)]; // Pick a random domain
  const email = `${randomString}@${randomDomain}`;
  res.status(200).json({ success: true, email });
});
