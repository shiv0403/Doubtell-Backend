const {
  answer_post,
  answers_post,
  answer_like,
  answer_dislike,
} = require("../controllers/answerController");
const router = require("express").Router();

router.post("/submit-answer", answer_post);
router.post("/get-answers/", answers_post);
router.post("/like-answer", answer_like);
router.post("/dislike-answer", answer_dislike);

module.exports = router;
