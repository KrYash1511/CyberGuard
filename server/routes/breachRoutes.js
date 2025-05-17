const express = require('express');
const { checkData } = require('../controllers/breachController');

const router = express.Router();

router.post('/check', checkData); // New endpoint

module.exports = router;
