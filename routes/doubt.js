const router = require("express").Router();
const Doubt = require("../models/Doubt");

router.get("/get-doubts", async (req, res) => {
  try {
    const doubts = await Doubt.find({});
    res.status(200).send(doubts);
  } catch (err) {
    console.log(err);
    res.status(404).send({ err: "doubts not found" });
  }
});

router.post("/submit", async (req, res) => {
  const { content, userId, category, filenames } = req.body;
  let doubt_imgs = [];
  for (let key = 0; key < filenames.length; ++key) {
    doubt_imgs.push(filenames[key].filename);
  }
  const doubt = await Doubt.create({
    doubt: content,
    author_id: userId,
    category,
    doubt_imgs,
  });

  res.status(201).send({ msg: "doubt submitted" });
});

module.exports = router;
