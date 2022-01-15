const mongoose = require("mongoose");
const { Schema } = mongoose;

const doubtSchema = new Schema({
  doubt: {
    type: String,
    required: true,
  },
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  stars: {
    type: Number,
    default: 0,
  },
  doubt_answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer",
    },
  ],
});

const Doubt = mongoose.model("Doubt", doubtSchema);

module.exports = Doubt;
