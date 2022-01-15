const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  comment_authorId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  parent_commentId: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
  },
  replies: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
