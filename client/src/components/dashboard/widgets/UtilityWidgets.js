import React from 'react';
import MetricCard from '../../common/MetricCard';
import EnergyBarChart from '../EnergyBarChart';

const UtilityWidgets = ({ data }) => {
  return (
    <>
      {/* Metric Cards for Utility Role */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <MetricCard title="Energy Consumption" value={`${data?.latest?.energy?.value?.consumption || 0} MWh`} />
        <MetricCard title="Grid Load" value={`${data?.latest?.energy?.value?.grid_load || 0}%`} />
      </div>

      {/* Chart for Utility Role */}
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Live Energy Consumption</h2>
          <EnergyBarChart data={data?.history?.energy || []} />
        </div>
      </div>
    </>
  );
};

export default UtilityWidgets;