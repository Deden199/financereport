const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const { Log, User } = require("../models");

// Contoh: Lihat log hanya SUPER_ADMIN
router.get("/", authMiddleware, roleMiddleware("SUPER_ADMIN"), async (req, res) => {
  const logs = await Log.findAll({
    include: [{ model: User, attributes: ["email", "role"] }]
  });
  return res.json(logs);
});

module.exports = router;
