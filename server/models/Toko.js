const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Toko = sequelize.define("Toko", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  modalAwal: {
    type: DataTypes.DECIMAL(20, 2),
    defaultValue: 0,
  },
  lokasi: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  keterangan: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  // Tambahan sesuai spreadsheet
  totalInject: {
    type: DataTypes.DECIMAL(20, 2),
    defaultValue: 0
  },
  totalBagi: {
    type: DataTypes.DECIMAL(20, 2),
    defaultValue: 0
  },
  totalProfit: {
    type: DataTypes.DECIMAL(20, 2),
    defaultValue: 0
  },
});

module.exports = Toko;
