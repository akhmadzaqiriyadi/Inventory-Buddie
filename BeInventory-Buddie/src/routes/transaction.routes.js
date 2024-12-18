const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRole } = require('../middleware/auth.middleware');
const transactionController = require('../controllers/transaction.controller');

// Routes untuk transaksi
router.get('/', authenticateToken, transactionController.getAllTransactions); // Semua pengguna dapat melihat transaksi
router.post('/', authenticateToken, authorizeRole('admin'), transactionController.createTransaction); // Hanya admin
router.get('/:id', authenticateToken, transactionController.getTransactionById); // Detail transaksi
router.delete('/:id', authenticateToken, authorizeRole('admin'), transactionController.deleteTransaction); // Hanya admin

module.exports = router;
