const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddlewares = require("../middlewares/authMiddlewares");

router.get("/cate", productController.getAllCates);
router.get("/cateArr", productController.getAllCatesArray);

router.get("/", productController.getAllProducts);

router.get("/phone", productController.getProductPhone);
router.get("/laptop", productController.getProductLaptop);
router.get("/tablet", productController.getProductTablet);
router.get("/monitor", productController.getProductMonitor);
router.get("/tivi", productController.getProductTivi);
router.get("/watch", productController.getProductWatch);
router.get("/speakerHeadphone", productController.getProductSpeakerHead);
router.get("/oldProduct", productController.getProductOldProduct);
router.get("/service", productController.getProductService);
router.get("/accessory", productController.getProductAccessory);

router.get("/:slug", productController.getProductBySlug);

router.get("/id/:id", productController.getProductByID);
router.patch(
  "/:id",
  authMiddlewares.protect,
  authMiddlewares.isAdmin,
  productController.updateProduct
);

module.exports = router;
