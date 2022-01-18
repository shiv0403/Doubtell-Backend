const mongoose = require("mongoose");
const { Schema } = mongoose;

const answerSchema = new Schema(
  {
    author_id: {
      type: Schema.Types.ObjectId,
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
    doubt_id: {
      type: Schema.Types.ObjectId,
      ref: "Doubt",
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    disLikes: {
      type: Number,
      default: 0,
    },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    bookmarks: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Answer = mongoose.model("Answer", answerSchema);

module.exports = Answer;
