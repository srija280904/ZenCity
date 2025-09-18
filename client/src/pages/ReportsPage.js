import React from 'react';
import Layout from '../components/common/Layout';
import TrendGraph from '../components/reports/TrendGraph';

const ReportsPage = () => {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Analytics & Reports</h1>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Weekly Traffic Congestion Trends</h2>
                    <TrendGraph />
                </div>
            </div>
        </Layout>
    );
};

export default ReportsPage;