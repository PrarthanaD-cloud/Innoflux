const energyData = {
  summary: {
    totalUsage: 342.5,
    totalCost: 2737,
    peakHour: "6 PM - 9 PM",
    savedThisMonth: 12.4
  },
  daily: [
    { day: "Mon", usage: 45.2 },
    { day: "Tue", usage: 38.7 },
    { day: "Wed", usage: 52.1 },
    { day: "Thu", usage: 41.3 },
    { day: "Fri", usage: 60.8 },
    { day: "Sat", usage: 55.4 },
    { day: "Sun", usage: 49.0 }
  ],
  rooms: [
    { name: "Living Room", usage: 89.3, percentage: 26 },
    { name: "Kitchen",     usage: 74.1, percentage: 22 },
    { name: "Bedroom",     usage: 61.5, percentage: 18 },
    { name: "Office",      usage: 54.2, percentage: 16 },
    { name: "Bathroom",    usage: 34.8, percentage: 10 },
    { name: "Others",      usage: 28.6, percentage: 8  }
  ],
  monthly: [
    { month: "Jan", usage: 410 },
    { month: "Feb", usage: 380 },
    { month: "Mar", usage: 360 },
    { month: "Apr", usage: 320 },
    { month: "May", usage: 295 },
    { month: "Jun", usage: 342 }
  ],
  tips: [
    { icon: "💡", title: "Switch to LED Bulbs", saving: "Save up to 75% on lighting costs", priority: "High" },
    { icon: "❄️", title: "Optimize AC Temperature", saving: "Set to 24°C to save 6% per degree", priority: "High" },
    { icon: "🔌", title: "Unplug Idle Devices", saving: "Standby power costs ₹200/month", priority: "Medium" },
    { icon: "🌅", title: "Use Natural Light", saving: "Reduce daytime lighting by 40%", priority: "Medium" },
    { icon: "🧺", title: "Run Appliances Off-Peak", saving: "Shift usage to 10 PM - 6 AM", priority: "Low" }
  ]
};

module.exports = energyData;

