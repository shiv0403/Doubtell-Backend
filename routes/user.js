const { user_get } = require("../controllers/userController");
const router = require("express").Router();

router.get("/get-user/:id", user_get);

module.exports = router;
