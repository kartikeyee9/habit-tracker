'use client';
import { useState } from 'react';
import HabitList from './HabitList';
import HabitCalendarSection from './HabitCalendarSection';

export default function Dashboard({ userId }: { userId: string }) {
  const [view, setView] = useState<'list' | 'calendar'>('list');

  return (
    <div className="p-4">
      {/* Toggle Buttons */}
      <div className="flex justify-center mb-6">
        <button
          className={`px-4 py-2 rounded-l border ${
            view === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-100'
          }`}
          onClick={() => setView('list')}
        >
          Habits
        </button>
        <button
          className={`px-4 py-2 rounded-r border ${
            view === 'calendar' ? 'bg-blue-600 text-white' : 'bg-gray-100'
          }`}
          onClick={() => setView('calendar')}
        >
          Calendar
        </button>
      </div>

      {/* View */}
      {view === 'list' ? <HabitList userId={userId} /> : <HabitCalendarSection userId={userId} />}
    </div>
  );
}
