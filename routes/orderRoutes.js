const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authMiddlewares = require("../middlewares/authMiddlewares");

router.post("/create", authMiddlewares.protect, orderController.createOrder);
router.get("/", authMiddlewares.protect, orderController.getOrder);
router.get("/all", authMiddlewares.protect, authMiddlewares.isAdmin, orderController.getAllOrder);
router.patch("/:id", authMiddlewares.protect, authMiddlewares.isAdmin, orderController.updateStatus);

module.exports = router;
