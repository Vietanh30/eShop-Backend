const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const authMiddlewares = require("../middlewares/authMiddlewares");

router.post("/", authMiddlewares.protect, messageController.sendMessage);
router.get("/", authMiddlewares.protect, messageController.getMessage);

module.exports = router;
