'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../lib/api';

export default function HabitDrawer({ habitId, habitName }: { habitId: string; habitName: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [completionDates, setCompletionDates] = useState<Set<string>>(new Set());

  const fetchHistory = async () => {
    const res = await api.get(`/habits/${habitId}/history`);
    const formattedDates = res.data.dates.map((d: string) => new Date(d).toISOString().slice(0, 10));
    setCompletionDates(new Set(formattedDates));
  };

  useEffect(() => {
    if (isOpen) fetchHistory();
  }, [isOpen]);

  // Generate the past 30 days
  const getLast30Days = () => {
    const days = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      days.push(d);
    }
    return days;
  };

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
              className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 p-4 overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">{habitName} History</h2>
                <button onClick={() => setIsOpen(false)}>✕</button>
              </div>

              {completionDates.size === 0 ? (
                <p className="text-gray-500">No completions yet.</p>
              ) : (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Last 30 Days</p>
                  <div className="grid grid-cols-7 gap-2">
                    {getLast30Days().map((day) => {
                      const dateStr = day.toISOString().slice(0, 10);
                      const isCompleted = completionDates.has(dateStr);

                      return (
                        <div
                          key={dateStr}
                          title={day.toDateString()}
                          className={`w-4 h-4 rounded-full ${
                            isCompleted ? 'bg-green-500' : 'bg-gray-300'
                          }`}
                        ></div>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
