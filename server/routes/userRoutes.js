const express = require("express");
const router = express.Router();
const Controller = require("../controllers/userController");
const { isLogin } = require("../middlewares/auth");

router.post("/login", Controller.login);

router.use(isLogin);

router.get("/", Controller.getAll);

router.put("/", Controller.update);

module.exports = router;
