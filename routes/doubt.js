const router = require("express").Router();
const Doubt = require("../models/Doubt");
const Answer = require("../models/Answer");
const User = require("../models/User");
const {
  doubts_get,
  doubt_get,
  doubt_post,
  doubt_star,
  doubt_unStar,
  doubt_trendings,
} = require("../controllers/doubtController");

router.get("/get-doubts", doubts_get);
router.post("/get-doubt", doubt_get);
router.post("/submit", doubt_post);
router.post("/star-doubt", doubt_star);
router.post("/un-star-doubt", doubt_unStar);
router.get("/trendings", doubt_trendings);

module.exports = router;
