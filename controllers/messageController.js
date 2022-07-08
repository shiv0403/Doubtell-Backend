const Message = require("../models/Message");
const mongoose = require("mongoose");

const messages_get = async (req, res) => {
  const { conversationId } = req.params;

  try {
    const messages = await Message.find({
      conversationId,
    });
    res.status(200).send(messages);
  } catch (err) {
    console.log(err);
    res.status(400).send({ err: "couldn't get messages" });
  }
};

const message_post = async (req, res) => {
  const { conversationId, message, senderId } = req.body;

  try {
    const messageCreated = await Message.create({
      conversationId,
      message,
      senderId,
    });
    res.status(201).send(messageCreated);
  } catch (err) {
    console.log(err);
    res.status(404).send({ err: "couldn't post message" });
  }
};

module.exports = { messages_get, message_post };
