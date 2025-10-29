import React, { useEffect, useState } from 'react';
import Splash from './components/Splash';
import MoodInput from './components/MoodInput';
import HomeWheel from './components/HomeWheel';
import ExploreGrid from './components/ExploreGrid';
import { Home, Compass, User } from 'lucide-react';

// Pastel utility classes
const pastel = {
  mint: 'bg-emerald-50',
  blush: 'bg-rose-50',
  lavender: 'bg-violet-50',
};

const App = () => {
  const [screen, setScreen] = useState('splash'); // splash | mood | home | explore | profile
  const [mood, setMood] = useState('okay');

  useEffect(() => {
    // auto-move from splash if user waits
    if (screen === 'splash') {
      const t = setTimeout(() => setScreen('mood'), 1800);
      return () => clearTimeout(t);
    }
  }, [screen]);

  const renderScreen = () => {
    if (screen === 'splash') return <Splash onStart={() => setScreen('mood')} />;
    if (screen === 'mood') return <MoodInput onPick={(m) => { setMood(m); setScreen('home'); }} />;
    if (screen === 'explore') return <ExploreGrid />;
    // profile is lightweight in this MVP and integrated into home via Calm Garden
    return <HomeWheel mood={mood} />;
  };

  const showNav = screen !== 'splash' && screen !== 'mood';

  return (
    <div className="font-sans text-slate-800">
      {renderScreen()}

      {showNav && (
        <nav className="fixed bottom-0 left-0 right-0 mx-auto max-w-md rounded-t-3xl border-t border-slate-200 bg-white/90 backdrop-blur shadow-2xl">
          <div className="grid grid-cols-3 gap-1 p-2">
            <button onClick={() => setScreen('home')} className={`flex flex-col items-center gap-1 py-2 rounded-2xl ${screen==='home'? 'text-emerald-600 '+pastel.mint : 'text-slate-500 hover:bg-slate-50'}`}>
              <Home className="h-5 w-5" />
              <span className="text-[11px]">Home</span>
            </button>
            <button onClick={() => setScreen('explore')} className={`flex flex-col items-center gap-1 py-2 rounded-2xl ${screen==='explore'? 'text-rose-600 '+pastel.blush : 'text-slate-500 hover:bg-slate-50'}`}>
              <Compass className="h-5 w-5" />
              <span className="text-[11px]">Explore</span>
            </button>
            <button onClick={() => setScreen('home')} className={`flex flex-col items-center gap-1 py-2 rounded-2xl ${screen==='profile'? 'text-violet-600 '+pastel.lavender : 'text-slate-500 hover:bg-slate-50'}`}>
              <User className="h-5 w-5" />
              <span className="text-[11px]">Profile</span>
            </button>
          </div>
        </nav>
      )}
    </div>
  );
};

export default App;
