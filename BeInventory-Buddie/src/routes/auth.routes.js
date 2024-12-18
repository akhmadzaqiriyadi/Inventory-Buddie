const express = require('express');
const { login, register } = require('../controllers/auth.controller');
const router = express.Router();

// Rute untuk login
router.post('/login', login);

// Rute untuk registrasi
router.post('/register', register);

module.exports = router;
