const {
  answer_post,
  answers_post,
} = require("../controllers/answerController");
const router = require("express").Router();

router.post("/submit-answer", answer_post);
router.post("/get-answers/", answers_post);

module.exports = router;
