const mongoose = require("mongoose");
const { isEmail } = require("validator");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Please enter an email address"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "Enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [6, "Minimum length of password is 6 characters"],
    },
    age: {
      type: Number,
      required: [true, "Please enter your age"],
    },
    school: {
      type: String,
      required: [true, "Please enter your school name"],
    },
    user_doubts: [{ type: Schema.Types.ObjectId, ref: "Doubt" }],
    user_answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    followings: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
