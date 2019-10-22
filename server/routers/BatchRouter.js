const express = require("express");
const batchController = require("../controllers/BatchController");
const router = express.Router();

router.get("/batch/status/:secid", batchController.getBatchStatus);

module.exports = router;