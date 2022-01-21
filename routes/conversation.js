const {
  conversation_get,
  conversation_post,
} = require("../controllers/conversationController");
const router = require("express").Router();

router.get("/get-conversation", conversation_get);
router.post("/new-conversation", conversation_post);

module.exports = router;
