// import React, { useState, useEffect } from 'react';
// import Layout from '../components/common/Layout';
// import MetricCard from '../components/common/MetricCard';
// import TrafficLineChart from '../components/dashboard/TrafficLineChart';
// import AirQualityPieChart from '../components/dashboard/AirQualityPieChart';
// import CityMap from '../components/dashboard/CityMap';
// import LiveAlerts from '../components/dashboard/LiveAlerts';
// import axiosConfig from '../api/axiosConfig';

// const DashboardPage = () => {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axiosConfig.get('/data/dashboard');
//         setData(res.data);
//       } catch (error) {
//         console.error("Error fetching dashboard data", error);
//       }
//     };

//     fetchData();
//     const interval = setInterval(fetchData, 5000); // Refresh every 5 seconds
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <Layout>
//       <div className="container mx-auto px-4 py-6">
//         <h1 className="text-3xl font-bold text-gray-800 mb-6">Real-Time City Dashboard</h1>
        
//         {/* Metric Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//           <MetricCard title="Traffic Congestion" value={`${data?.latest?.traffic?.value?.congestion || 0}%`} />
//           <MetricCard title="Average Speed" value={`${data?.latest?.traffic?.value?.speed || 0} km/h`} />
//           <MetricCard title="Air Quality (AQI)" value={data?.latest?.airQuality?.value?.aqi || 0} />
//           <MetricCard title="Avg. Waste Level" value={`${data?.latest?.wasteLevel?.value?.level || 0}%`} />
//         </div>

//         {/* Charts & Map */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
//             <h2 className="text-xl font-semibold mb-4">Live Traffic Flow</h2>
//             <TrafficLineChart data={data?.history?.traffic || []} />
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow">
//             <h2 className="text-xl font-semibold mb-4">Air Quality Components</h2>
//             <AirQualityPieChart data={data?.latest?.airQuality?.value || {}} />
//           </div>
//         </div>
        
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
//             <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
//                 <h2 className="text-xl font-semibold mb-4">City Overview Map</h2>
//                 <CityMap />
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow">
//                  <h2 className="text-xl font-semibold mb-4">Live Alerts</h2>
//                  <LiveAlerts />
//             </div>
//         </div>

//       </div>
//     </Layout>
//   );
// };

// export default DashboardPage;

// updated
// import React, { useState, useEffect } from 'react';
// import Layout from '../components/common/Layout';
// import axiosConfig from '../api/axiosConfig';
// import useAuth from '../hooks/useAuth'; // Import useAuth hook

// // Import the new role-specific widgets
// import TrafficWidgets from '../components/dashboard/widgets/TrafficWidgets';
// import EnvironmentWidgets from '../components/dashboard/widgets/EnvironmentWidgets';

// // We can create a simple Admin component here or import it
// const AdminWidgets = ({ data }) => (
//   <>
//     <TrafficWidgets data={data} />
//     <div className="mt-6"> {/* Add some space between sections */}
//       <EnvironmentWidgets data={data} />
//     </div>
//   </>
// );

// const DashboardPage = () => {
//   const [data, setData] = useState(null);
//   const { auth } = useAuth(); // Get auth state, which includes user role

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axiosConfig.get('/data/dashboard');
//         setData(res.data);
//       } catch (error) {
//         console.error("Error fetching dashboard data", error);
//       }
//     };

//     fetchData();
//     const interval = setInterval(fetchData, 5000); // Refresh every 5 seconds
//     return () => clearInterval(interval);
//   }, []);

//   // Function to render the correct dashboard based on user role
//   const renderDashboardByRole = () => {
//     const userRole = auth.user?.role;

//     switch (userRole) {
//       case 'Admin':
//         return <AdminWidgets data={data} />;
//       case 'Traffic':
//         return <TrafficWidgets data={data} />;
//       case 'Environment':
//         return <EnvironmentWidgets data={data} />;
//       // Default case can be a restricted view or the admin view
//       default:
//         return <AdminWidgets data={data} />;
//     }
//   };

//   return (
//     <Layout>
//       <div className="container mx-auto px-4 py-6">
//         <h1 className="text-3xl font-bold text-gray-800 mb-6">
//           {auth.user?.role} Dashboard
//         </h1>

//         {/* Render the dashboard conditionally */}
//         {data ? renderDashboardByRole() : <p>Loading data...</p>}

//       </div>
//     </Layout>
//   );
// };

// export default DashboardPage;

//updated-2
import React, { useState, useEffect } from 'react';
import Layout from '../components/common/Layout';
import axiosConfig from '../api/axiosConfig';
import useAuth from '../hooks/useAuth';

// Import the role-specific widgets
import TrafficWidgets from '../components/dashboard/widgets/TrafficWidgets';
import EnvironmentWidgets from '../components/dashboard/widgets/EnvironmentWidgets';
import UtilityWidgets from '../components/dashboard/widgets/UtilityWidgets'; // Import new widget

// Admin component now includes all three widget groups
const AdminWidgets = ({ data }) => (
  <>
    <TrafficWidgets data={data} />
    <div className="mt-6">
      <EnvironmentWidgets data={data} />
    </div>
    <div className="mt-6">
      <UtilityWidgets data={data} />
    </div>
  </>
);

const DashboardPage = () => {
  const [data, setData] = useState(null);
  const { auth } = useAuth();

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
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  // Function to render the correct dashboard based on user role
  const renderDashboardByRole = () => {
    const userRole = auth.user?.role;

    switch (userRole) {
      case 'Admin':
        return <AdminWidgets data={data} />;
      case 'Traffic':
        return <TrafficWidgets data={data} />;
      case 'Environment':
        return <EnvironmentWidgets data={data} />;
      case 'Utility': // Add case for Utility role
        return <UtilityWidgets data={data} />;
      default:
        return <p>No dashboard available for this role.</p>;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          {auth.user?.role} Dashboard
        </h1>
        
        {data ? renderDashboardByRole() : <p>Loading data...</p>}
      </div>
    </Layout>
  );
};

export default DashboardPage;