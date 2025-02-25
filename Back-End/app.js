const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");

// Enable CORS for all origins
app.use(cors());

// Or enable CORS for specific origins (replace with your frontend URL)
app.use(
  cors({
    origin: "http://192.168.100.239:3000", // Allow only this frontend to access your backend
  })
);
//custom error middleware for easy front end
const productionError = require("./middlewares/productionError");

//regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//import all routes here
const home = require("./routes/home");
const mailHandling = require("./routes/mailHandling");

//router middleware
app.use("/api/v1", home);
app.use("/api/v1", mailHandling);

app.get("/", (req, res) => {
  res.json("home");
});

//to handle production error
app.use(productionError);

// export app js
module.exports = app;
