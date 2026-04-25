const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/goals
router.get('/goals', (req, res) => {
  const row = db.prepare(`
    SELECT target_reduction, achieved, money_saved FROM goals ORDER BY updated_at DESC LIMIT 1
  `).get();

  if (!row) {
    return res.json({
      target_reduction: 20,
      achieved: 12,
      money_saved: 520
    });
  }

  res.json(row);
});

// POST /api/goals
router.post('/goals', (req, res) => {
  const { target_reduction } = req.body;

  if (!target_reduction) {
    return res.status(400).json({ error: 'target_reduction is required' });
  }

  db.prepare(`
    INSERT INTO goals (target_reduction, achieved, money_saved) VALUES (?, 0, 0)
  `).run(target_reduction);

  res.json({ message: 'Goal saved successfully!', target_reduction });
});

module.exports = router;
