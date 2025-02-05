const router = require("express").Router();
const authController = require("../controllers/authController");

// POST /api/auth/register
router.post("/register", authController.registerUser);

// POST /api/auth/login
router.post("/login", authController.login);

module.exports = router;
