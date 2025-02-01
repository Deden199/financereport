const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const { email, password, role } = req.body; 
    // role: 'ADMIN' only super admin can create?

    // Check if user exist
    const exist = await User.findOne({ where: { email } });
    if (exist) return res.status(400).json({ message: "User already exist" });

    const hash = await bcrypt.hash(password, 10);

    const newUser = await User.create({ email, passwordHash: hash, role });
    return res.json({ message: "User created", user: newUser });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(400).json({ message: "Wrong password" });

    // generate token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    return res.json({ message: "Login success", token });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
