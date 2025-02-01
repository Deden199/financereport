const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const financeController = require("../controllers/financeController");

// ========================== T O K O ===========================

// GET all Toko
router.get("/toko",
  authMiddleware,
  financeController.getAllToko
);

// GET one Toko (opsional)
router.get("/toko/:id",
  authMiddleware,
  financeController.getOneToko
);

// CREATE Toko (SUPER_ADMIN)
router.post("/toko",
  authMiddleware,
  roleMiddleware("SUPER_ADMIN"),
  financeController.createToko
);

// UPDATE Toko
router.put("/toko/:id",
  authMiddleware,
  roleMiddleware("SUPER_ADMIN"),
  financeController.updateToko
);

// DELETE Toko
router.delete("/toko/:id",
  authMiddleware,
  roleMiddleware("SUPER_ADMIN"),
  financeController.deleteToko
);

// ======================== I N V E S T O R =====================

// GET all Investor
router.get("/investor",
  authMiddleware,
  financeController.getAllInvestors
);

// GET one Investor
router.get("/investor/:id",
  authMiddleware,
  financeController.getOneInvestor
);

// CREATE Investor (SUPER_ADMIN)
router.post("/investor",
  authMiddleware,
  roleMiddleware("SUPER_ADMIN"),
  financeController.createInvestor
);

// UPDATE Investor
router.put("/investor/:id",
  authMiddleware,
  roleMiddleware("SUPER_ADMIN"),
  financeController.updateInvestor
);

// DELETE Investor
router.delete("/investor/:id",
  authMiddleware,
  roleMiddleware("SUPER_ADMIN"),
  financeController.deleteInvestor
);

// ========================= D I V I D E N ======================

// GET all Dividen
router.get("/dividen",
  authMiddleware,
  financeController.getAllDividens
);

// GET one Dividen
router.get("/dividen/:id",
  authMiddleware,
  financeController.getOneDividen
);

// CREATE Dividen
router.post("/dividen",
  authMiddleware,
  roleMiddleware("SUPER_ADMIN"),
  financeController.createDividen
);

// UPDATE Dividen
router.put("/dividen/:id",
  authMiddleware,
  roleMiddleware("SUPER_ADMIN"),
  financeController.updateDividen
);

// DELETE Dividen
router.delete("/dividen/:id",
  authMiddleware,
  roleMiddleware("SUPER_ADMIN"),
  financeController.deleteDividen
);

// ===================== T R A N S A C T I O N ==================

// GET all transactions
router.get("/transaction",
  authMiddleware,
  financeController.getAllTransactions
);

// GET one transaction
router.get("/transaction/:transactionId",
  authMiddleware,
  financeController.getOneTransaction
);

// CREATE transaction
router.post("/transaction",
  authMiddleware,
  financeController.createTransaction
);

// Approve => SUPER_ADMIN
router.put("/transaction/:transactionId/approve",
  authMiddleware,
  roleMiddleware("SUPER_ADMIN"),
  financeController.approveTransaction
);

// Reject => SUPER_ADMIN
router.put("/transaction/:transactionId/reject",
  authMiddleware,
  roleMiddleware("SUPER_ADMIN"),
  financeController.rejectTransaction
);

// (opsional) put/delete => update or delete transaction?

// ================== O W N E R S H I P  (KEPEMILIKAN) =================

// GET all ownership
router.get("/ownership",
  authMiddleware,
  financeController.getAllOwnership
);

// GET one ownership
router.get("/ownership/:id",
  authMiddleware,
  financeController.getOneOwnership
);

// CREATE ownership
router.post("/ownership",
  authMiddleware,
  roleMiddleware("SUPER_ADMIN"),
  financeController.createOwnership
);

// UPDATE ownership
router.put("/ownership/:id",
  authMiddleware,
  roleMiddleware("SUPER_ADMIN"),
  financeController.updateOwnership
);

// DELETE ownership
router.delete("/ownership/:id",
  authMiddleware,
  roleMiddleware("SUPER_ADMIN"),
  financeController.deleteOwnership
);

// ================== D I S T R I B U T E  P R O F I T =================

// POST => SUPER_ADMIN
router.post("/distribute",
  authMiddleware,
  roleMiddleware("SUPER_ADMIN"),
  financeController.distributeProfit
);

module.exports = router;
