if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { MongoClient } = require("mongodb");
const { hashPassword } = require("../helpers/bcrypt");
const data = require("./user.json");
data.forEach(async (el) => {
  el.password = await hashPassword(el.password);
  console.log(el.password);
});

// Replace the uri string with your MongoDB deployment's connection string.
const url = process.env.MONGODB_ATLAS_URI;

const client = new MongoClient(url);

async function run() {
  try {
    await client.connect();

    const database = client.db("IIPJAYA");
    const ballroom = database.collection("Users");
    await ballroom.insertMany(data);
  } finally {
    // Ensures that the client will close when you finish/error
    console.log("success seeding");
    await client.close();
  }
}
run().catch(console.dir);
