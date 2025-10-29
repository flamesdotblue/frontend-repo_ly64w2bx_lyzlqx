import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Sparkles, Zap, Leaf, Heart, Music2, Palette, Quote, HelpCircle } from 'lucide-react';

const activities = ['breath', 'doodle', 'sound', 'gratitude', 'trivia'];

const Breathing = () => {
  return (
    <div className="rounded-3xl p-5 bg-emerald-100 shadow-inner text-center">
      <div className="text-sm text-slate-600">Breathe with the circle</div>
      <div className="mt-4 h-40 grid place-content-center">
        <div className="h-28 w-28 rounded-full bg-emerald-300/60 animate-[pulse_4s_ease-in-out_infinite] shadow-md" />
      </div>
      <div className="text-xs text-slate-500">Inhale 4s · Hold 2s · Exhale 4s</div>
    </div>
  );
};

const DoodlePad = () => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let rect = canvas.getBoundingClientRect();
    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = rect.width * ratio;
      canvas.height = rect.height * ratio;
      ctx.scale(ratio, ratio);
      ctx.lineCap = 'round';
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#7c3aed55';
    };
    resize();
    const onResize = () => { rect = canvas.getBoundingClientRect(); resize(); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    return { x, y };
  };

  const start = (e) => {
    setDrawing(true);
    const ctx = canvasRef.current.getContext('2d');
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };
  const move = (e) => {
    if (!drawing) return;
    const ctx = canvasRef.current.getContext('2d');
    const { x, y } = getPos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };
  const end = () => setDrawing(false);

  return (
    <div className="rounded-3xl p-4 bg-violet-100 shadow-inner">
      <div className="text-sm text-slate-600 mb-2">Draw how you feel</div>
      <div
        className="relative rounded-2xl overflow-hidden border border-purple-200 bg-white"
        style={{ height: 180 }}
        onMouseDown={start}
        onMouseMove={move}
        onMouseUp={end}
        onMouseLeave={end}
        onTouchStart={start}
        onTouchMove={move}
        onTouchEnd={end}
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      </div>
    </div>
  );
};

const Soundscape = () => {
  const [playing, setPlaying] = useState(false);
  const audioCtx = useRef(null);
  const osc = useRef(null);
  const gain = useRef(null);

  const startTone = () => {
    if (!audioCtx.current) audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
    const ctx = audioCtx.current;
    osc.current = ctx.createOscillator();
    gain.current = ctx.createGain();
    osc.current.type = 'sine';
    osc.current.frequency.value = 432; // calming tone
    gain.current.gain.value = 0.0001;
    osc.current.connect(gain.current);
    gain.current.connect(ctx.destination);
    osc.current.start();
    setPlaying(true);
    // ramp in
    gain.current.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.6);
    // auto stop after 15s
    setTimeout(() => stopTone(), 15000);
  };

  const stopTone = () => {
    if (!audioCtx.current || !gain.current || !osc.current) return setPlaying(false);
    const ctx = audioCtx.current;
    gain.current.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4);
    setTimeout(() => {
      try { osc.current.stop(); } catch {}
      setPlaying(false);
    }, 420);
  };

  return (
    <div className="rounded-3xl p-5 bg-rose-100 shadow-inner text-center">
      <div className="text-sm text-slate-600">15s ambient tone</div>
      <button onClick={playing ? stopTone : startTone} className={`mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-white ${playing ? 'bg-rose-400' : 'bg-indigo-400'} shadow`}>
        <Music2 className="h-4 w-4" /> {playing ? 'Stop' : 'Play'}
      </button>
    </div>
  );
};

const Gratitude = () => {
  const [text, setText] = useState('');
  const [saved, setSaved] = useState(false);
  return (
    <div className="rounded-3xl p-5 bg-stone-100 shadow-inner">
      <div className="text-sm text-slate-600">Name one thing you’re thankful for</div>
      <input value={text} onChange={(e) => { setText(e.target.value); setSaved(false); }} placeholder="e.g., a warm cup of tea" className="mt-3 w-full rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-300 bg-white" />
      <button onClick={() => setSaved(true)} className="mt-3 px-4 py-2 rounded-xl bg-emerald-400 text-white shadow">Save</button>
      {saved && <div className="mt-2 text-emerald-600 text-sm">Saved to your calm garden 🌱</div>}
    </div>
  );
};

const Trivia = () => {
  const [answered, setAnswered] = useState(false);
  return (
    <div className="rounded-3xl p-5 bg-sky-100 shadow-inner">
      <div className="text-sm text-slate-700">Quick trivia</div>
      <div className="mt-2 font-medium">Which color is often associated with calmness?</div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {['Red', 'Blue', 'Black', 'Yellow'].map((o) => (
          <button key={o} onClick={() => setAnswered(true)} className={`px-3 py-2 rounded-xl text-sm ${answered ? (o === 'Blue' ? 'bg-emerald-400 text-white' : 'bg-white text-slate-600') : 'bg-white hover:bg-slate-50'} border border-slate-200`}>{o}</button>
        ))}
      </div>
      {answered && <div className="mt-2 text-emerald-700 text-sm">Nice! Blue is widely perceived as calming.</div>}
    </div>
  );
};

const ActivityPanel = ({ type }) => {
  switch (type) {
    case 'breath': return <Breathing />;
    case 'doodle': return <DoodlePad />;
    case 'sound': return <Soundscape />;
    case 'gratitude': return <Gratitude />;
    case 'trivia': return <Trivia />;
    default: return (
      <div className="rounded-3xl p-5 bg-white border border-slate-200">
        <div className="text-sm text-slate-600">Pick an activity to begin</div>
      </div>
    );
  }
};

const HomeWheel = ({ mood = 'okay' }) => {
  const [current, setCurrent] = useState('breath');
  const [streak, setStreak] = useState(3);

  const icon = useMemo(() => {
    switch (mood) {
      case 'stressed': return <Heart className="h-5 w-5" />;
      case 'bored': return <Palette className="h-5 w-5" />;
      case 'tired': return <Leaf className="h-5 w-5" />;
      case 'anxious': return <HelpCircle className="h-5 w-5" />;
      default: return <Sparkles className="h-5 w-5" />;
    }
  }, [mood]);

  const randomize = () => {
    const idx = Math.floor(Math.random() * activities.length);
    setCurrent(activities[idx]);
    setStreak((s) => Math.min(99, s + 1));
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-emerald-50 to-violet-50 pb-24">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-slate-600 text-sm">Current mood</div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 shadow-sm border border-slate-200 mt-1">
              {icon}
              <span className="capitalize text-sm">{mood}</span>
            </div>
          </div>
          <div className="rounded-2xl bg-white px-3 py-2 border border-slate-200 text-sm shadow-sm">Calm streak: <span className="font-semibold">{streak}</span> 🌱</div>
        </div>

        <div className="mt-8 flex flex-col items-center">
          <div className="relative h-56 w-56">
            <div className="absolute inset-0 rounded-full bg-white border border-slate-200 shadow" />
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-emerald-100 to-sky-100" />
            <button onClick={randomize} className="absolute inset-10 rounded-full bg-white shadow flex flex-col items-center justify-center active:scale-95 transition">
              <Zap className="h-6 w-6 text-emerald-500" />
              <div className="mt-1 text-slate-700 text-sm">Instant Calm</div>
              <div className="text-[11px] text-slate-500">10–60 sec</div>
            </button>
          </div>
          <div className="mt-4 text-slate-500 text-sm">Tap the wheel to get a random micro-activity</div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <button onClick={() => setCurrent('breath')} className={`rounded-2xl px-3 py-2 text-sm border ${current==='breath'?'bg-emerald-100 border-emerald-200':'bg-white border-slate-200'} shadow-sm`}>Breathing</button>
          <button onClick={() => setCurrent('doodle')} className={`rounded-2xl px-3 py-2 text-sm border ${current==='doodle'?'bg-purple-100 border-purple-200':'bg-white border-slate-200'} shadow-sm`}>Doodle</button>
          <button onClick={() => setCurrent('sound')} className={`rounded-2xl px-3 py-2 text-sm border ${current==='sound'?'bg-indigo-100 border-indigo-200':'bg-white border-slate-200'} shadow-sm`}>Soundscape</button>
          <button onClick={() => setCurrent('gratitude')} className={`rounded-2xl px-3 py-2 text-sm border ${current==='gratitude'?'bg-emerald-100 border-emerald-200':'bg-white border-slate-200'} shadow-sm`}>Gratitude</button>
          <button onClick={() => setCurrent('trivia')} className={`rounded-2xl px-3 py-2 text-sm border ${current==='trivia'?'bg-sky-100 border-sky-200':'bg-white border-slate-200'} shadow-sm col-span-2`}>Trivia</button>
        </div>

        <div className="mt-6">
          <ActivityPanel type={current} />
        </div>

        <div className="mt-6 rounded-3xl p-4 bg-white border border-slate-200">
          <div className="text-sm text-slate-600">Calm Garden</div>
          <div className="mt-2 flex items-end gap-2 h-16">
            {[0,1,2,3,4].map((i) => (
              <div key={i} className={`w-6 rounded-t-xl bg-emerald-200 ${i < streak % 5 ? 'h-16' : 'h-8'}`} />
            ))}
          </div>
          <div className="mt-2 text-xs text-slate-500">Each activity grows your garden.</div>
        </div>
      </div>
    </div>
  );
};

export default HomeWheel;
