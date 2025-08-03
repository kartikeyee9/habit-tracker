'use client';
import { useState } from 'react';
import api from '../lib/api';

export default function HabitForm({ userId }: { userId: string }) {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setIsLoading(true);

    try {
      await api.post('/habits', { name: name.trim(), userId });
      setName('');
      window.location.reload(); // For now, refresh to re-fetch habits
    } catch (err) {
      console.error('Failed to create habit:', err);
      alert('Error creating habit');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-3 mb-6">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Add new habit..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
      >
        Add
      </button>
    </form>
  );
}
