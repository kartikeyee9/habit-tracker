'use client';
import { useState } from 'react';
import HabitForm from '../components/HabitForm';
import HabitList from '../components/HabitList';
import HabitCalendarSection from '../components/HabitCalendarSection';
import HabitChartSection from '../components/HabitChartSection';

const DUMMY_USER_ID = 'cmdkvo40o0000ppn5iiggnmbr';

export default function Home() {
  const [view, setView] = useState<'list' | 'calendar'>('list');

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
        🧠 Habit Tracker Dashboard
      </h1>

      {/* View toggle buttons */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setView('list')}
          className={`px-4 py-2 rounded-l ${
            view === 'list' ? 'bg-purple-600 text-white' : 'bg-gray-200'
          }`}
        >
          📋 List View
        </button>
        <button
          onClick={() => setView('calendar')}
          className={`px-4 py-2 rounded-r ${
            view === 'calendar' ? 'bg-purple-600 text-white' : 'bg-gray-200'
          }`}
        >
          📅 Calendar View
        </button>
      </div>

      {/* Common Form */}
      <HabitForm userId={DUMMY_USER_ID} />

      {/* Conditionally render list or calendar */}
      {view === 'list' ? (
        <>
          <HabitList userId={DUMMY_USER_ID} />
          <HabitChartSection userId={DUMMY_USER_ID} /> {/* ✅ fixed */}
        </>
      ) : (
        <HabitCalendarSection userId={DUMMY_USER_ID} />
      )}
    </main>
  );
}
