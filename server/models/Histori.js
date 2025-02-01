const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Histori = sequelize.define("Histori", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  // relasi ke Toko & Investor
  tokoId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  investorId: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  persenAwal: {
    type: DataTypes.DECIMAL(5,2),
    defaultValue: 0
  },
  persenBaru: {
    type: DataTypes.DECIMAL(5,2),
    defaultValue: 0
  },
  alasan: {
    type: DataTypes.STRING,
    allowNull: true
  },
  requestedBy: {
    type: DataTypes.STRING,
    allowNull: true
  },
  approvedBy: {
    type: DataTypes.STRING,
    allowNull: true
  },
  // bisa juga tambahkan "requestedDate", "approvedDate", dsb.
});

module.exports = Histori;
