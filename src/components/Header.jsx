import React, { useState, useEffect } from 'react';
import { Bell, ChevronDown, User } from 'lucide-react';

const Header = () => {
  const [open, setOpen] = useState(false);
  const [queuePosition, setQueuePosition] = useState(3);
  const [eta, setEta] = useState(18); // minutes

  useEffect(() => {
    const interval = setInterval(() => {
      // playful auto-refresh simulation for the live queue
      setQueuePosition((p) => (p > 0 ? p - 1 : 3));
      setEta((e) => (e > 5 ? e - 5 : 18));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 dark:bg-slate-900/60 border-b border-slate-200/60 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-teal-400 to-blue-600 shadow-inner" />
            <div>
              <div className="text-xl font-semibold tracking-tight text-slate-800 dark:text-white">Med-Trax</div>
              <div className="text-[11px] leading-3 text-slate-500">Your Health. Simplified.</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" aria-label="Notifications">
              <Bell className="h-5 w-5 text-slate-600 dark:text-slate-300" />
              <span className="absolute -top-0.5 -right-0.5 inline-flex h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
            </button>

            <div className="relative">
              <button onClick={() => setOpen((v) => !v)} className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-white/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:shadow-sm">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-teal-400 to-blue-600 grid place-content-center text-white">
                  <User className="h-4 w-4" />
                </div>
                <span className="text-sm text-slate-700 dark:text-slate-200">My Account</span>
                <ChevronDown className="h-4 w-4 text-slate-500" />
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg overflow-hidden">
                  <button className="w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200">View Profile</button>
                  <button className="w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200">Edit Profile</button>
                  <button className="w-full text-left px-4 py-2.5 text-sm hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600">Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Live queue tracker status bar */}
      <div className="w-full bg-gradient-to-r from-teal-50 to-blue-50 dark:from-slate-800 dark:to-slate-800/60 border-t border-slate-200/70 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center gap-3">
          <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-200">
            You’re currently <span className="font-semibold">{queuePosition}{queuePosition === 1 ? 'st' : queuePosition === 2 ? 'nd' : queuePosition === 3 ? 'rd' : 'th'}</span> in line · ETA <span className="font-semibold">{eta} mins</span>
          </div>
          <div className="flex-1 h-2 rounded-full bg-white/60 dark:bg-slate-700 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-teal-400 to-blue-600 transition-all duration-700" style={{ width: `${Math.max(5, (4 - queuePosition) * 25)}%` }} />
          </div>
          <div className="text-[10px] text-slate-500">Live Queue</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
