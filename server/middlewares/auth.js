const { readToken } = require("../helpers/jwt");

const isLogin = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    const payload = readToken(access_token);
    if (!payload) {
      throw {
        status: 401,
        name: "Unauthorized",
        message: "Invalid token",
      };
    }
    req.user = payload;
    next();
  } catch (error) {
    next(error);
  }
};

const isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "Admin") {
      throw {
        status: 403,
        name: "Forbidden",
        message: "You are not admin",
      };
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  isLogin,
  isAdmin,
};
