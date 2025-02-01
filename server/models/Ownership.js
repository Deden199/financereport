const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Ownership = sequelize.define("Ownership", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  tokoId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  investorId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  persentase: {
    type: DataTypes.DECIMAL(5,2),
    defaultValue: 0,
  },
});

module.exports = Ownership;
