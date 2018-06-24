const express = require('express');
const overtimeRoutes = require('./overtime_calculation/controller');

const router = express.Router();

router.use('/overtime', overtimeRoutes);

module.exports = router;
