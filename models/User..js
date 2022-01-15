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
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    age: {
      type: Number,
      required: true,
    },
    school: {
      type: String,
      required: true,
    },
    user_doubts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Doubt",
      },
    ],
    user_answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    followings: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
