const mongoose = require("mongoose");
const { Schema } = mongoose;

const doubtSchema = new Schema(
  {
    doubt: {
      type: String,
      required: true,
    },
    author_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    author_name: {
      type: String,
      required: true,
    },
    author_imgUrl: {
      type: String,
    },
    stars: {
      type: Number,
      default: 0,
    },
    doubt_answers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answer",
      },
    ],
    category: {
      type: String,
      required: true,
    },
    doubt_imgs: [{ type: String }],
  },
  { timestamps: true }
);

const Doubt = mongoose.model("Doubt", doubtSchema);

module.exports = Doubt;
