import React from 'react';
import { Home, Calendar, Pill, MessageCircle, BarChart3, BookOpen, HandHeart, ShoppingCart, Settings, Stethoscope } from 'lucide-react';

const NavItem = ({ icon: Icon, label, active }) => (
  <button className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${active ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'}`}>
    <Icon className="h-4 w-4" />
    <span>{label}</span>
  </button>
);

const Sidebar = () => {
  return (
    <aside className="hidden lg:flex lg:flex-col w-64 shrink-0 h-[calc(100vh-0rem)] sticky top-0 pt-20 pb-6 px-4 border-r border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 backdrop-blur">
      <div className="space-y-1">
        <NavItem icon={Home} label="Dashboard" active />
        <NavItem icon={Calendar} label="Appointments" />
        <NavItem icon={Pill} label="Prescriptions" />
        <NavItem icon={MessageCircle} label="Chatbot" />
        <NavItem icon={BarChart3} label="Health Insights" />
        <NavItem icon={BookOpen} label="Blogs & Community" />
        <NavItem icon={HandHeart} label="Donation Center" />
        <NavItem icon={ShoppingCart} label="Pharmacy" />
        <NavItem icon={Settings} label="Settings" />
      </div>

      <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-teal-50 to-blue-50 dark:from-slate-800 dark:to-slate-800/60 border border-slate-200/60 dark:border-slate-800">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-teal-600 text-white"><Stethoscope className="h-4 w-4" /></div>
          <div className="text-sm text-slate-700 dark:text-slate-200">
            <div className="font-medium">Need care now?</div>
            <div className="text-xs text-slate-500">Book an instant online consultation.</div>
          </div>
        </div>
        <button className="mt-3 w-full py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-sm">Book Appointment</button>
      </div>
    </aside>
  );
};

export default Sidebar;
