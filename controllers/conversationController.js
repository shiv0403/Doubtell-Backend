const Conversation = require("../models/Conversation");

const conversations_get = async (req, res) => {
  const { userId } = req.params;
  //todo - check if already a conversation or not.
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
    const conversationExists = await Conversation.find({
      membersId: {
        $all: [senderId, receiverId],
      },
    });
    console.log("conversation exists", conversationExists);
    if (conversationExists.length === 0) {
      const conversation = await Conversation.create({
        membersId: [senderId, receiverId],
      });
      console.log("conversation", conversation);
      res.status(201).send(conversation);
      return;
    }
    res.status(200).send(conversationExists);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: err.message });
  }
};

module.exports = {
  conversations_get,
  conversation_post,
};
