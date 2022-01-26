const Conversation = require("../models/Conversation");

const conversations_get = async (req, res) => {
  const { userId } = req.params;
  try {
    const conversations = await Conversation.find({
      membersId: { $in: [userId] },
    });
    res.status(200).send(conversations);
  } catch (err) {
    console.log(err);
    res.status(404).send({ err: "conversations not found!" });
  }
};

const conversation_post = async (req, res) => {
  const { senderId, receiverId } = req.body;
  try {
    const conversation = await Conversation.create({
      membersId: [senderId, receiverId],
    });
    res.status(201).send(conversation);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: err.message });
  }
};

module.exports = {
  conversations_get,
  conversation_post,
};
