const {
  conversation_post,
  conversations_get,
} = require("../controllers/conversationController");
const router = require("express").Router();

router.get("/get-conversations/:userId", conversations_get);
router.post("/new-conversation", conversation_post);

module.exports = router;
