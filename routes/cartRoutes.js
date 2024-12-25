const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const authMiddlewares = require("../middlewares/authMiddlewares");

router.patch("/update", authMiddlewares.protect, cartController.updateCart);
router.get("/", authMiddlewares.protect, cartController.getCart);

module.exports = router;
