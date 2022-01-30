const Comment = require("../models/Comment");

const comments_get = async (req, res) => {
  const { answerId } = req.params;
  try {
    const comments = await Comment.find({ answerId, isSuperParent: true });
    res.status(200).send(comments);
  } catch (err) {
    console.log(err);
    res.status(500).send("unable to get comments");
  }
};

const replies_get = async (req, res) => {
  const { commentId } = req.params;
  try {
    const replies = await Comment.find({ parent_commentId: commentId });
    console.log(replies);
    res.status(200).send(replies);
  } catch (err) {
    console.log(err);
    res.status(500).send("unable to get replies");
  }
};

const comment_post = async (req, res) => {
  const { answerId, userId, comment, isSuperParent } = req.body;
  try {
    if (isSuperParent) {
      const newComment = await Comment.create({
        comment,
        comment_authorId: userId,
        answerId,
        isSuperParent,
      });
    } else {
      const newComment = await Comment.create({
        comment,
        comment_authorId: userId,
        answerId,
        parent_commentId: req.body.parent_commentId,
        isSuperParent,
      });

      const updatedComment = await Comment.updateOne(
        {
          _id: req.body.parent_commentId,
        },
        {
          $push: {
            replies: newComment._id,
          },
        }
      );
    }

    res.status(201).send("Commented");
  } catch (err) {
    console.log(err);
    res.status(500).send("Unable to comment");
  }
};

module.exports = { comment_post, comments_get, replies_get };
