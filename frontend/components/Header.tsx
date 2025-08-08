'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="w-full bg-white shadow-md p-4 mb-6 rounded-lg">
      <div className="max-w-5xl mx-auto flex items-center justify-between flex-wrap gap-4">
        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png" // Optional logo (place in /public folder)
            alt="Habit Tracker Logo"
            width={32}
            height={32}
          />
          <h1 className="text-2xl font-bold text-purple-700">Habit Tracker</h1>
        </div>

        {/* Auth Status */}
        {status === 'loading' ? (
          <p className="text-sm text-gray-500">Loading...</p>
        ) : session ? (
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-700">Welcome, <span className="font-medium">{session.user?.email}</span></p>
            <button
              onClick={() => signOut()}
              className="px-4 py-1.5 rounded bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn()}
            className="px-4 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
}
