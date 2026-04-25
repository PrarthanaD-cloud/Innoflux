const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/appliances
router.get('/appliances', (req, res) => {
  const rows = db.prepare(`
    SELECT name, percentage, kwh FROM appliances
  `).all();

  if (rows.length === 0) {
    return res.json([
      { name: 'Kitchen', percentage: 28.5, kwh: 0.42 },
      { name: 'Laundry', percentage: 22.3, kwh: 0.33 },
      { name: 'HVAC/Water heater', percentage: 35.1, kwh: 0.52 },
      { name: 'Other', percentage: 14.1, kwh: 0.21 }
    ]);
  }

  res.json(rows);
});

module.exports = router;
