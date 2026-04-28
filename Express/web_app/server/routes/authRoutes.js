const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getDashboard,
} = require("../controllers/authController");

const verifyToken = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/dashboard", verifyToken, getDashboard);

module.exports = router;
