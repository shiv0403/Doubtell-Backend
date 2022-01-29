const User = require("../models/User");
const mongoose = require("mongoose");

const user_get = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ _id: id });
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(404).send({ err: "User does not exists" });
  }
};

const user_answerInfo = async (req, res) => {
  const { answerId, userId } = req.body;
  try {
    const user = await User.findOne({ _id: userId });
    let userLiked = false,
      userDisliked = false;
    if (
      user.user_likedPosts.length > 0 &&
      user.user_likedPosts.includes(mongoose.Types.ObjectId(answerId))
    ) {
      userLiked = true;
    }

    if (
      user.user_dislikedPosts.length > 0 &&
      user.user_dislikedPosts.includes(mongoose.Types.ObjectId(answerId))
    ) {
      userDisliked = true;
    }
    res.status(200).send({
      userLiked,
      userDisliked,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "unable to get info" });
  }
};

const user_starInfo = async (req, res) => {
  const { userId, doubtId } = req.body;

  try {
    const user = await User.findOne({ _id: userId });
    let starredDoubt = false;
    console.log(user);
    if (
      user.user_starredDoubts.length > 0 &&
      user.user_starredDoubts.includes(mongoose.Types.ObjectId(doubtId))
    ) {
      starredDoubt = true;
    }

    res.status(200).send(starredDoubt);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "unable to get starred doubt info" });
  }
};

module.exports = { user_get, user_answerInfo, user_starInfo };
