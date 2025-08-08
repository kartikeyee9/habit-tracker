// /app/layout.tsx
import '../styles/globals.css';
import { Inter } from 'next/font/google';
import Header from '../components/Header';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Habit Tracker',
  description: 'Track your habits effortlessly.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900 antialiased`}>
        <Providers>
          <Header />
          <main className="max-w-5xl mx-auto px-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
