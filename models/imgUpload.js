const mongoose = require("mongoose");
const { Schema } = mongoose;

const imgSchema = new Schema({
  img: {
    type: String,
  },
});

const Img = mongoose.model("Img", imgSchema);

module.exports = Img;
