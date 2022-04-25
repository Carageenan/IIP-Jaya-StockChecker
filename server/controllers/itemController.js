const itemModel = require("../models/ItemModel");

class Controller {
  static async getAll(req, res, next) {
    try {
      const users = await itemModel.findAll();
      res.status(200).json({
        message: "Get all items successfully",
        data: users,
      });
    } catch (error) {
      next(error);
    }
  }
  static async create(req, res, next) {
    try {
      const { name, price, desc } = req.body;
      const item = await itemModel.create({ name, price: Number(price), desc });
      res.status(200).json({
        message: "Create item successfully",
        data: item,
      });
    } catch (error) {
      next(error);
    }
  }
  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, price, desc } = req.body;
      const item = await itemModel.update(id, { name, price: Number(price), desc });
      res.status(200).json({
        message: "Update item successfully",
        data: item,
      });
    } catch (error) {
      next(error);
    }
  }
  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const item = await itemModel.delete(id);
      res.status(200).json({
        message: "Delete item successfully",
        data: item,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
