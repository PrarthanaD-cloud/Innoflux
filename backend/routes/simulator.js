const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/simulate?appliance=ac&hours=8
router.get('/simulate', (req, res) => {
  const { appliance, hours } = req.query;

  const applianceWatts = {
    ac: 1500,
    fridge: 150,
    washingmachine: 500,
    tv: 100,
    heater: 2000,
    lights: 60
  };

  const ratePerKwh = 7.97;

  const watts = applianceWatts[appliance?.toLowerCase()] || 500;
  const hoursNum = parseFloat(hours) || 1;

  const kwh = parseFloat(((watts * hoursNum) / 1000).toFixed(3));
  const cost = parseFloat((kwh * ratePerKwh).toFixed(2));
  const monthlyCost = parseFloat((cost * 30).toFixed(2));
  const monthlyKwh = parseFloat((kwh * 30).toFixed(2));

  res.json({
    appliance: appliance || 'unknown',
    hours: hoursNum,
    kwh,
    cost,
    monthlyCost,
    monthlyKwh
  });
});

module.exports = router;
