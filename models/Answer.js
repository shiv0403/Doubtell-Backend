const mongoose = require("mongoose");
const { Schema } = mongoose;

const answerSchema = new Schema(
  {
    author_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    answer: {
      type: String,
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
