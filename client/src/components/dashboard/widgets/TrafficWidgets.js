import React from 'react';
import MetricCard from '../../common/MetricCard';
import TrafficLineChart from '../TrafficLineChart';
import CityMap from '../CityMap';

// This component receives the dashboard data as a prop
const TrafficWidgets = ({ data }) => {
  return (
    <>
      {/* Metric Cards for Traffic Role */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <MetricCard title="Traffic Congestion" value={`${data?.latest?.traffic?.value?.congestion || 0}%`} />
        <MetricCard title="Average Speed" value={`${data?.latest?.traffic?.value?.speed || 0} km/h`} />
      </div>

      {/* Charts & Map for Traffic Role */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Live Traffic Flow</h2>
          <TrafficLineChart data={data?.history?.traffic || []} />
        </div>
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">City Overview Map</h2>
          <CityMap />
        </div>
      </div>
    </>
  );
};

export default TrafficWidgets;