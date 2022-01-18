const Answer = require("../models/Answer");
const Doubt = require("../models/Doubt");
const User = require("../models/User");
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

module.exports = { answer_post, answers_post };
