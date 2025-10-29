import React from 'react';
import Spline from '@splinetool/react-spline';

const HeroCover = () => {
  return (
    <section className="relative w-full h-[320px] sm:h-[380px] lg:h-[440px] overflow-hidden rounded-b-3xl">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/2fSS9b44gtYBt4RI/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      {/* gradient overlay for readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-900/40 to-transparent" />

      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="text-white/95 max-w-2xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            Patient Dashboard
          </h1>
          <p className="mt-3 text-sm sm:text-base text-white/80">
            Seamless access to your health journey with appointments, prescriptions, insights, and more — all in one place.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <button className="px-4 py-2.5 rounded-lg bg-teal-500/90 hover:bg-teal-400 text-white text-sm shadow">
              Book Appointment
            </button>
            <button className="px-4 py-2.5 rounded-lg border border-white/30 hover:bg-white/10 text-white text-sm">
              Chat Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCover;
