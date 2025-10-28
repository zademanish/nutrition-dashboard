import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Calendar,
  Utensils,
  Dumbbell,
  BarChart3,
  CreditCard,
  Menu,
  X
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  // Define sidebar menu items
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Users, label: 'Clients', path: '/clients', badge: '32' },
    { icon: Calendar, label: 'Appointment', path: '/appointments', badge: '7' },
    { icon: Utensils, label: 'Meal Plans', path: '/meals' },
    { icon: Dumbbell, label: 'Workouts', path: '/workouts' },
  ];

  const businessItems = [
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: CreditCard, label: 'Billing', path: '/billing' },
  ];

  // Check if route is active (handles nested routes)
  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-slate-900/80 p-2 rounded-md border border-slate-700 text-gray-200"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 h-full z-40 transition-transform duration-300 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } w-72 h-screen bg-slate-900/50 backdrop-blur-xl border-r border-slate-700/50 flex flex-col`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-slate-700/50">
          <h1 className="text-2xl font-bold text-white">Wellthier</h1>
          <p className="text-xs text-gray-400 mt-1">Nutrition Practice</p>
        </div>

        {/* Menu Scroll Area */}
        <div className="flex-1 overflow-y-auto relative py-6">
          <div className="px-4 mb-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Main Menu
            </h3>
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:scale-[1.02] ${
                    isActive(item.path)
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                      : 'text-gray-300 hover:bg-slate-800/50 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="flex-1 text-left font-medium">{item.label}</span>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-slate-700 text-gray-200">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Business Section */}
          <div className="px-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Business
            </h3>
            <nav className="space-y-1">
              {businessItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:scale-[1.02] ${
                    isActive(item.path)
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                      : 'text-gray-300 hover:bg-slate-800/50 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="flex-1 text-left font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Bottom Fade Effect */}
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none" />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
