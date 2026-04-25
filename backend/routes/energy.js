const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/consumption - summary cards
router.get('/consumption', (req, res) => {
  const today = '2007-01-01';

  const todayData = db.prepare(`
    SELECT SUM(kwh) as total FROM consumption WHERE date = ?
  `).get(today);

  const monthData = db.prepare(`
    SELECT SUM(kwh) as total FROM consumption
  `).get();

  const lastWeekData = db.prepare(`
    SELECT SUM(kwh) as total FROM consumption WHERE date <= '2026-04-18'
  `).get();

  const todayKwh = parseFloat((todayData?.total || 18.6).toFixed(1));
  const monthKwh = parseFloat((monthData?.total || 542).toFixed(0));
  const bill = Math.round(monthKwh * 7.97);
  const lastWeekKwh = lastWeekData?.total || 17.1;
  const delta = parseFloat((((todayKwh - lastWeekKwh) / lastWeekKwh) * 100).toFixed(1));
  const score = Math.min(100, Math.max(0, Math.round(100 - (delta * 1.5))));

  res.json({ todayKwh, monthKwh, bill, delta, score });
});

// GET /api/trend?view=day|week|month
router.get('/trend', (req, res) => {
  const view = req.query.view || 'day';
  const today = '2007-01-01';

  if (view === 'day') {
    const rows = db.prepare(`
      SELECT hour, kwh FROM consumption WHERE date = ? ORDER BY hour
    `).all(today);

    const labels = rows.map(r => {
      const h = r.hour;
      if (h === 0) return '12 AM';
      if (h < 12) return `${h} AM`;
      if (h === 12) return '12 PM';
      return `${h - 12} PM`;
    });
    const values = rows.map(r => parseFloat(r.kwh.toFixed(2)));
    return res.json({ labels, values });
  }

  if (view === 'week') {
    const rows = db.prepare(`
      SELECT date, SUM(kwh) as total FROM consumption GROUP BY date ORDER BY date
    `).all();
    const labels = rows.map(r => {
      const d = new Date(r.date);
      return ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d.getDay()];
    });
    const values = rows.map(r => parseFloat(r.total.toFixed(1)));
    return res.json({ labels, values });
  }

  if (view === 'month') {
    const rows = db.prepare(`
      SELECT date, SUM(kwh) as total FROM consumption GROUP BY date ORDER BY date
    `).all();
    const weeks = [0, 0, 0, 0];
    rows.forEach((r, i) => {
      const wi = Math.min(3, Math.floor(i / 7));
      weeks[wi] += r.total;
    });
    return res.json({
      labels: ['W1', 'W2', 'W3', 'W4'],
      values: weeks.map(w => parseFloat(w.toFixed(1)))
    });
  }

  res.status(400).json({ error: 'Invalid view parameter' });
});

module.exports = router;
