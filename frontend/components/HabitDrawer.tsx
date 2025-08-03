'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function HabitDrawer() {
  const pathname = usePathname();

  return (
    <aside className="w-60 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white fixed top-0 left-0 shadow-md z-50">
      <div className="p-6 text-2xl font-bold flex items-center gap-2 border-b border-gray-700">
        <span className="text-pink-400 text-3xl">🧠</span>
        <span>Habit Tracker</span>
      </div>
      <nav className="mt-6 flex flex-col gap-1 px-4">
        <Link
          href="/"
          className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition ${
            pathname === '/' ? 'bg-gray-700 text-white' : 'hover:bg-gray-700'
          }`}
        >
          📊 Dashboard
        </Link>
        <Link
          href="/history"
          className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition ${
            pathname === '/history' ? 'bg-gray-700 text-white' : 'hover:bg-gray-700'
          }`}
        >
          🕒 History
        </Link>
      </nav>
    </aside>
  );
}
