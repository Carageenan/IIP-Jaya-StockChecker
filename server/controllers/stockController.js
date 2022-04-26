const stockModel = require("../models/stockModel");
class Controller {
  static async getAll(req, res, next) {
    try {
      const stocks = await stockModel.findAll();
      res.status(200).json({
        message: "Get all stocks successfully",
        data: stocks,
      });
    } catch (error) {
      next(error);
    }
  }
  static async findByName(req, res, next) {
    try {
      const { name } = req.body;
      const stock = await stockModel.findByName(name);
      res.status(200).json({
        message: "Get stock by name successfully",
        data: stock,
      });
    } catch (error) {
      next(error);
    }
  }
  static async findById(req, res, next) {
    try {
      const { id } = req.params;
      const stock = await stockModel.findById(id);
      res.status(200).json({
        message: "Get stock by id successfully",
        data: stock,
      });
    } catch (error) {
      next(error);
    }
  }
  static async create(req, res, next) {
    try {
      const { itemName, totalStock } = req.body;
      const stock = await stockModel.create({ itemName, totalStock: Number(totalStock) });
      res.status(200).json({
        message: "Create stock successfully",
        data: stock,
      });
    } catch (error) {
      next(error);
    }
  }
  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { itemName, totalStock } = req.body;
      const stock = await stockModel.update(id, { itemName, totalStock: Number(totalStock) });
      res.status(200).json({
        message: "Update stock successfully",
        data: stock,
      });
    } catch (error) {
      next(error);
    }
  }
  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const stock = await stockModel.delete(id);
      res.status(200).json({
        message: "Delete stock successfully",
        data: stock,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
