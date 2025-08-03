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
    <main className="p-6">
      <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
        🧠 Habit Tracker Dashboard
      </h1>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => setView('list')}
          className={`px-4 py-2 rounded-l ${
            view === 'list' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          📋 List View
        </button>
        <button
          onClick={() => setView('calendar')}
          className={`px-4 py-2 rounded-r ${
            view === 'calendar' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          📅 Calendar View
        </button>
      </div>

      <HabitForm userId={DUMMY_USER_ID} />
      {view === 'list' && <HabitChartSection userId={DUMMY_USER_ID} className="mb-6" />}

      {view === 'list' ? (
        <>
          <h2 className="text-xl font-semibold text-center text-gray-800 mb-2">
            📋 Your Habits
          </h2>
          <HabitList userId={DUMMY_USER_ID} />
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold text-center text-gray-800 mb-2">
            📅 Calendar Overview
          </h2>
          <HabitCalendarSection userId={DUMMY_USER_ID} />
        </>
      )}
    </main>
  );
}
