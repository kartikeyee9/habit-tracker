import HabitForm from '../components/HabitForm';
import HabitList from '../components/HabitList';

const DUMMY_USER_ID = 'cmdkvo40o0000ppn5iiggnmbr'; // replace with your test user ID

export default function Home() {
  return (
    <main className="p-6 max-w-xl mx-auto">
      
      <h1 className="text-4xl font-bold text-purple-600 bg-yellow-100 p-4 rounded-xl text-center shadow">
  🚀 Tailwind is Working!
</h1>

      <HabitForm userId={DUMMY_USER_ID} />
      <HabitList userId={DUMMY_USER_ID} />
    </main>
    
  );
}
