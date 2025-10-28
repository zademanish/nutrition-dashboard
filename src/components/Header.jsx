import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Bell, Settings, LogOut } from 'lucide-react';
import { performLogout } from '../redux/slices/authSlices';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { stats } = useSelector((state) => state.dashboard);

  const handleLogout = () => {
    dispatch(performLogout());
    navigate('/login');
  };

  return (
    <header className="bg-slate-900/30 backdrop-blur-xl border-b border-slate-700/50 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Welcome Message */}
        <div>
          <h2 className="text-2xl font-bold text-white">
            Good Morning! Dr. Jahangir
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Today: March 15, 2025
          </p>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Message Icon */}
          <button className="relative p-2 hover:bg-slate-800/50 rounded-lg transition-colors">
            <MessageSquare className="w-5 h-5 text-gray-300" />
            {stats.pendingMessages > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full text-xs text-white flex items-center justify-center font-semibold">
                {stats.pendingMessages}
              </span>
            )}
          </button>

          {/* Bell Icon */}
          <button className="relative p-2 hover:bg-slate-800/50 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-300" />
            {stats.clientProgressAlerts > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-semibold">
                {stats.clientProgressAlerts}
              </span>
            )}
          </button>

          {/* Settings Icon */}
          <button className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors">
            <Settings className="w-5 h-5 text-gray-300" />
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-4 border-l border-slate-700">
            <img
              src="https://i.pravatar.cc/150?img=8"
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-slate-600"
            />
            <div className="hidden md:block">
              <p className="text-white font-semibold text-sm">{user?.name || 'Dr. Jahangir'}</p>
              <p className="text-gray-400 text-xs">Wellthier Pro</p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-red-500/20 rounded-lg transition-colors group"
            title="Logout"
          >
            <LogOut className="w-5 h-5 text-gray-300 group-hover:text-red-400" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;