# Smart Energy Insight Dashboard

A full-stack web application that monitors electricity usage, estimates cost, and provides meaningful insights to help users reduce energy consumption and improve efficiency.

---

##  Overview

The **Smart Energy Insight Dashboard** analyzes energy consumption data and presents it in a clear, interactive format.
It combines data visualization, backend processing, and analytical logic to help users understand usage patterns and optimize electricity usage.

---

##  Key Features

*  Real-time energy consumption visualization
*  Estimated electricity bill calculation
*  Weekly usage comparison
*  Energy efficiency scoring system
*  Alerts for unusual usage patterns
*  Usage insights (peak usage, trends)
*  Appliance-wise consumption breakdown
*  Goal tracking for energy reduction
*  What-if simulator for cost prediction
*  Solar usage optimization suggestions
*  Neighborhood comparison (benchmarking)

---

##  Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* Chart.js

### Backend

* Node.js
* Express.js

### Data Handling

* CSV dataset
* csv-parser (Node.js package)

---

##  Project Structure

```
smart-energy-dashboard/
│
├── backend/
│   ├── server.js
│   ├── data.csv
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│
└── README.md
```

---

##  Setup Instructions

### 1. Clone Repository

```
git clone https://github.com/your-username/smart-energy-dashboard.git
cd smart-energy-dashboard
```

### 2. Install Dependencies

```
npm install
```

### 3. Start Backend Server

```
node server.js
```

Server runs at:

```
http://localhost:3000
```

### 4. Run Frontend

Open:

```
frontend/index.html
```

Or use **Live Server** in VS Code.

---

##  API Endpoint

| Method | Endpoint | Description          |
| ------ | -------- | -------------------- |
| GET    | /data    | Fetch energy dataset |

---

##  Sample Dataset Format

```
timestamp,consumption,appliance
2026-01-01 10:00,1.2,AC
2026-01-01 11:00,0.5,Fridge
```

---

##  Core Calculations

* **Total Consumption**
  Sum of all energy usage (kWh)

* **Cost Estimation**
  `cost = total_units × price_per_unit`

* **Percentage Change**
  `((current - previous) / previous) × 100`

* **Appliance Distribution**
  `(device_usage / total_usage) × 100`

---

##  Analytics Logic

* Peak usage detection based on time intervals
* Anomaly detection using deviation from average
* Trend analysis for weekly comparison
* Rule-based recommendation system

---

##  Future Enhancements

* Advanced statistical analysis
* User authentication & profiles
* Cloud deployment (AWS / Firebase)
* Mobile application integration
* IoT smart meter connectivity

---

##  Team


* Prarthana S
* Prarthana D
* Prathyusha L
* Ashwini N D

---

##  License

This project is licensed under the MIT License.

---

##  Contribution

Contributions are welcome!
Feel free to fork the repository and submit a pull request.

---

##  Purpose

This project was developed as part of a hackathon to promote **smart energy usage and sustainability**.
