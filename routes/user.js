const {
  user_get,
  user_answerInfo,
  user_starInfo,
} = require("../controllers/userController");
const router = require("express").Router();

router.get("/get-user/:id", user_get);
router.post("/get-answerInfo", user_answerInfo);
router.post("/get-starInfo", user_starInfo);

module.exports = router;
