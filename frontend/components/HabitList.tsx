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
  const [search, setSearch] = useState('');

  const fetchHabits = async () => {
    try {
      const res = await api.get(`/habits/today/${userId}`);
      const habitsWithStreaks = await Promise.all(
        res.data.map(async (habit: any) => {
          const streakRes = await api.get(`/habits/${habit.id}/streak`);
          return { ...habit, streak: streakRes.data.streak };
        })
      );
      setHabits(habitsWithStreaks);
    } catch (err) {
      console.error("Error fetching habits:", err);
    }
  };

  const checkHabit = async (id: string) => {
    try {
      await api.post(`/habits/${id}/check`);
      fetchHabits();
    } catch (err) {
      alert("Already checked in today.");
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  // Filter habits based on search string (case-insensitive)
  const filteredHabits = habits.filter(habit =>
    habit.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Search habits..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      {filteredHabits.map((habit) => (
        <div
          key={habit.id}
          className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-4 rounded shadow"
        >
          <div className="flex items-center gap-4">
            <button
              className={`px-3 py-1 rounded text-white text-sm ${
                habit.checked ? 'bg-green-500' : 'bg-gray-400 hover:bg-gray-500'
              }`}
              onClick={() => checkHabit(habit.id)}
              disabled={habit.checked}
            >
              {habit.checked ? '✓ Done' : 'Mark Done'}
            </button>
            <span className="font-medium text-lg">{habit.name}</span>
          </div>

          <div className="flex flex-col items-start sm:items-end mt-2 sm:mt-0 sm:ml-4">
            {typeof habit.streak === 'number' && (
              <div className="text-sm text-gray-600">
                🏆 Streak: <span className="font-semibold">{habit.streak}</span> day{habit.streak !== 1 ? 's' : ''}
              </div>
            )}

            <HabitDrawer habitId={habit.id} habitName={habit.name} />
          </div>
        </div>
      ))}
    </div>
  );
}
