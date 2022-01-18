const Answer = require("../models/Answer");
const Doubt = require("../models/Doubt");
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
  const { content, doubtId, authorId } = req.body;
  try {
    const answer = await Answer.create({
      author_id: authorId,
      answer: content,
      doubt_id: doubtId,
    });
    const updateDoubt = await Doubt.updateOne(
      { _id: answer.doubt_id },
      {
        $push: {
          doubt_answers: answer._id,
        },
      }
    );
    console.log(updateDoubt);
    res.status(201).send(answer);
  } catch (err) {
    console.log(err);
    res.status(400).send({ err: "Failed to submit doubt" });
  }
};

module.exports = { answer_post, answers_post };
