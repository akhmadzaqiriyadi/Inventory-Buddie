const express = require('express');
const router = express.Router();
const {
    getStockStatistics,
    getTransactionStatistics,
    getFinancialStatistics,
  } = require('../controllers/statistics.controller');

router.get('/stock', getStockStatistics);

// Statistik transaksi
router.get('/transactions', getTransactionStatistics);

// Statistik keuangan
router.get('finance', getFinancialStatistics);

module.exports = router;
