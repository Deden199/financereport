require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const financeRoutes = require("./routes/financeRoutes");
const logRoutes = require("./routes/logRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/finance", financeRoutes);
app.use("/api/logs", logRoutes);

// Sync DB & run server
const PORT = process.env.PORT || 5000;
sequelize
  .sync({ alter: true }) // or true for dev, but careful in production
  .then(() => {
    console.log("Database synced");
    app.listen(PORT, () => {
      console.log("Server running on port:", PORT);
    });
  })
  .catch(err => console.error(err));
