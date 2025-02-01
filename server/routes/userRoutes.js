const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const userController = require("../controllers/userController");

// GET all users (only SUPER_ADMIN)
router.get("/",
  authMiddleware, roleMiddleware("SUPER_ADMIN"),
  userController.listUsers
);

// PATCH update user role
router.patch("/:userId/role",
  authMiddleware, roleMiddleware("SUPER_ADMIN"),
  userController.updateUserRole
);

module.exports = router;
