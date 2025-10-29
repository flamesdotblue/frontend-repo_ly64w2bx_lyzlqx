import React, { useState } from 'react';
import { Mic, Smile, Frown, Meh, Sleep, Activity } from 'lucide-react';

const moods = [
  { key: 'stressed', label: 'Stressed', icon: Activity, emoji: '😣', color: 'bg-rose-100 text-rose-700' },
  { key: 'bored', label: 'Bored', icon: Meh, emoji: '😐', color: 'bg-amber-100 text-amber-700' },
  { key: 'tired', label: 'Tired', icon: Sleep, emoji: '😴', color: 'bg-indigo-100 text-indigo-700' },
  { key: 'anxious', label: 'Anxious', icon: Frown, emoji: '😰', color: 'bg-sky-100 text-sky-700' },
  { key: 'okay', label: 'Okay', icon: Smile, emoji: '🙂', color: 'bg-emerald-100 text-emerald-700' },
];

const MoodInput = ({ onPick }) => {
  const [listening, setListening] = useState(false);

  const handleVoice = async () => {
    // Simple simulation of voice input
    setListening(true);
    setTimeout(() => {
      setListening(false);
      onPick('okay');
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-rose-50 flex flex-col">
      <div className="p-6">
        <h2 className="text-2xl font-semibold">How are you feeling right now?</h2>
        <p className="text-slate-600 mt-1">Pick a mood to tailor your micro calm.</p>
      </div>
      <div className="grid grid-cols-2 gap-4 px-6">
        {moods.map((m) => (
          <button key={m.key} onClick={() => onPick(m.key)} className={`rounded-2xl p-4 ${m.color} shadow-sm hover:shadow transition-all text-left`}> 
            <div className="text-3xl">{m.emoji}</div>
            <div className="mt-2 font-medium">{m.label}</div>
            <div className="text-xs opacity-70">Tap to continue</div>
          </button>
        ))}
      </div>

      <div className="mt-auto p-6">
        <button onClick={handleVoice} className={`w-full flex items-center justify-center gap-2 rounded-2xl py-3 bg-sky-500 text-white shadow ${listening ? 'animate-pulse' : ''}`}>
          <Mic className="h-5 w-5" />
          {listening ? 'Listening…' : 'Use voice to detect mood'}
        </button>
      </div>
    </div>
  );
};

export default MoodInput;
