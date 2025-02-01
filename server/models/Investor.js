const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Investor = sequelize.define("Investor", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  namaInvestor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  persenSaham: {
    type: DataTypes.DECIMAL(5,2),
    defaultValue: 0,
  },
  totalInject: {
    type: DataTypes.DECIMAL(20,2),
    defaultValue: 0,
  },
  totalBagi: {
    type: DataTypes.DECIMAL(20,2),
    defaultValue: 0,
  },
});

module.exports = Investor;
