import DataLog from '../models/DataLog.js';
import Alert from '../models/Alert.js';

const createTrafficLog = () => {
  const congestion = Math.floor(Math.random() * 100);
  const data = new DataLog({
    type: 'traffic',
    value: {
      congestion,
      speed: 60 - Math.floor(congestion * 0.4),
    },
    location: { lat: 11.0168, lng: 76.9558 },
  });
  data.save();
  
  if (congestion > 85) {
    const alert = new Alert({
        type: 'High Traffic',
        message: `High traffic congestion (${congestion}%) detected near City Center.`,
        severity: 'high'
    });
    alert.save();
  }
};

const createAirQualityLog = () => {
  const data = new DataLog({
    type: 'air_quality',
    value: {
      aqi: Math.floor(Math.random() * 200),
      pm25: Math.floor(Math.random() * 150),
      co: Math.floor(Math.random() * 10),
    },
    location: { lat: 11.0250, lng: 76.9650 },
  });
  data.save();
};

const createWasteLevelLog = () => {
  const data = new DataLog({
    type: 'waste_level',
    value: {
      binId: `BIN-${Math.floor(1000 + Math.random() * 9000)}`,
      level: Math.floor(Math.random() * 100),
    },
    location: { lat: 11.005, lng: 76.945 },
  });
  data.save();
};

export const startDataSimulation = () => {
  // Run every 5 seconds for demo purposes
  setInterval(() => {
    createTrafficLog();
    createAirQualityLog();
    createWasteLevelLog();
  }, 5000);
};