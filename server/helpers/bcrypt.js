const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  return bcrypt.hashSync(password, 10);
};

const comparePassword = async (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

module.exports = {
  hashPassword,
  comparePassword,
};
