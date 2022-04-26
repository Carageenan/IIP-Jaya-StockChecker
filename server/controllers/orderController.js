const orderModel = require("../models/OrderModel");

class Controller {
  static async getAll(req, res, next) {
    try {
      const orders = await orderModel.findAll();
      res.status(200).json({
        message: "Get all orders successfully",
        data: orders,
      });
    } catch (error) {
      next(error);
    }
  }
  static async findById(req, res, next) {
    try {
      const { id } = req.params;
      const order = await orderModel.findById(id);
      res.status(200).json({
        message: "Get order by id successfully",
        data: order,
      });
    } catch (error) {
      next(error);
    }
  }
  static async create(req, res, next) {
    try {
      const { buyerName, items, totalPrice, authorId, userToConfirmId } = req.body;
      const newOrder = await orderModel.create({
        buyerName,
        items,
        totalPrice: Number(totalPrice),
        authorId,
        userToConfirmId,
        status: "pending",
      });
      res.status(200).json({
        message: "Create order successfully",
        data: newOrder,
      });
    } catch (error) {
      next(error);
    }
  }
  static async updateStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updatedOrder = await orderModel.update(id, {
        status,
      });
      res.status(200).json({
        message: "Update order successfully",
        data: updatedOrder,
      });
    } catch (error) {
      next(error);
    }
  }
  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const deletedOrder = await orderModel.delete(id);
      res.status(200).json({
        message: "Delete order successfully",
        data: deletedOrder,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
