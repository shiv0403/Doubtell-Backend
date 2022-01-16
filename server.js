//importing packages
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();
dotenv.config();

//basic middlewares
app.use(cookieParser());
app.use(morgan("tiny"));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use("/public", express.static("public"));

//importing routes
const authRoutes = require("./routes/auth");
const uploadImgRoute = require("./routes/uploadImg");
const doubtRoutes = require("./routes/doubt");
const { checkUser } = require("./Middlewares/authMiddleware");

const PORT = process.env.PORT || 8080;

//mongodb connection
mongoose.connect(process.env.MONGO_URL, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to Mongodb!");
  }
});

//global app middlewares for routes
app.use("/api/auth", authRoutes);
app.use("/api/upload-img", uploadImgRoute);
app.use("/api/doubt", doubtRoutes);

app.get("*", checkUser);
app.get("/", (req, res) => {
  res.send("This is home route");
});

//app listening on PORT
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});
