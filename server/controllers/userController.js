const { comparePassword, hashPassword } = require("../helpers/bcrypt");
const userModel = require("../models/UserModel");
const { generateToken } = require("../helpers/jwt");

class Controller {
  static async getAll(req, res, next) {
    try {
      const users = await userModel.findAll();
      res.status(200).json({
        message: "Get all users successfully",
        data: users,
      });
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await userModel.findByUsername(username);
      if (!user) {
        throw {
          status: 404,
          name: "Not Found",
          message: "User not found",
        };
      }
      const validate = comparePassword(password, user.password);
      if (!validate) {
        throw {
          status: 401,
          name: "Unauthorized",
          message: "Invalid password",
        };
      }
      const payload = {
        id: user._id,
        username: user.username,
        role: user.role,
      };
      const access_token = generateToken(payload);
      res.status(200).json({
        message: "Login Success",
        data: {
          access_token,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  static async update(req, res, next) {
    try {
      const { name, username, password, role, phoneNumber, email } = req.body;
      let pass = await hashPassword(password);
      const user = await userModel.update(req.user.id, {
        name,
        username,
        password: pass,
        role,
        phoneNumber,
        email,
      });
      res.status(200).json({
        message: "Update user successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
