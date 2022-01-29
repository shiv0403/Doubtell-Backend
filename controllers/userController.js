const User = require("../models/User");

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
    res.status(200).send({
      user_likedPosts: user.user_likedPosts,
      user_dislikedPosts: user.user_dislikedPosts,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "unable to get info" });
  }
};

module.exports = { user_get, user_answerInfo };
