const express = require("express");
const router = express.Router();
const Controller = require("../controllers/itemController");
const { isLogin } = require("../middlewares/auth");

// router.use(isLogin);
router.get("/", Controller.getAll);
router.post("/", Controller.create);
router.put("/:id", Controller.update);
router.delete("/:id", Controller.delete);

module.exports = router;
