const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");

const app = express();

const authRoutes = require("./routes/auth");

dotenv.config();

const PORT = process.env.PORT || 8080;

//mongodb connection
mongoose.connect(process.env.MONGO_URL, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to Mongodb!");
  }
});

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("This is home route");
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});
