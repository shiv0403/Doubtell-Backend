const User = require("../models/User");
const { handleErrors } = require("../utils/authErrors");
const { createToken } = require("../utils/jwt");

const login_post = async (req, res) => {
  const { email, password } = req.body.data;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id, user.name, user.email);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    res.status(200).send(token);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(401).send(errors);
  }
};

const signup_post = async (req, res) => {
  const { name, email, password, confirmPassword, age } = req.body.data;

  if (password !== confirmPassword) {
    res.status(400).send({ msg: "Both the passwords must match" });
  }
  try {
    const user = await User.create({ name, email, password, age });
    const token = createToken(user._id, user.name, user.email);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    res.status(201).send(token);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).send(errors);
  }
};

const logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).send({ msg: "logged out" });
};

module.exports = {
  login_post,
  signup_post,
  logout_get,
};
