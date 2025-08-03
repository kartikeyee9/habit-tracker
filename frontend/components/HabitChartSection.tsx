import { useEffect, useState } from 'react';
import HabitChart from './HabitChart';
import api from '../lib/api';

type Habit = {
  id: string;
  name: string;
};

export default function HabitChartSection({ userId }: { userId: string }) {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [selectedHabit, setSelectedHabit] = useState<string | null>(null);
  const [chartData, setChartData] = useState<{ date: string; count: number }[]>([]);

  useEffect(() => {
    const fetchHabits = async () => {
      const res = await api.get(`/habits/${userId}`);
      setHabits(res.data);
    };
    fetchHabits();
  }, [userId]);

  useEffect(() => {
    if (!selectedHabit) return;

    const fetchWeeklyData = async () => {
      try {
        const res = await api.get(`/habits/${selectedHabit}/checkins/weekly`);
        // ✅ Fix: extract the weeklyCounts array
        setChartData(
          res.data.weeklyCounts.map((entry: { day: string; count: number }) => ({
            date: entry.day,
            count: entry.count,
          }))
        );
      } catch (err) {
        console.error('Failed to fetch weekly check-ins:', err);
        setChartData([]);
      }
    };

    fetchWeeklyData();
  }, [selectedHabit]);

  return (
    <div className="mt-10 bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold text-purple-700 mb-4">📊 Weekly Progress</h2>

      <select
        className="mb-4 px-4 py-2 border rounded w-full sm:w-auto"
        onChange={(e) => setSelectedHabit(e.target.value)}
        defaultValue=""
      >
        <option value="" disabled>
          Select a habit to view chart
        </option>
        {habits.map((habit) => (
          <option key={habit.id} value={habit.id}>
            {habit.name}
          </option>
        ))}
      </select>

      {chartData.length > 0 ? (
        <HabitChart data={chartData} />
      ) : (
        <p className="text-gray-500 text-sm">No data to display.</p>
      )}
    </div>
  );
}
