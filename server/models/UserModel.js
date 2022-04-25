const { getDB } = require("../config/mongodb");
const { ObjectId } = require("mongodb");

class userModel {
  static async findByEmail(username) {
    const db = getDB();
    const user = await db.collection("Users").findOne({
      username,
    });
    return user;
  }
  static findAll() {
    const db = getDB();
    return db.collection("Users").find().toArray();
  }
  static async findByUsername(username) {
    const db = getDB();
    const Collection = await db.collection("Users");
    const user = await Collection.findOne({
      username,
    });
    return user;
  }
  static async create(user) {
    const db = getDB();
    const newUser = await db.collection("Users").insertOne(user);
    return newUser;
  }
  static async update(id, user) {
    const db = getDB();
    const updatedUser = await db.collection("Users").updateOne({ _id: ObjectId(id) }, { $set: user });
    return updatedUser;
  }
  static async delete(id) {
    const db = getDB();
    const deletedUser = await db.collection("Users").deleteOne({ _id: ObjectId(id) });
    return deletedUser;
  }
}

module.exports = userModel;
