import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axiosConfig from '../../api/axiosConfig';

const dayMapping = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const TrendGraph = () => {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const { data } = await axiosConfig.get('/data/reports');
        const formattedData = data.trafficReport.map(item => ({
          day: dayMapping[item._id - 1], // Adjust MongoDB's dayOfWeek (1=Sun) to array index
          'Average Congestion': item.avgCongestion.toFixed(2),
        }));
        setReportData(formattedData);
      } catch (error) {
        console.error("Failed to fetch report data", error);
      }
    };
    fetchReportData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={reportData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis label={{ value: 'Congestion %', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="Average Congestion" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TrendGraph;