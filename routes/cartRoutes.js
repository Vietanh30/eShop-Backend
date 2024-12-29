const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const authMiddlewares = require("../middlewares/authMiddlewares");

// Lấy giỏ hàng
router.get("/", authMiddlewares.protect, cartController.getCart);

// Cập nhật giỏ hàng
router.patch("/update", authMiddlewares.protect, cartController.updateCart);

// Xóa sản phẩm khỏi giỏ hàng
router.delete(
    "/remove-item/:productId",
    authMiddlewares.protect,
    cartController.removeItemFromCart
);

module.exports = router;
