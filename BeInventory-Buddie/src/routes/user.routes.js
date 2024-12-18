const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticateToken, authorizeRole } = require('../middleware/auth.middleware');

// GET all users
router.get('/users', authenticateToken, authorizeRole('admin'), userController.getAllUsers);

// GET user by ID
router.get('/users/:id', authenticateToken, authorizeRole('admin'), userController.getUserById);

// POST create a new user
router.post('/users', authenticateToken, authorizeRole('admin'), userController.createUser);

// PUT update a user
router.put('/users/:id', authenticateToken, authorizeRole('admin'), userController.updateUser);

// DELETE user
router.delete('/users/:id', authenticateToken, authorizeRole('admin'), userController.deleteUser);

module.exports = router;