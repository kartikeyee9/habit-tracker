'use client';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import HabitForm from '../components/HabitForm';
import HabitList from '../components/HabitList';
import HabitCalendarSection from '../components/HabitCalendarSection';
import HabitChartSection from '../components/HabitChartSection';

export default function Home() {
  const { data: session, status } = useSession();
  const [view, setView] = useState<'list' | 'calendar'>('list');

  if (status === 'loading') {
    return <p className="text-center text-sm text-gray-500 mt-8">Loading...</p>;
  }

  if (!session) {
    return (
      <div className="text-center mt-16">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Please log in to access your dashboard
        </h2>
      </div>
    );
  }

  const userId = session.user?.id || session.user?.email || 'anonymous';

  return (
    <div className="py-6">
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

      <HabitForm userId={userId} />
      <HabitChartSection userId={userId} />

      {view === 'list' ? (
        <HabitList userId={userId} />
      ) : (
        <HabitCalendarSection userId={userId} />
      )}
    </div>
  );
}
