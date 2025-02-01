const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Dividen = sequelize.define("Dividen", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  totalProfit: {
    type: DataTypes.DECIMAL(20,2),
    defaultValue: 0,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "PENDING",
  },
  distributedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Dividen;
