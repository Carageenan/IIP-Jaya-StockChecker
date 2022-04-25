const { getDB } = require("../config/mongodb");
const { ObjectId } = require("mongodb");

class itemModel {
  static async findAll() {
    const db = getDB();
    const items = await db.collection("Items").find().toArray();
    return items;
  }
  static async create(item) {
    const db = getDB();
    const newItem = await db.collection("Items").insertOne(item);
    return newItem;
  }
  static async update(id, item) {
    const db = getDB();
    const updatedItem = await db.collection("Items").updateOne({ _id: ObjectId(id) }, { $set: item });
    return updatedItem;
  }
  static async delete(id) {
    const db = getDB();
    const deletedItem = await db.collection("Items").deleteOne({ _id: ObjectId(id) });
    return deletedItem;
  }
}

module.exports = itemModel;
