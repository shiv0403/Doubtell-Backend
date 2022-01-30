const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    comment_authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isSuperParent: {
      type: Boolean,
      required: true,
    },
    parent_commentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    answerId: {
      type: Schema.Types.ObjectId,
      ref: "Answer",
      required: true,
    },
    replies: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
