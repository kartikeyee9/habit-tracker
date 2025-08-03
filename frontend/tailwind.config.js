/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    '!rounded-full',
    'bg-green-400',
    'text-white',
    'bg-purple-500',
    'hover:bg-gray-200',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
