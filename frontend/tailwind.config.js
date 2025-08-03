/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'grid',
    'grid-cols-7',
    'aspect-square',
    'w-10',
    'h-10',
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
  important: true,
};
