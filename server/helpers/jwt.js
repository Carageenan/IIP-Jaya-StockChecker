const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_KEY;

const generateToken = (payload) => {
  return jwt.sign(payload, jwtKey);
};

const readToken = (token) => {
  return jwt.verify(token, jwtKey);
};

module.exports = {
  generateToken,
  readToken,
};
