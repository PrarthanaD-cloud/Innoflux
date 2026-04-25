const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/alerts
router.get('/alerts', (req, res) => {
  const rows = db.prepare(`
    SELECT severity, title, message, created_at FROM alerts ORDER BY created_at DESC
  `).all();

  if (rows.length === 0) {
    return res.json([
      { severity: 'critical', title: 'High Usage Detected', message: 'Energy usage is 40% above average today.' },
      { severity: 'warning', title: 'Peak Hour Alert', message: 'You are consuming energy during peak hours.' },
      { severity: 'info', title: 'Tip', message: 'Switch off standby devices to save ₹200/month.' }
    ]);
  }

  res.json(rows);
});

module.exports = router;
