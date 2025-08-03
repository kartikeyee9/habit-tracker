'use client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

type HabitChartProps = {
  data: { week: string; count: number }[];
  habitName: string;
};

export default function HabitChart({ data, habitName }: HabitChartProps) {
  return (
    <div className="bg-white p-4 rounded shadow w-full">
      <h3 className="text-purple-700 font-semibold mb-2">{habitName}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#a855f7" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
