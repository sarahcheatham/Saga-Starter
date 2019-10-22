const express = require("express");
const userController = require("../controllers/UserController");
const router = express.Router();

router.get("/user/:userId", userController.getUserInfo);

module.exports = router;