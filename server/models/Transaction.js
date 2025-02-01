const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Transaction = sequelize.define("Transaction", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    // 'INCOME' atau 'EXPENSE'
    type: DataTypes.ENUM("INCOME", "EXPENSE"),
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(20, 2),
    allowNull: false,
  },
  status: {
    // 'PENDING', 'APPROVED', 'REJECTED'
    type: DataTypes.ENUM("PENDING", "APPROVED", "REJECTED"),
    defaultValue: "PENDING",
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = Transaction;
