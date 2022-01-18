const User = require("../models/User");

const user_get = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ _id: id });
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(404).send({ err: "User does not exists" });
  }
};

module.exports = { user_get };
