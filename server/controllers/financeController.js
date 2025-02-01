const { Toko, Investor, Dividen, Transaction } = require("../models");

// ========================== T O K O ==========================

// GET ALL
exports.getAllToko = async (req, res) => {
  try {
    const data = await Toko.findAll();
    return res.json(data);
  } catch(err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET ONE (opsional, jika di route)
exports.getOneToko = async (req, res) => {
  try {
    const { id } = req.params;
    const toko = await Toko.findByPk(id);
    if (!toko) return res.status(404).json({ message: "Toko not found" });
    return res.json(toko);
  } catch(err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// CREATE
exports.createToko = async (req, res) => {
  try {
    const { nama, modalAwal, lokasi, keterangan } = req.body; // jika punya kolom tambahan
    const newToko = await Toko.create({ nama, modalAwal, lokasi, keterangan });
    return res.json(newToko);
  } catch(err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// UPDATE
exports.updateToko = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, modalAwal, lokasi, keterangan } = req.body;
    const toko = await Toko.findByPk(id);
    if (!toko) return res.status(404).json({ message: "Toko not found" });
    toko.nama = nama;
    toko.modalAwal = modalAwal;
    if (lokasi !== undefined) toko.lokasi = lokasi;
    if (keterangan !== undefined) toko.keterangan = keterangan;
    await toko.save();
    return res.json(toko);
  } catch(err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// DELETE
exports.deleteToko = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Toko.destroy({ where: { id }});
    if(!result) return res.status(404).json({ message: "Toko not found" });
    return res.json({ message: "Toko deleted" });
  } catch(err) {
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
  } catch(err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET ONE (opsional)
exports.getOneInvestor = async (req, res) => {
  try {
    const { id } = req.params;
    const inv = await Investor.findByPk(id);
    if(!inv) return res.status(404).json({ message: "Investor not found" });
    return res.json(inv);
  } catch(err){
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// CREATE
exports.createInvestor = async (req, res) => {
  try {
    const { namaInvestor, persenSaham, totalInject, totalBagi } = req.body;
    const inv = await Investor.create({ namaInvestor, persenSaham, totalInject, totalBagi });
    return res.json(inv);
  } catch(err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// UPDATE
exports.updateInvestor = async (req, res) => {
  try {
    const { id } = req.params;
    const { namaInvestor, persenSaham, totalInject, totalBagi } = req.body;
    const inv = await Investor.findByPk(id);
    if(!inv) return res.status(404).json({ message: "Investor not found" });

    if(namaInvestor !== undefined) inv.namaInvestor = namaInvestor;
    if(persenSaham !== undefined) inv.persenSaham = persenSaham;
    if(totalInject !== undefined) inv.totalInject = totalInject;
    if(totalBagi !== undefined) inv.totalBagi = totalBagi;

    await inv.save();
    return res.json(inv);
  } catch(err){
    console.error(err);
    return res.status(500).json({ message:"Server error" });
  }
};

// DELETE
exports.deleteInvestor = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Investor.destroy({ where:{ id }});
    if(!result) return res.status(404).json({ message:"Investor not found" });
    return res.json({ message:"Investor deleted" });
  } catch(err){
    console.error(err);
    return res.status(500).json({ message:"Server error" });
  }
};

// ========================= DIVIDEN =========================

// GET ALL
exports.getAllDividens = async (req, res) => {
  try {
    const data = await Dividen.findAll();
    return res.json(data);
  } catch(err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET ONE (opsional)
exports.getOneDividen = async(req,res)=>{
  try {
    const { id } = req.params;
    const div = await Dividen.findByPk(id);
    if(!div) return res.status(404).json({ message: "Dividen not found" });
    return res.json(div);
  } catch(err){
    console.error(err);
    return res.status(500).json({ message:"Server error" });
  }
};

// CREATE
exports.createDividen = async (req, res) => {
  try {
    const { totalProfit, notes } = req.body;
    const newDiv = await Dividen.create({ totalProfit, notes });
    return res.json(newDiv);
  } catch(err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// UPDATE
exports.updateDividen = async(req,res)=>{
  try {
    const { id } = req.params;
    const { totalProfit, notes, status } = req.body;
    const div = await Dividen.findByPk(id);
    if(!div) return res.status(404).json({ message:"Dividen not found" });

    if(totalProfit !== undefined) div.totalProfit = totalProfit;
    if(notes !== undefined) div.notes = notes;
    if(status !== undefined) div.status = status;

    await div.save();
    return res.json(div);
  } catch(err){
    console.error(err);
    return res.status(500).json({ message:"Server error" });
  }
};

// DELETE
exports.deleteDividen = async(req,res)=>{
  try {
    const { id } = req.params;
    const result = await Dividen.destroy({ where:{ id }});
    if(!result) return res.status(404).json({ message:"Dividen not found" });
    return res.json({ message:"Dividen deleted" });
  } catch(err){
    console.error(err);
    return res.status(500).json({ message:"Server error" });
  }
};

// ======================= TRANSACTION ========================

exports.getAllTransactions = async (req, res) => {
  try {
    const txList = await Transaction.findAll();
    return res.json(txList);
  } catch(err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// (Optional) getOneTransaction
exports.getOneTransaction = async(req,res)=>{
  try {
    const { transactionId } = req.params;
    const tx = await Transaction.findByPk(transactionId);
    if(!tx) return res.status(404).json({ message:"Not found" });
    return res.json(tx);
  } catch(err){
    console.error(err);
    return res.status(500).json({ message:"Server error" });
  }
};

exports.createTransaction = async (req, res) => {
  try {
    const { title, type, amount } = req.body;
    const newTx = await Transaction.create({ title, type, amount });
    return res.json(newTx);
  } catch(err) {
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
  } catch(err) {
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
  } catch(err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// =================== DISTRIBUTE (PROFIT) ===================

exports.distributeProfit = async (req, res) => {
  try {
    // Logika bagi hasil
    // misal => const { totalProfit } = req.body
    // Lalu update ke table Dividen atau Ownership, dsb.

    // Sementara dummy:
    return res.json({ message: "Profit distributed (dummy)" });
  } catch(err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
