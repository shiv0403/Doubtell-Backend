//importing packages
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");

const cookieParser = require("cookie-parser");

const app = express();
dotenv.config();

//mongodb
require("./db");

//basic middlewares
app.use(cookieParser());
app.use(morgan("tiny"));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  const allowedOrigins = ["https://doubtell-main.netlify.app/"];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  return next();
});

app.use("/public", express.static("public"));

//importing routes
const authRoutes = require("./routes/auth");
const uploadImgRoute = require("./routes/uploadImg");
const doubtRoutes = require("./routes/doubt");
const userRoutes = require("./routes/user");
const answerRoutes = require("./routes/answer");
const conversationRoutes = require("./routes/conversation");
const messageRoutes = require("./routes/message");
const commentRoutes = require("./routes/comment");
const { checkUser } = require("./Middlewares/authMiddleware");

const PORT = process.env.PORT || 8080;

//global app middlewares for routes
app.get("*", checkUser);
app.use("/api/auth", authRoutes);
app.use("/api/upload-img", uploadImgRoute);
app.use("/api/doubt", doubtRoutes);
app.use("/api/user", userRoutes);
app.use("/api/answer", answerRoutes);
app.use("/api/conversation", conversationRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/comment", commentRoutes);

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
