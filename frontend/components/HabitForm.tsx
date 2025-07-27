'use client';
import { useState } from "react";
import api from "../lib/api";

export default function HabitForm({ userId }: { userId: string }) {
  const [name, setName] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!name.trim()) return;

    await api.post('/habits', { name, userId });
    setName('');
    window.location.reload(); // temp refresh
  };

  return (
    <form onSubmit={handleSubmit} className="space-x-2 my-4">
      <input
        className="border p-2 rounded"
        placeholder="New habit..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
    </form>
  );
}

