// app/layout.tsx
import '../styles/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Habit Tracker',
  description: 'Track your daily habits',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="w-full max-w-4xl">{children}</div>
        </div>
      </body>
    </html>
  );
}
