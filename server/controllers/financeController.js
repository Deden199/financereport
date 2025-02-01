const { 
  Toko, 
  Investor, 
  Dividen, 
  Transaction,
  Ownership 
} = require("../models");

// ========================== T O K O ==========================

// GET ALL
exports.getAllToko = async (req, res) => {
  try {
    const data = await Toko.findAll();
    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET ONE
exports.getOneToko = async (req, res) => {
  try {
    const { id } = req.params;
    const toko = await Toko.findByPk(id);
    if (!toko) return res.status(404).json({ message: "Toko not found" });
    return res.json(toko);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// =============== REPORT-FULL ===============
// Toko + Ownership (include Investor) + Dividen
exports.getFullReport = async (req, res) => {
  try {
    const tokoList = await Toko.findAll({
      include: [
        {
          model: Ownership,
          include: [ Investor ]
        },
        {
          model: Dividen
        }
      ]
    });
    return res.json(tokoList);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// CREATE Toko
exports.createToko = async (req, res) => {
  try {
    const {
      nama,
      modalAwal,
      lokasi,
      keterangan,
      totalInject,
      totalBagi,
      totalProfit
    } = req.body;

    const newToko = await Toko.create({
      nama,
      modalAwal,
      lokasi,
      keterangan,
      totalInject,
      totalBagi,
      totalProfit
    });
    return res.json(newToko);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// UPDATE Toko
exports.updateToko = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nama,
      modalAwal,
      lokasi,
      keterangan,
      totalInject,
      totalBagi,
      totalProfit
    } = req.body;

    const toko = await Toko.findByPk(id);
    if (!toko) return res.status(404).json({ message: "Toko not found" });

    if (nama !== undefined) toko.nama = nama;
    if (modalAwal !== undefined) toko.modalAwal = modalAwal;
    if (lokasi !== undefined) toko.lokasi = lokasi;
    if (keterangan !== undefined) toko.keterangan = keterangan;
    if (totalInject !== undefined) toko.totalInject = totalInject;
    if (totalBagi !== undefined) toko.totalBagi = totalBagi;
    if (totalProfit !== undefined) toko.totalProfit = totalProfit;

    await toko.save();
    return res.json(toko);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// DELETE Toko
exports.deleteToko = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Toko.destroy({ where: { id }});
    if (!result) return res.status(404).json({ message: "Toko not found" });
    return res.json({ message: "Toko deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ========================= INVESTOR ========================

// GET ALL
exports.getAllInvestors = async (req, res) => {
  try {
    const data = await Investor.findAll();
    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET ONE
exports.getOneInvestor = async (req, res) => {
  try {
    const { id } = req.params;
    const inv = await Investor.findByPk(id);
    if (!inv) return res.status(404).json({ message: "Investor not found" });
    return res.json(inv);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// CREATE Investor
exports.createInvestor = async (req, res) => {
  try {
    const {
      namaInvestor,
      persenSaham,
      totalInject,
      totalBagi
    } = req.body;

    const inv = await Investor.create({
      namaInvestor,
      persenSaham,
      totalInject,
      totalBagi
    });
    return res.json(inv);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// UPDATE Investor
exports.updateInvestor = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      namaInvestor,
      persenSaham,
      totalInject,
      totalBagi
    } = req.body;

    const inv = await Investor.findByPk(id);
    if (!inv) return res.status(404).json({ message: "Investor not found" });

    if (namaInvestor !== undefined) inv.namaInvestor = namaInvestor;
    if (persenSaham !== undefined) inv.persenSaham = persenSaham;
    if (totalInject !== undefined) inv.totalInject = totalInject;
    if (totalBagi !== undefined) inv.totalBagi = totalBagi;

    await inv.save();
    return res.json(inv);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message:"Server error" });
  }
};

// DELETE Investor
exports.deleteInvestor = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Investor.destroy({ where:{ id }});
    if (!result) return res.status(404).json({ message:"Investor not found" });
    return res.json({ message:"Investor deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message:"Server error" });
  }
};

// ========================= DIVIDEN =========================

// GET ALL (include Toko agar row.Toko?.nama bisa dipakai)
exports.getAllDividens = async (req, res) => {
  try {
    const data = await Dividen.findAll({
      include: [ Toko ]
    });
    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET ONE
exports.getOneDividen = async (req, res) => {
  try {
    const { id } = req.params;
    const div = await Dividen.findByPk(id, {
      include:[ Toko ]
    });
    if (!div) return res.status(404).json({ message: "Dividen not found" });
    return res.json(div);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message:"Server error" });
  }
};

// CREATE Dividen
exports.createDividen = async (req, res) => {
  try {
    const {
      tokoId,
      totalProfit,
      notes,
      status,
      distributedAt
    } = req.body;

    // Izinkan null => if no tokoId provided
    const newDiv = await Dividen.create({
      tokoId: tokoId || null,
      totalProfit,
      notes,
      status,
      distributedAt
    });
    return res.json(newDiv);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// UPDATE Dividen
exports.updateDividen = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      tokoId,
      totalProfit,
      notes,
      status,
      distributedAt
    } = req.body;

    const div = await Dividen.findByPk(id);
    if (!div) return res.status(404).json({ message:"Dividen not found" });

    if (tokoId !== undefined) div.tokoId = tokoId;
    if (totalProfit !== undefined) div.totalProfit = totalProfit;
    if (notes !== undefined) div.notes = notes;
    if (status !== undefined) div.status = status;
    if (distributedAt !== undefined) div.distributedAt = distributedAt;

    await div.save();
    return res.json(div);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message:"Server error" });
  }
};

// DELETE Dividen
exports.deleteDividen = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Dividen.destroy({ where:{ id }});
    if (!result) return res.status(404).json({ message:"Dividen not found" });
    return res.json({ message:"Dividen deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message:"Server error" });
  }
};

// ======================= TRANSACTION ========================

exports.getAllTransactions = async (req, res) => {
  try {
    const txList = await Transaction.findAll();
    return res.json(txList);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET ONE
exports.getOneTransaction = async (req, res)=>{
  try {
    const { transactionId } = req.params;
    const tx = await Transaction.findByPk(transactionId);
    if(!tx) return res.status(404).json({ message:"Not found" });
    return res.json(tx);
  } catch (err){
    console.error(err);
    return res.status(500).json({ message:"Server error" });
  }
};

exports.createTransaction = async (req, res) => {
  try {
    const { title, type, amount } = req.body;
    const newTx = await Transaction.create({ title, type, amount });
    return res.json(newTx);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.approveTransaction = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const tx = await Transaction.findByPk(transactionId);
    if (!tx) return res.status(404).json({ message: "Not found" });
    tx.status = "APPROVED";
    await tx.save();
    return res.json({ message: "Transaction approved", tx });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.rejectTransaction = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const tx = await Transaction.findByPk(transactionId);
    if (!tx) return res.status(404).json({ message: "Not found" });
    tx.status = "REJECTED";
    await tx.save();
    return res.json({ message: "Transaction rejected", tx });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// =================== DISTRIBUTE (PROFIT) ===================

exports.distributeProfit = async (req, res) => {
  try {
    // ex: const { totalProfit } = req.body;
    // Di sinilah logic pembagian ke tiap investor / pembuatan record Dividen dsb.
    return res.json({ message: "Profit distributed (dummy)" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// =============== OWNERSHIP (Kepemilikan) ===============

exports.getAllOwnership = async (req, res) => {
  try {
    const data = await Ownership.findAll({
      include: [ Toko, Investor ]
    });
    return res.json(data);
  } catch (err){
    console.error(err);
    return res.status(500).json({ message:"Server error" });
  }
};

exports.getOneOwnership = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Ownership.findByPk(id, {
      include:[Toko, Investor]
    });
    if(!item) return res.status(404).json({ message:"Ownership not found" });
    return res.json(item);
  } catch (err){
    console.error(err);
    return res.status(500).json({ message:"Server error" });
  }
};

exports.createOwnership = async (req, res) => {
  try {
    const {
      tokoId,
      investorId,
      persentase,
      modalAwalInv,
      totalInjectInv,
      totalBagiInv
    } = req.body;

    const newData = await Ownership.create({
      tokoId,
      investorId,
      persentase,
      modalAwalInv,
      totalInjectInv,
      totalBagiInv
    });
    return res.json(newData);
  } catch (err){
    console.error(err);
    return res.status(500).json({ message:"Server error" });
  }
};

exports.updateOwnership = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      tokoId,
      investorId,
      persentase,
      modalAwalInv,
      totalInjectInv,
      totalBagiInv
    } = req.body;

    const item = await Ownership.findByPk(id);
    if(!item) return res.status(404).json({ message:"Ownership not found" });

    if(tokoId !== undefined) item.tokoId = tokoId;
    if(investorId !== undefined) item.investorId = investorId;
    if(persentase !== undefined) item.persentase = persentase;
    if(modalAwalInv !== undefined) item.modalAwalInv = modalAwalInv;
    if(totalInjectInv !== undefined) item.totalInjectInv = totalInjectInv;
    if(totalBagiInv !== undefined) item.totalBagiInv = totalBagiInv;

    await item.save();
    return res.json(item);
  } catch (err){
    console.error(err);
    return res.status(500).json({ message:"Server error" });
  }
};

exports.deleteOwnership = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Ownership.destroy({ where:{ id }});
    if(!result) return res.status(404).json({ message:"Ownership not found" });
    return res.json({ message:"Ownership deleted" });
  } catch (err){
    console.error(err);
    return res.status(500).json({ message:"Server error" });
  }
};
