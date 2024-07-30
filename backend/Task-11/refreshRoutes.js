// routes/refreshRoutes.js
const express = require('express');
const { refreshToken } = require('../controllers/refreshTokenController');

const router = express.Router();

router.post('/refresh-token', refreshToken);

module.exports = router;
