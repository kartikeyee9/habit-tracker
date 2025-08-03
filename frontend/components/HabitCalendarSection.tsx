'use client';
import { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import api from '../lib/api';

type Habit = {
  id: string;
  name: string;
};

type CompletionMap = {
  [habitId: string]: Date[];
};

export default function HabitCalendarSection({ userId }: { userId: string }) {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [markedDates, setMarkedDates] = useState<CompletionMap>({});

  useEffect(() => {
    const fetchHabitsAndCompletions = async () => {
      try {
        const res = await api.get(`/habits/${userId}`);
        setHabits(res.data);

        const map: CompletionMap = {};
        await Promise.all(
          res.data.map(async (habit: Habit) => {
            const historyRes = await api.get(`/habits/${habit.id}/history`);
            const dates = historyRes.data.dates.map((d: string) => new Date(d));
            map[habit.id] = dates;
          })
        );
        setMarkedDates(map);
      } catch (err) {
        console.error('Error fetching calendar data:', err);
      }
    };

    fetchHabitsAndCompletions();
  }, [userId]);

  return (
    <div className="mt-10 bg-white rounded-xl shadow p-4">
      <h2 className="text-xl font-bold text-purple-700 flex items-center mb-4">
        <span className="mr-2">📅</span> Habit Calendar Overview
      </h2>

      <div className="flex overflow-x-auto gap-4 pb-2">
        {habits.map((habit) => (
          <div
            key={habit.id}
            className="min-w-[320px] bg-white rounded-lg border border-gray-200 p-3 shadow-sm"
          >
            <h3 className="text-center text-purple-600 font-semibold mb-2">{habit.name}</h3>

            <DayPicker
              showOutsideDays
              fixedWeeks
              mode="multiple"
              selected={markedDates[habit.id]}
              modifiers={{ completed: markedDates[habit.id] || [] }}
              modifiersClassNames={{ completed: 'green-dot' }}
              className="text-sm"
            />
          </div>
        ))}
      </div>

      {/* Scoped calendar fixes */}
      <style>{`
        .rdp {
          width: 100%;
        }

        .rdp-month {
          width: 100%;
        }

        .rdp-table {
          width: 100%;
          table-layout: fixed;
        }

        .rdp-head {
          text-align: center;
        }

        .rdp-head_row {
          display: table-row;
        }

        .rdp-head_cell {
          display: table-cell;
          font-weight: 500;
          padding: 6px 0;
        }

        .rdp-row {
          display: table-row;
        }

        .rdp-cell {
          display: table-cell;
          vertical-align: middle;
          height: 40px;
          text-align: center;
          position: relative;
        }

        .rdp-day {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 9999px;
          position: relative;
        }

        .green-dot::after {
          content: '';
          position: absolute;
          bottom: 4px;
          right: 4px;
          width: 6px;
          height: 6px;
          background-color: #22c55e;
          border-radius: 9999px;
        }
      `}</style>
    </div>
  );
}
