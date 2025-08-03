'use client';
import { useEffect, useState } from 'react';
import api from '../lib/api';
import HabitChart from './HabitChart';

type Habit = {
  id: string;
  name: string;
};

type WeeklyData = {
  week: string;
  count: number;
};

export default function HabitChartSection({ userId }: { userId: string }) {
  const [habitData, setHabitData] = useState<{ habit: Habit; data: WeeklyData[] }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const habitsRes = await api.get(`/habits/${userId}`);
        const habits = habitsRes.data;

        const result = await Promise.all(
          habits.map(async (habit: Habit) => {
            const res = await api.get(`/habits/${habit.id}/checkins/weekly`);
            return { habit, data: res.data };
          })
        );

        setHabitData(result);
      } catch (err) {
        console.error('Error loading chart data:', err);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold text-purple-700 mb-4">📊 Weekly Progress Charts</h2>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {habitData.map(({ habit, data }) => (
          <HabitChart key={habit.id} data={data} habitName={habit.name} />
        ))}
      </div>
    </div>
  );
}
