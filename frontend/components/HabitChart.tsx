'use client';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type WeeklyData = { date: string; count: number }[];

export default function HabitChart({ data }: { data: WeeklyData }) {
  return (
    <div className="w-full h-60 bg-gray-50 rounded-lg p-2 border border-gray-200">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} />
          <Tooltip
            contentStyle={{ backgroundColor: '#f9f9f9', borderColor: '#ddd' }}
            labelStyle={{ fontWeight: 'bold' }}
          />
          <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
