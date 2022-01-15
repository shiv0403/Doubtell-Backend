const User = require("../models/User");
const { handleErrors } = require("../utils/authErrors");

const login_post = (req, res) => {};

const signup_post = async (req, res) => {
  const { name, email, password, confirmPassword, age, school } = req.body;

  if (password !== confirmPassword) {
    res.status(400).send({ msg: "Both the passwords must match" });
  }
  try {
    const user = await User.create({ name, email, password, school, age });
    res.status(201).send({ msg: "user created successfully", user });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).send({ errors });
  }
};

module.exports = {
  login_post,
  signup_post,
};
