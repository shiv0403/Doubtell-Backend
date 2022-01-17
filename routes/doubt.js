const router = require("express").Router();
const Doubt = require("../models/Doubt");

router.post("/submit", async (req, res) => {
  console.log(req.body);
  const { content, userId, category, filenames } = req.body;

  let doubt_imgs = [];
  for (let key = 0; key < filenames.length; ++key) {
    doubt_imgs.push(filenames[key].filename);
  }
  console.log(filenames);
  const doubt = await Doubt.create({
    doubt: content,
    author_id: userId,
    category,
    doubt_imgs,
  });

  console.log(doubt);

  res.status(201).send({ msg: "doubt submitted" });
});

module.exports = router;
