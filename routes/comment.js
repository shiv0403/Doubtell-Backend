const {
  comment_post,
  comments_get,
  replies_get,
} = require("../controllers/commentController");
const router = require("express").Router();

router.post("/comment-post", comment_post);
router.get("/comments-get/:answerId", comments_get);
router.get("/replies-get/:commentId", replies_get);

module.exports = router;
