const { getDB } = require("../config/mongodb");
const { ObjectId } = require("mongodb");

class orderModel {
  static async findAll() {
    const db = getDB();
    const orders = await db.collection("Orders").find().toArray();
    return orders;
  }
  static async findById(id) {
    const db = getDB();
    const order = await db.collection("Orders").findOne({ _id: ObjectId(id) });
    return order;
  }
  static async create(order) {
    const db = getDB();
    const newOrder = await db.collection("Orders").insertOne(order);
    return newOrder;
  }
  static async update(id, order) {
    const db = getDB();
    const updatedOrder = await db.collection("Orders").updateOne({ _id: ObjectId(id) }, { $set: order });
    return updatedOrder;
  }
  static async delete(id) {
    const db = getDB();
    const deletedOrder = await db.collection("Orders").deleteOne({ _id: ObjectId(id) });
    return deletedOrder;
  }
}

module.exports = orderModel;
