const {
  user_get,
  user_answerInfo,
  user_starInfo,
  user_bookmark_answer,
  user_unBookmark_answer,
} = require("../controllers/userController");
const router = require("express").Router();

router.get("/get-user/:id", user_get);
router.post("/get-answerInfo", user_answerInfo);
router.post("/get-starInfo", user_starInfo);
router.post("/bookmark-answer", user_bookmark_answer);
router.post("/un-bookmark-answer", user_unBookmark_answer);

module.exports = router;
