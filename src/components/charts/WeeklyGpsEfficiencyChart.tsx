'use client';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import useSWR from 'swr';

export default function WeeklyGpsEfficiencyChart() {
  const {data, isLoading} = useSWR('getWeeklyGpsReport', GetWeeklyGpsReport)

  async function GetWeeklyGpsReport() {
    try {
      const response = await fetch("/api/device-effeciency");
      if (!response.ok) {
        console.error("Failed to fetch: HTTP error", response.status);
        return null;
      }
  
      const data = await response.json();
      console.log(data);
  
      return data.success ? data : null;
    } catch (error) {
      console.error("Fetch error:", error);
      return null;
    }
  };

  return (
    <div className="w-full h-[400px] bg-white shadow rounded-xl p-4">
      <h2 className="text-xl font-semibold mb-4">Weekly GPS Transmission Efficiency</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="expected" fill="#a5b4fc" name="Expected" />
          <Bar dataKey="actual" fill="#3b82f6" name="Actual" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
