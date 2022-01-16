const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

module.exports = { createToken };
