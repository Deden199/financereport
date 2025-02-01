const sequelize = require("../config/db");

// Import semua model
const User = require("./User");
const Transaction = require("./Transaction");
const ShareDistribution = require("./ShareDistribution");
const Log = require("./Log");

// Jika pakai Toko, Investor, Dividen:
const Toko = require("./Toko");
const Investor = require("./Investor");
const Dividen = require("./Dividen");

// ======================================
// Definisikan relasi antar-model di sini
// ======================================

// 1. User -> Transaction
//    1 user bisa input banyak transaction
User.hasMany(Transaction, { foreignKey: "userId" });
Transaction.belongsTo(User, { foreignKey: "userId" });

// 2. User -> Log
//    1 user bisa punya banyak log (audit trail)
User.hasMany(Log, { foreignKey: "userId" });
Log.belongsTo(User, { foreignKey: "userId" });

// 3. ShareDistribution -> Tergantung definisi
//    Misal: 1 Toko / Project = 1 'target' di table? (Opsional)

// Contoh: Toko.hasMany(Transaction, { foreignKey: "tokoId" });
//         Transaction.belongsTo(Toko, { foreignKey: "tokoId" });

// Contoh: Investor belongs to Toko? Atau Many-to-Many? Tergantung bisnis
//         Toko.hasMany(Investor, { foreignKey: "tokoId" });
//         Investor.belongsTo(Toko, { foreignKey: "tokoId" });

// 4. Dividen -> Toko? (bisa saja 1 Toko banyak Dividen)
 // Toko.hasMany(Dividen, { foreignKey: "tokoId" });
 // Dividen.belongsTo(Toko, { foreignKey: "tokoId" });

// Silakan sesuaikan relationship di atas sesuai logika bisnis Anda.

// ======================================
// Ekspor Semuanya
// ======================================
module.exports = {
  sequelize,
  User,
  Transaction,
  ShareDistribution,
  Log,
  Toko,
  Investor,
  Dividen,
};
