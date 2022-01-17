const mongoose = require("mongoose");
const { Schema } = mongoose;

const imgSchema = new Schema({
  img: {
    data: Buffer,
    contentType: String,
  },
});

const Image = mongoose.model("Image", imgSchema);

module.exports = Image;
