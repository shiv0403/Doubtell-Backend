const jwt = require("jsonwebtoken");

const createToken = (id, name, email) => {
  return jwt.sign({ id, name, email }, process.env.SECRET_KEY, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

module.exports = { createToken };
