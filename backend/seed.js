const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const db = new Database(path.join(__dirname, 'energy.db'));

db.exec(`
  DELETE FROM consumption;
  DELETE FROM appliances;
  DELETE FROM alerts;
  DELETE FROM goals;
`);

const filePath = path.join(__dirname, 'data.txt');
const lines = fs.readFileSync(filePath, 'utf8').split('\n');

const hourlyMap = {};

lines.slice(1).forEach(line => {
  const cols = line.trim().split(',');
  if (cols.length < 9) return;

  const date = cols[1]?.trim();
  const time = cols[2]?.trim();
  const activePower = parseFloat(cols[3]);

  if (!date || !time || isNaN(activePower)) return;

  const timeParts = time.split(':');
  if (!timeParts || timeParts.length < 2) return;

  const hour = parseInt(timeParts[0]);
  const dateParts = date.split('/');
  if (dateParts.length < 3) return;

  const formattedDate = `2007-${dateParts[1].padStart(2,'0')}-${dateParts[0].padStart(2,'0')}`;

  const key = `${formattedDate}_${hour}`;
  if (!hourlyMap[key]) {
    hourlyMap[key] = { date: formattedDate, hour, total: 0, count: 0 };
  }
  hourlyMap[key].total += activePower;
  hourlyMap[key].count += 1;
});

// Fill missing hours for 2007-01-01 with realistic data
const fullDay = '2007-01-01';
const basePattern = [
  2.5, 2.4, 2.5, 2.6, 2.5, 2.4,  // 0-5 AM low
  2.6, 2.8, 3.2, 3.5, 3.4, 2.6,  // 6-11 AM rising
  2.6, 2.6, 1.5, 1.4, 1.4, 1.5,  // 12-5 PM mid
  2.7, 3.8, 4.1, 3.9, 3.2, 2.8   // 6-11 PM peak
];

for (let h = 0; h < 24; h++) {
  const key = `${fullDay}_${h}`;
  if (!hourlyMap[key]) {
    hourlyMap[key] = { date: fullDay, hour: h, total: basePattern[h] * 60, count: 60 };
  }
}

// Add 6 more days with slight variation
const dates = [
  '2007-01-02', '2007-01-03', '2007-01-04',
  '2007-01-05', '2007-01-06', '2007-01-07'
];

dates.forEach((date, di) => {
  for (let h = 0; h < 24; h++) {
    const variation = 0.85 + Math.random() * 0.3;
    const kwh = basePattern[h] * variation;
    const key = `${date}_${h}`;
    hourlyMap[key] = { date, hour: h, total: kwh * 60, count: 60 };
  }
});

const insertConsumption = db.prepare(`
  INSERT INTO consumption (date, hour, kwh, type) VALUES (?, ?, ?, ?)
`);

Object.values(hourlyMap).forEach(({ date, hour, total, count }) => {
  const avgKw = total / count;
  const kwh = parseFloat((avgKw * 1).toFixed(3));
  insertConsumption.run(date, hour, kwh, 'total');
});

// Appliances
const insertAppliance = db.prepare(`
  INSERT INTO appliances (name, percentage, kwh) VALUES (?, ?, ?)
`);
insertAppliance.run('Kitchen', 28.5, 0.42);
insertAppliance.run('Laundry', 22.3, 0.33);
insertAppliance.run('HVAC/Water heater', 35.1, 0.52);
insertAppliance.run('Other', 14.1, 0.21);

// Alerts
const insertAlert = db.prepare(`
  INSERT INTO alerts (severity, title, message) VALUES (?, ?, ?)
`);
insertAlert.run('critical', 'HVAC running at peak hours', 'Sub-metering 3 shows sustained high load between 9AM-4PM.');
insertAlert.run('warning', 'Unusual spike detected at 9 AM', 'Global active power jumped to 3.5kW — 40% above baseline.');
insertAlert.run('info', 'Kitchen appliance standby waste', 'Sub-metering 1 shows near-zero but non-zero idle draw overnight.');
insertAlert.run('critical', 'High consumption day detected', 'Jan 1 total usage significantly above weekly average.');
insertAlert.run('info', 'Laundry optimisation opportunity', 'Sub-metering 2 activity peaks at midday — shift to off-peak hours.');

// Goals
const insertGoal = db.prepare(`
  INSERT INTO goals (target_reduction, achieved, money_saved) VALUES (?, ?, ?)
`);
insertGoal.run(20, 12, 520);

console.log('✅ Data seeded successfully!');
console.log(`Inserted ${Object.keys(hourlyMap).length} hourly records.`);