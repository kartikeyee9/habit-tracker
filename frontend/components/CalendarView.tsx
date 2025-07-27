'use client';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import api from '../lib/api';

type Props = {
  habitId: string;
};

export default function CalendarView({ habitId }: Props) {
  const [dates, setDates] = useState<Date[]>([]);

  const fetchCompletions = async () => {
    try {
      const res = await api.get(`/habits/${habitId}/completions`);
      const completionDates = res.data.map((dateStr: string) => new Date(dateStr));
      setDates(completionDates);
    } catch (err) {
      console.error("Failed to load completions", err);
    }
  };

  useEffect(() => {
    fetchCompletions();
  }, [habitId]);

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">📅 Completion Calendar</h3>
      <Calendar
        tileClassName={({ date }) =>
          dates.some(d => d.toDateString() === date.toDateString()) ? 'bg-green-200 rounded-full' : undefined
        }
      />
    </div>
  );
}
