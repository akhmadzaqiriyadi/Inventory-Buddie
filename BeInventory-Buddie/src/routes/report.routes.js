const express = require('express');
const router = express.Router();
const { getStockReport, getTransactionReport, getSalesAndPurchasesSummary } = require('../controllers/report.controller');
const { authenticateToken, authorizeRole } = require('../middleware/auth.middleware');


router.get('/stock', authenticateToken, authorizeRole('admin'), getStockReport);
router.get('/transactions', authenticateToken, authorizeRole('admin'), getTransactionReport);
router.get('/summary', getSalesAndPurchasesSummary);

module.exports = router;