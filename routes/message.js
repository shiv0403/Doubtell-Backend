const {
  messages_get,
  message_post,
} = require("../controllers/messageController");
const router = require("express").Router();

router.get("/get-messages", messages_get);
router.post("/post-message", message_post);

module.exports = router;
