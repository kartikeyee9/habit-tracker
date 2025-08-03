'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../lib/api';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export default function HabitDrawer({
  habitId,
  habitName,
}: {
  habitId: string;
  habitName: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [dates, setDates] = useState<Date[]>([]);

  const fetchHistory = async () => {
    const res = await api.get(`/habits/${habitId}/history`);
    setDates(res.data.dates.map((d: string) => new Date(d)));
  };

  useEffect(() => {
    if (isOpen) fetchHistory();
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-blue-500 underline text-sm mt-1"
      >
        View History
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-30 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-0 right-0 w-[22rem] sm:w-96 h-full bg-white shadow-lg z-50 p-5 overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">{habitName} History</h2>
                <button onClick={() => setIsOpen(false)}>✕</button>
              </div>

              {dates.length === 0 ? (
                <p className="text-gray-500">No completions yet.</p>
              ) : (
                <div className="mt-4">
                  <DayPicker
                    mode="month"
                    showOutsideDays
                    selected={dates}
                    modifiers={{
                      completed: (day) =>
                        dates.some(
                          (d) => d.toDateString() === day.toDateString()
                        ),
                    }}
                    modifiersClassNames={{
                      completed: 'bg-green-500 text-white rounded-full',
                      today: 'border border-blue-500',
                    }}
                  />
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
