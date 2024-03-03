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

require("./db");

app.use(cookieParser());
app.use(morgan("tiny"));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["https://doubtell-main.netlify.app", "http://localhost:3000"],
    credentials: true,
  })
);
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
  res.send("Server is healthy");
});

//app listening on PORT
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});
