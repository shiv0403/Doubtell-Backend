const router = require("express").Router();
const Doubt = require("../models/Doubt");
const Answer = require("../models/Answer");
const User = require("../models/User");
const {
  doubts_get,
  doubt_get,
  doubt_post,
} = require("../controllers/doubtController");

router.get("/get-doubts", doubts_get);
router.post("/get-doubt", doubt_get);
router.post("/submit", doubt_post);

module.exports = router;
