const router = require("express").Router();

router.post("/submit", (req, res) => {
  const { content } = req.body;
  console.log(content);
  res.status(201).send({ msg: "doubt submitted" });
});

module.exports = router;
