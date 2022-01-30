const Answer = require("../models/Answer");
const Doubt = require("../models/Doubt");
const User = require("../models/User");
const Comment = require("../models/Comment");
const mongoose = require("mongoose");

const answers_post = async (req, res) => {
  console.log(req.body);
  const { answersId } = req.body;

  let newIds = [];
  for (let i = 0; i < answersId.length; ++i) {
    newIds[i] = mongoose.Types.ObjectId(answersId[i]);
  }
  try {
    const answers = await Answer.find({
      _id: {
        $in: newIds,
      },
    });
    console.log(answers);
    res.status(200).send(answers);
  } catch (err) {
    console.log(err);
    res.status(400).send({ err: "Answers not found" });
  }
};

const answer_post = async (req, res) => {
  const { content, doubtId, authorId, authorName } = req.body;
  try {
    const answer = await Answer.create({
      author_id: authorId,
      answer: content,
      doubt_id: doubtId,
      author_name: authorName,
    });
    const updateDoubt = await Doubt.updateOne(
      { _id: answer.doubt_id },
      {
        $push: {
          doubt_answers: answer._id,
        },
      }
    );
    const updatedUser = await User.updateOne(
      { _id: answer.author_id },
      {
        $push: {
          user_answers: answer._id,
        },
      }
    );

    res.status(201).send(answer);
  } catch (err) {
    console.log(err);
    res.status(400).send({ err: "Failed to submit doubt" });
  }
};

const answer_like = async (req, res) => {
  const { answerId, userId } = req.body;

  try {
    const user = await User.findOne({ _id: userId });
    const isLiked =
      user.user_likedPosts?.includes(mongoose.Types.ObjectId(answerId)) &&
      user.user_likedPosts.length;
    const isDisliked =
      user.user_dislikedPosts?.includes(mongoose.Types.ObjectId(answerId)) &&
      user.user_dislikedPosts.length;

    //moving from dislike to like
    if (isDisliked && !isLiked) {
      const updatedAnswer = await Answer.updateOne(
        { _id: answerId },
        {
          $inc: {
            likes: 1,
            disLikes: -1,
          },
        }
      );
      const updateUser = await User.updateOne(
        { _id: userId },
        {
          $push: {
            user_likedPosts: answerId,
          },
          $pull: {
            user_dislikedPosts: answerId,
          },
        }
      );
    }

    //liking first time
    if (!isLiked && !isDisliked) {
      const updatedAnswer = await Answer.updateOne(
        { _id: answerId },
        {
          $inc: {
            likes: 1,
          },
        }
      );
      const updateUser = await User.updateOne(
        { _id: userId },
        {
          $push: {
            user_likedPosts: answerId,
          },
        }
      );
    }

    //liking again / removing like
    if (isLiked) {
      const updatedAnswer = await Answer.updateOne(
        { _id: answerId },
        {
          $inc: {
            likes: -1,
          },
        }
      );
      const updateUser = await User.updateOne(
        { _id: userId },
        {
          $pull: {
            user_likedPosts: answerId,
          },
        }
      );
    }
    res.status(200).send("Answer liked");
  } catch (err) {
    console.log(err);
    res.status(400).send({ err: "Failed to like the answer" });
  }
};

const answer_dislike = async (req, res) => {
  const { answerId, userId } = req.body;
  try {
    const user = await User.findOne({ _id: userId });

    const isLiked =
      user.user_likedPosts?.includes(mongoose.Types.ObjectId(answerId)) &&
      user.user_likedPosts.length;
    const isDisliked =
      user.user_dislikedPosts?.includes(mongoose.Types.ObjectId(answerId)) &&
      user.user_dislikedPosts.length;

    //moving from like to dislike
    if (isLiked && !isDisliked) {
      const updatedAnswer = await Answer.updateOne(
        { _id: answerId },
        {
          $inc: {
            likes: -1,
            disLikes: 1,
          },
        }
      );

      const updatedUser = await User.updateOne(
        { _id: userId },
        {
          $push: {
            user_dislikedPosts: answerId,
          },
          $pull: {
            user_likedPosts: answerId,
          },
        }
      );
    }

    //disliking for first time
    if (!isLiked && !isDisliked) {
      const updatedAnswer = await Answer.updateOne(
        { _id: answerId },
        {
          $inc: {
            disLikes: 1,
          },
        }
      );

      const updatedUser = await User.updateOne(
        { _id: userId },
        {
          $push: {
            user_dislikedPosts: answerId,
          },
        }
      );
    }

    //disliking again (removing dislike)
    if (isDisliked) {
      const updatedAnswer = await Answer.updateOne(
        { _id: answerId },
        {
          $inc: {
            disLikes: -1,
          },
        }
      );

      const updatedUser = await User.updateOne(
        { _id: userId },
        {
          $pull: {
            user_dislikedPosts: answerId,
          },
        }
      );
    }

    res.status(200).send("Answer Disliked");
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "unable to dislike the answer" });
  }
};

module.exports = { answer_post, answers_post, answer_like, answer_dislike };
