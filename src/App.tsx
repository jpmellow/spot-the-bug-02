import React from 'react';
import { AdminPanel } from './components/AdminPanel';
import { GameScene } from './components/GameScene';
import { useGameStore } from './store/gameStore';
import { Settings, BookOpen } from 'lucide-react';
import { Logo } from './components/Logo';
import { IntroModal } from './components/intro/IntroModal';

export default function App() {
  const { isAdmin, toggleAdmin, bugs, showIntro, hideIntro } = useGameStore();

  const handleShowInstructions = () => {
    hideIntro();
    setTimeout(() => useGameStore.setState({ showIntro: true }), 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <IntroModal />
      
      <header className="bg-gradient-to-r from-green-600 to-emerald-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Logo className="text-white" />
          <div className="flex items-center gap-2">
            <button
              onClick={handleShowInstructions}
              className="flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 rounded-full transition-colors"
              title="Show Instructions"
            >
              <BookOpen size={20} />
              <span className="hidden sm:inline">Instructions</span>
            </button>
            <button
              onClick={toggleAdmin}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              title="Toggle Admin Mode"
            >
              <Settings className={isAdmin ? 'text-yellow-300' : 'text-white'} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {isAdmin ? <AdminPanel /> : <GameScene />}
        
        {isAdmin && bugs.length > 0 && (
          <div className="mt-8 p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Defined Bugs</h2>
            <ul className="space-y-2">
              {bugs.map((bug) => (
                <li key={bug.id} className="p-3 bg-gray-50 rounded">
                  <span className="font-medium">{bug.name}</span>
                  <p className="text-sm text-gray-600 mt-1">{bug.prompt}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}