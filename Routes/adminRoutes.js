const express = require('express');
const router = express.Router();
const { loginAdmin } = require('../Controller/adminController');

// POST /akhilam/admin/login - Admin login
router.post('/login', loginAdmin);

module.exports = router;