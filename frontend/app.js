const API = '/api';

// Set date
document.getElementById('currentDate').textContent =
  new Date().toLocaleDateString('en-IN', { weekday:'long', year:'numeric', month:'long', day:'numeric' });

// Load summary cards
fetch(`${API}/consumption`)
  .then(r => r.json())
  .then(d => {
    document.getElementById('todayKwh').textContent = `${d.todayKwh} kWh`;
    document.getElementById('bill').textContent = `₹${d.bill}`;
    document.getElementById('delta').textContent = `${d.delta > 0 ? '+' : ''}${d.delta}%`;
    document.getElementById('score').textContent = `${d.score}/100`;
  });

// Trend Chart
let trendChart = null;

function loadTrend(view) {
  // Update active button
  document.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.querySelector(`.toggle-btn[onclick="loadTrend('${view}')"]`);
  if (activeBtn) activeBtn.classList.add('active');

  fetch(`${API}/trend?view=${view}`)
    .then(r => r.json())
    .then(d => {
      if (trendChart) trendChart.destroy();
      trendChart = new Chart(document.getElementById('trendChart'), {
        type: 'line',
        data: {
          labels: d.labels,
          datasets: [{
            label: 'kWh',
            data: d.values,
            borderColor: '#00e5ff',
            backgroundColor: 'rgba(0,229,255,0.1)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#00e5ff'
          }]
        },
        options: {
          plugins: { legend: { display: false } },
          scales: {
            x: { ticks: { color: '#888' }, grid: { color: '#1e2130' } },
            y: { ticks: { color: '#888' }, grid: { color: '#1e2130' } }
          }
        }
      });
    });
}

// Load default trend
loadTrend('day');

// Appliance Chart
fetch(`${API}/appliances`)
  .then(r => r.json())
  .then(d => {
    new Chart(document.getElementById('applianceChart'), {
      type: 'doughnut',
      data: {
        labels: d.map(x => x.name),
        datasets: [{
          data: d.map(x => x.percentage),
          backgroundColor: ['#00e5ff','#e040fb','#00e676','#ff9100'],
          borderWidth: 0
        }]
      },
      options: {
        plugins: {
          legend: { position: 'right', labels: { color: '#aaa', padding: 16 } }
        }
      }
    });
  });

// Alerts
fetch(`${API}/alerts`)
  .then(r => r.json())
  .then(alerts => {
    const list = document.getElementById('alertsList');
    alerts.forEach(a => {
      list.innerHTML += `
        <div class="alert-item ${a.severity}">
          <div>
            <div class="alert-title">${a.title}</div>
            <div class="alert-msg">${a.message}</div>
          </div>
        </div>`;
    });
  });

// Goals
fetch(`${API}/goals`)
  .then(r => r.json())
  .then(g => {
    const percent = Math.min(100, Math.round((g.achieved / g.target_reduction) * 100));
    document.getElementById('goalsSection').innerHTML = `
      <div class="goal-bar-wrap">
        <div class="goal-label">
          <span>Target: ${g.target_reduction}% reduction</span>
          <span>${g.achieved}% achieved</span>
        </div>
        <div class="goal-bar">
          <div class="goal-bar-fill" style="width: ${percent}%"></div>
        </div>
        <div class="goal-savings">💰 Money Saved: ₹${g.money_saved}</div>
      </div>`;
  });

// AI Tips
fetch(`${API}/ai-tips`)
  .then(r => r.json())
  .then(tips => {
    const list = document.getElementById('tipsList');
    tips.forEach(t => {
      list.innerHTML += `
        <div class="tip-item">
          <div class="tip-icon">${t.icon}</div>
          <div>
            <div class="tip-title">${t.title}</div>
            <div class="tip-saving">${t.saving}</div>
          </div>
          <span class="tip-priority priority-${t.priority}">${t.priority}</span>
        </div>`;
    });
  });
