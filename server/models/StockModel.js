const { getDB } = require("../config/mongodb");
const { ObjectId } = require("mongodb");

class stockModel {
  static async findAll() {
    const db = getDB();
    const stocks = await db.collection("Stocks").find().toArray();
    return stocks;
  }
  static async findByName(itemName) {
    const db = getDB();
    const stock = await db.collection("Stocks").findOne({ itemName });
    return stock;
  }
  static async findById(id) {
    const db = getDB();
    const stock = await db.collection("Stocks").findOne({ _id: ObjectId(id) });
    return stock;
  }
  static async create(stock) {
    const db = getDB();
    const newStock = await db.collection("Stocks").insertOne(stock);
    return newStock;
  }
  static async update(id, stock) {
    const db = getDB();
    const updatedStock = await db.collection("Stocks").updateOne({ _id: ObjectId(id) }, { $set: stock });
    return updatedStock;
  }
  static async delete(id) {
    const db = getDB();
    const deletedStock = await db.collection("Stocks").deleteOne({ _id: ObjectId(id) });
    return deletedStock;
  }
}

module.exports = stockModel;
