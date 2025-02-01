const { User, Log } = require("../models");
const bcrypt = require("bcrypt");

exports.listUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "email", "role"],
    });
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.updateUserRole = async (req, res) => {
  // Hanya SUPER_ADMIN
  try {
    const { userId } = req.params;
    const { role } = req.body;
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = role;
    await user.save();

    await Log.create({
      userId: req.user.id,
      action: "UPDATE_USER_ROLE",
      details: `Change role of user ${user.email} to ${role}`,
    });

    return res.json({ message: "User role updated", user });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
