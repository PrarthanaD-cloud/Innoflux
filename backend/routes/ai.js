const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/ai-tips
router.get('/ai-tips', (req, res) => {
  const consumption = db.prepare(`
    SELECT SUM(kwh) as total FROM consumption
  `).get();

  const appliances = db.prepare(`
    SELECT name, percentage FROM appliances ORDER BY percentage DESC LIMIT 1
  `).get();

  const totalKwh = consumption?.total || 42;
  const topAppliance = appliances?.name || 'HVAC';

  const tips = [
    {
      icon: '💡',
      title: 'Switch to LED Bulbs',
      saving: 'Save up to 75% on lighting costs',
      priority: 'High'
    },
    {
      icon: '❄️',
      title: `Optimize ${topAppliance} Usage`,
      saving: `${topAppliance} is your top consumer — reduce usage by 1hr/day`,
      priority: 'High'
    },
    {
      icon: '🔌',
      title: 'Unplug Idle Devices',
      saving: 'Standby power costs ₹200/month',
      priority: 'Medium'
    },
    {
      icon: '🌅',
      title: 'Use Natural Light',
      saving: 'Reduce daytime lighting by 40%',
      priority: 'Medium'
    },
    {
      icon: '🧺',
      title: 'Run Appliances Off-Peak',
      saving: 'Shift usage to 10 PM - 6 AM',
      priority: 'Low'
    },
    {
      icon: '📊',
      title: 'Monthly Usage Insight',
      saving: `Your total usage is ${totalKwh.toFixed(1)} kWh — track weekly to reduce by 10%`,
      priority: 'Low'
    }
  ];

  res.json(tips);
});

module.exports = router;
