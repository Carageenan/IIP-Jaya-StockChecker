const express = require("express");
const router = express.Router();
const Controller = require("../controllers/orderController");
const { isLogin, isAdmin } = require("../middlewares/auth");

router.use(isLogin);
router.get("/", Controller.getAll);
router.get("/:id", Controller.findById);
router.post("/", Controller.create);
router.put("/:id", isAdmin, Controller.updateStatus);
router.delete("/:id", isAdmin, Controller.delete);

module.exports = router;
