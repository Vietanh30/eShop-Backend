const express = require("express");
const uploadController = require("../controllers/uploadController");
const router = express.Router();

router.post('/', uploadController.uploadSingle);
router.post('/multiple', uploadController.uploadMultiple);

module.exports = router;
