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

  // Tambahan untuk menampung data "Form Database per Investor"
  modalAwalInv: {
    type: DataTypes.DECIMAL(20, 2),
    defaultValue: 0,
    allowNull: true
  },
  totalInjectInv: {
    type: DataTypes.DECIMAL(20, 2),
    defaultValue: 0,
    allowNull: true
  },
  totalBagiInv: {
    type: DataTypes.DECIMAL(20, 2),
    defaultValue: 0,
    allowNull: true
  },
});

module.exports = Ownership;
