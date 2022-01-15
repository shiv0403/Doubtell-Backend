const router = require("express").Router();
const { login_post, signup_post } = require("../controllers/authController");

router.post("/signup", signup_post);
router.post("/login", login_post);

module.exports = router;
