if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const cors = require("cors");
const express = require("express");
const app = express();
const { connect } = require("./config/mongodb");
const port = process.env.PORT || 4000;
const userRoute = require("./routes/userRoutes");
const itemRoute = require("./routes/itemRoutes");
const stockRoute = require("./routes/stockRoutes");
const orderRoute = require("./routes/orderRoutes");
const errorHandler = require("./middlewares/errorHandler");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  res.status(200).json("This is REST API for IIP-Jaya-StockChecker");
});

app.use("/users", userRoute);
app.use("/items", itemRoute);
app.use("/stocks", stockRoute);
app.use("/orders", orderRoute);
app.use(errorHandler);
app.listen(port, () => {
  connect();
  console.log(`Listening on port ${port}`);
});
