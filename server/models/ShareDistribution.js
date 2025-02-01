const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// Contoh: Mencatat pembagian profit ke investor, dsb.
const ShareDistribution = sequelize.define("ShareDistribution", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  totalProfit: {
    type: DataTypes.DECIMAL(20, 2),
    allowNull: false,
  },
  distributedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = ShareDistribution;
