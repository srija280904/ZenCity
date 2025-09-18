import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const EnergyBarChart = ({ data }) => {
  const chartData = data.map(item => ({
    time: new Date(item.timestamp).toLocaleTimeString(),
    consumption: item.value.consumption,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="consumption" fill="#82ca9d" name="Consumption (MWh)" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default EnergyBarChart;