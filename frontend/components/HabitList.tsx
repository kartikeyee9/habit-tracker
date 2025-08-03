'use client';

import { useEffect, useState } from 'react';
import api from '../lib/api';
import HabitDrawer from './HabitDrawer';

type Habit = {
  id: string;
  name: string;
  checked: boolean;
  streak?: number;
};

export default function HabitList({ userId }: { userId: string }) {
  const [habits, setHabits] = useState<Habit[]>([]);

  const fetchHabits = async () => {
    try {
      const res = await api.get(`/habits/${userId}`);
      const habitsWithStreaks = await Promise.all(
        res.data.map(async (habit: any) => {
          const streakRes = await api.get(`/habits/${habit.id}/streak`);
          return { ...habit, streak: streakRes.data.streak };
        })
      );
      setHabits(habitsWithStreaks);
    } catch (err) {
      console.error('Error fetching habits:', err);
    }
  };

  const checkHabit = async (id: string) => {
    try {
      await api.post(`/habits/${id}/check`);
      fetchHabits();
    } catch (err) {
      alert('Already checked in today.');
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  return (
    <div className="space-y-4 mt-6">
      {habits.map((habit) => (
        <div
          key={habit.id}
          className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-4 rounded-xl shadow-md"
        >
          <div className="flex items-center gap-4">
            <button
              className={`px-4 py-1 rounded-full text-sm font-medium transition ${
                habit.checked
                  ? 'bg-green-500 text-white cursor-not-allowed'
                  : 'bg-purple-500 text-white hover:bg-purple-600'
              }`}
              onClick={() => checkHabit(habit.id)}
              disabled={habit.checked}
            >
              {habit.checked ? '✓ Done' : 'Mark Done'}
            </button>
            <span className="text-lg font-semibold text-gray-800">
              {habit.name}
            </span>
          </div>

          <div className="flex flex-col items-start sm:items-end mt-2 sm:mt-0 sm:ml-4">
            {typeof habit.streak === 'number' && (
              <div className="text-sm text-gray-600">
                🏆 Streak:{' '}
                <span className="font-semibold">{habit.streak}</span>{' '}
                day{habit.streak !== 1 ? 's' : ''}
              </div>
            )}

            <HabitDrawer habitId={habit.id} habitName={habit.name} />
          </div>
        </div>
      ))}
    </div>
  );
}
