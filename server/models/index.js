const sequelize = require("../config/db");

// Import model
const User = require("./User");
const Log = require("./Log");
const Toko = require("./Toko");
const Investor = require("./Investor");
const Dividen = require("./Dividen");
const Transaction = require("./Transaction");
const Ownership = require("./Ownership");
const Histori = require("./Histori");

// =============== RELASI ===============

// 1) User ↔ Transaction (1 user banyak transaction)
User.hasMany(Transaction, { foreignKey: "userId" });
Transaction.belongsTo(User, { foreignKey: "userId" });

// 2) User ↔ Log (audit trail)
User.hasMany(Log, { foreignKey: "userId" });
Log.belongsTo(User, { foreignKey: "userId" });

// 3) Toko ↔ Ownership ↔ Investor
//    Satu Toko bisa banyak Ownership, satu Investor bisa punya banyak Ownership.
Toko.hasMany(Ownership, { foreignKey: "tokoId" });
Ownership.belongsTo(Toko, { foreignKey: "tokoId" });

Investor.hasMany(Ownership, { foreignKey: "investorId" });
Ownership.belongsTo(Investor, { foreignKey: "investorId" });

// 4) Toko ↔ Dividen
//    Jika Dividen menempel ke Toko (1 Toko banyak Dividen).
Toko.hasMany(Dividen, { foreignKey: "tokoId" });
Dividen.belongsTo(Toko, { foreignKey: "tokoId" });

// 5) Toko ↔ Histori (opsional: jika mencatat histori perubahan di Toko)
Toko.hasMany(Histori, { foreignKey: "tokoId" });
Histori.belongsTo(Toko, { foreignKey: "tokoId" });

// =============== EKSPOR SEMUA ===============
module.exports = {
  sequelize,
  User,
  Log,
  Toko,
  Investor,
  Dividen,
  Transaction,
  Ownership,
  Histori,
};
