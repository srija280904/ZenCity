import React, { useState, useEffect } from 'react';
import Layout from '../components/common/Layout';
import MetricCard from '../components/common/MetricCard';
import TrafficLineChart from '../components/dashboard/TrafficLineChart';
import AirQualityPieChart from '../components/dashboard/AirQualityPieChart';
import CityMap from '../components/dashboard/CityMap';
import LiveAlerts from '../components/dashboard/LiveAlerts';
import axiosConfig from '../api/axiosConfig';

const DashboardPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosConfig.get('/data/dashboard');
        setData(res.data);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Real-Time City Dashboard</h1>
        
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <MetricCard title="Traffic Congestion" value={`${data?.latest?.traffic?.value?.congestion || 0}%`} />
          <MetricCard title="Average Speed" value={`${data?.latest?.traffic?.value?.speed || 0} km/h`} />
          <MetricCard title="Air Quality (AQI)" value={data?.latest?.airQuality?.value?.aqi || 0} />
          <MetricCard title="Avg. Waste Level" value={`${data?.latest?.wasteLevel?.value?.level || 0}%`} />
        </div>

        {/* Charts & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Live Traffic Flow</h2>
            <TrafficLineChart data={data?.history?.traffic || []} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Air Quality Components</h2>
            <AirQualityPieChart data={data?.latest?.airQuality?.value || {}} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">City Overview Map</h2>
                <CityMap />
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
                 <h2 className="text-xl font-semibold mb-4">Live Alerts</h2>
                 <LiveAlerts />
            </div>
        </div>

      </div>
    </Layout>
  );
};

export default DashboardPage;