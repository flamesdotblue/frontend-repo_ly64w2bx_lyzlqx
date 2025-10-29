import React from 'react';

const Splash = ({ onStart }) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-between bg-gradient-to-b from-emerald-100 to-violet-100 text-slate-800" style={{
      backgroundImage: 'radial-gradient(1200px 600px at 100% -20%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 70%), radial-gradient(800px 400px at -10% 120%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 70%)'
    }}>
      <div className="pt-16" />
      <div className="flex flex-col items-center px-6 text-center">
        <div className="relative h-44 w-44 mb-6">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-200 to-sky-200 shadow-inner" />
          <div className="absolute inset-3 rounded-full bg-white/70 backdrop-blur shadow-md" />
          <div className="absolute inset-0 animate-pulse">
            <div className="absolute left-1/2 top-3 -translate-x-1/2 h-6 w-6 rounded-full bg-rose-200/70" />
            <div className="absolute right-6 bottom-6 h-4 w-4 rounded-full bg-violet-200/70" />
            <div className="absolute left-6 bottom-8 h-5 w-5 rounded-full bg-teal-200/70" />
          </div>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">MICA — Micro Calm</h1>
        <p className="mt-2 max-w-xs text-slate-600">Moments that reset you. Tiny, playful wellness breaks for anytime calm.</p>
        <button onClick={onStart} className="mt-6 px-6 py-3 rounded-2xl bg-emerald-400 text-white shadow hover:shadow-md active:scale-[0.99] transition-all">
          Find your calm
        </button>
      </div>
      <div className="pb-10 text-xs text-slate-500">Soft pastels · Gentle motions · Friendly vibes</div>
    </div>
  );
};

export default Splash;
