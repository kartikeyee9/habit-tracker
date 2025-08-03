import '../styles/globals.css';

export const metadata = {
  title: 'Habit Tracker',
  description: 'Track your daily habits efficiently',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <div className="min-h-screen flex">
          {/* Sidebar */}
          <aside className="w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white p-6 space-y-6">
            <h1 className="text-xl font-semibold flex items-center">
              <span className="mr-2 text-2xl">🧠</span> Habit Tracker
            </h1>
            <nav className="space-y-3">
              <button className="w-full text-left px-4 py-2 rounded bg-gray-700 hover:bg-gray-600">
                Dashboard
              </button>
              <button className="w-full text-left px-4 py-2 rounded hover:bg-gray-700">
                History
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
