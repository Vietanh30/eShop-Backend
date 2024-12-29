const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddlewares = require("../middlewares/authMiddlewares");

// Lấy tất cả sản phẩm
router.get("/", productController.getAllProducts);

// Lấy sản phẩm theo slug
router.get("/:slug", productController.getProductBySlug);

// // Lấy sản phẩm theo ID
// router.get("/id/:id", productController.getProductByID);

// Tạo sản phẩm mới (chỉ dành cho Admin)
router.post(
  "/",
  authMiddlewares.protect, // Middleware bảo vệ (xác thực người dùng)
  authMiddlewares.isAdmin, // Middleware kiểm tra quyền Admin
  productController.createProduct
);

// Cập nhật sản phẩm (chỉ dành cho Admin)
router.patch(
  "/:id",
  authMiddlewares.protect,
  authMiddlewares.isAdmin,
  productController.updateProduct
);

module.exports = router;
