const { user_get, user_answerInfo } = require("../controllers/userController");
const router = require("express").Router();

router.get("/get-user/:id", user_get);
router.post("/get-answerInfo", user_answerInfo);

module.exports = router;
