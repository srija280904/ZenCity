import React from 'react';
import MetricCard from '../../common/MetricCard';
import AirQualityPieChart from '../AirQualityPieChart';
import LiveAlerts from '../LiveAlerts';

// This component receives the dashboard data as a prop
const EnvironmentWidgets = ({ data }) => {
  return (
    <>
      {/* Metric Cards for Environment Role */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <MetricCard title="Air Quality (AQI)" value={data?.latest?.airQuality?.value?.aqi || 0} />
        <MetricCard title="Avg. Waste Level" value={`${data?.latest?.wasteLevel?.value?.level || 0}%`} />
      </div>

      {/* Charts for Environment Role */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Air Quality Components</h2>
          <AirQualityPieChart data={data?.latest?.airQuality?.value || {}} />
        </div>
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Live Environment Alerts</h2>
          <LiveAlerts />
        </div>
      </div>
    </>
  );
};

export default EnvironmentWidgets;