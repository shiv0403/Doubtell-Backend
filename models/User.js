const mongoose = require("mongoose");
const { isEmail } = require("validator");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
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

    user_doubts: [{ type: Schema.Types.ObjectId, ref: "Doubt" }],
    user_answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    followings: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

//execute this after saving the doc
userSchema.post("save", function (doc, next) {
  // console.log(doc);
  next();
});

//execute this after saving the doc
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//static method for User model - login method
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    } else {
      throw Error("incorrect password");
    }
  } else {
    throw Error("incorrect email");
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
