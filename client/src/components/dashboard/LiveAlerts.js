import React, { useState, useEffect } from 'react';
import axiosConfig from '../../api/axiosConfig';

const LiveAlerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const { data } = await axiosConfig.get('/alerts');
        setAlerts(data);
      } catch (error) {
        console.error("Failed to fetch alerts", error);
      }
    };

    fetchAlerts();
    const interval = setInterval(fetchAlerts, 5000); // Check for new alerts every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const getAlertColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-100 border-red-500 text-red-700';
      case 'medium': return 'bg-yellow-100 border-yellow-500 text-yellow-700';
      default: return 'bg-blue-100 border-blue-500 text-blue-700';
    }
  };

  return (
    <div className="space-y-4 h-96 overflow-y-auto">
      {alerts.length > 0 ? (
        alerts.map((alert) => (
          <div key={alert._id} className={`border-l-4 p-4 rounded-r-lg ${getAlertColor(alert.severity)}`}>
            <p className="font-bold">{alert.type}</p>
            <p>{alert.message}</p>
            <p className="text-xs text-gray-500 mt-1">{new Date(alert.timestamp).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No active alerts.</p>
      )}
    </div>
  );
};

export default LiveAlerts;