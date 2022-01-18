const Doubt = require("../models/Doubt");
const Answer = require("../models/Answer");
const User = require("../models/User");

const doubts_get = async (req, res) => {
  try {
    const doubts = await Doubt.find(
      {},
      { doubt: 1, author_id: 1, author_name: 1 }
    );

    res.status(200).send(doubts);
  } catch (err) {
    console.log(err);
    res.status(404).send({ err: "doubts not found" });
  }
};

const doubt_get = async (req, res) => {
  const { doubtId } = req.body;
  try {
    const doubt = await Doubt.findOne({ _id: doubtId });
    let doubtAnswers = [];
    for (let i = 0; i < doubt.doubt_answers.length; ++i) {
      const answer = await Answer.findOne({ _id: doubt.doubt_answers[i] });
      doubtAnswers.push(answer);
    }
    res.status(200).send({ doubt, doubtAnswers });
  } catch (err) {
    console.log(err);
    res.status(404).send({ err: "Could not find the doubt" });
  }
};

const doubt_post = async (req, res) => {
  const { content, userId, category, filenames, userName } = req.body;
  let doubt_imgs = [];
  for (let key = 0; key < filenames.length; ++key) {
    doubt_imgs.push(filenames[key].filename);
  }
  const doubt = await Doubt.create({
    doubt: content,
    author_id: userId,
    category,
    doubt_imgs,
    author_name: userName,
  });

  const updatedUser = await User.updateOne(
    { _id: doubt.author_id },
    {
      $push: {
        user_doubts: doubt._id,
      },
    }
  );

  console.log(updatedUser);
  res.status(201).send({ msg: "doubt submitted" });
};

module.exports = { doubts_get, doubt_get, doubt_post };
