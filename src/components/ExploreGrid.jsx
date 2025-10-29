import React from 'react';

const Card = ({ title, desc, colors }) => (
  <div className={`rounded-3xl p-4 ${colors} shadow border border-white/40`}> 
    <div className="text-slate-800 font-medium">{title}</div>
    <div className="text-sm text-slate-600 mt-1">{desc}</div>
  </div>
);

const ExploreGrid = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-emerald-50 p-6 pb-24">
      <h2 className="text-2xl font-semibold">Explore</h2>
      <p className="text-slate-600 mt-1">Pick a pack for your current vibe.</p>

      <div className="mt-5 grid grid-cols-2 gap-4">
        <Card title="Focus Boosters" desc="Quick focus resets" colors="bg-gradient-to-br from-emerald-100 to-emerald-200" />
        <Card title="Creative Breaks" desc="Spark playful energy" colors="bg-gradient-to-br from-violet-100 to-violet-200" />
        <Card title="Sleep Moments" desc="Wind down gently" colors="bg-gradient-to-br from-indigo-100 to-sky-100" />
        <Card title="Affirmations" desc="Kind words for you" colors="bg-gradient-to-br from-rose-100 to-rose-200" />
      </div>
    </div>
  );
};

export default ExploreGrid;
