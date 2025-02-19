const express = require("express");
const router = express.Router();

const { home, homeDummy } = require("../controllers/homeController");

router.route("/home").get(home);
router.route("/homeDummy").get(homeDummy);

module.exports = router;
