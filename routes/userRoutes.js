const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddlewares = require("../middlewares/authMiddlewares");

router.post("/register", userController.registerUser);
router.post("/auth", userController.authUser);

router.patch("/update", authMiddlewares.protect, userController.updateUser);
router.get("/", authMiddlewares.protect, userController.getUserProfile);
router.get("/all", authMiddlewares.protect, authMiddlewares.isAdmin, userController.getAllUserProfile);
router.patch("/role/:id", authMiddlewares.protect, authMiddlewares.isAdmin, userController.updateRole);

module.exports = router;
