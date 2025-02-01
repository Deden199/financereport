const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Dividen = sequelize.define("Dividen", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  tokoId: {
    // Izinkan null => allowNull: true
    type: DataTypes.UUID,
    allowNull: true,  // <--- ini kuncinya
  },
  totalProfit: {
    type: DataTypes.DECIMAL(20,2),
    defaultValue: 0
  },
  notes: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true
  },
  distributedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
});

module.exports = Dividen;
