const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors({ origin: '*' }));
app.use(express.static('../frontend'));

// Routes
app.use('/api', require('./routes/energy'));
app.use('/api', require('./routes/appliances'));
app.use('/api', require('./routes/alerts'));
app.use('/api', require('./routes/simulator'));
app.use('/api', require('./routes/goals'));
app.use('/api', require('./routes/ai'));

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Smart Energy Dashboard API is running!' });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
