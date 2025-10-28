// ==================== src/pages/Dashboard/Dashboard.jsx ====================
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  TrendingUp,
  ChevronRight,
  UserPlus,
  Utensils,
  Radio,
  Share2
} from 'lucide-react';
import StatCard from '../../components/StatCard';
import AppointmentCard from '../../components/AppointmentCard';
import ShareModal from '../../components/ShareModal';

const Dashboard = () => {
  const { stats, todayAppointments, urgentAttention } = useSelector((state) => state.dashboard);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const statsConfig = [
    {
      icon: Users,
      title: 'Total Active Clients',
      value: stats.totalActiveClients,
      iconBg: 'bg-purple-500/20'
    },
    {
      icon: Calendar,
      title: "Today's Appointments",
      value: stats.todayAppointments,
      iconBg: 'bg-blue-500/20'
    },
    {
      icon: MessageSquare,
      title: 'Pending Messages',
      value: stats.pendingMessages,
      iconBg: 'bg-green-500/20'
    },
    {
      icon: TrendingUp,
      title: 'Client Progress Alerts',
      value: stats.clientProgressAlerts,
      iconBg: 'bg-orange-500/20'
    }
  ];

  return (
  <div>

    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsConfig.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Appointments - Takes 2 columns */}
        <div className="lg:col-span-2 glass-card p-6 fade-in">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Today's Appointments</h2>
            <button className="flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors">
              <span className="text-sm font-medium">View All</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {todayAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </div>
        </div>

        {/* Urgent Attention - Takes 1 column */}
        <div className="glass-card p-6 fade-in">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Urgent Attention</h2>
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </div>

          <div className="space-y-4">
            {urgentAttention.map((item) => (
              <div key={item.id} className="bg-slate-800/50 rounded-lg p-4 border border-red-500/20">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-white font-semibold">{item.name}</h4>
                    <p className="text-red-400 text-sm font-medium mt-1">{item.issue}</p>
                  </div>
                </div>
                <p className="text-gray-400 text-xs mb-3">Last meal: {item.lastMeal}</p>
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                  Send Message
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass-card p-6 fade-in">
        <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white px-6 py-4 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
            <UserPlus className="w-5 h-5" />
            Add Client
          </button>
          <button className="flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white px-6 py-4 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
            <Utensils className="w-5 h-5" />
            Create Meal Plan
          </button>
          <button 
            onClick={() => setIsShareModalOpen(true)}
            className="flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white px-6 py-4 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Radio className="w-5 h-5" />
            Broadcast Message
          </button>
        </div>
      </div>
    </div>

    {/* Share Modal */}
    <ShareModal 
      isOpen={isShareModalOpen} 
      onClose={() => setIsShareModalOpen(false)} 
    />

  </div>
  );
};

export default Dashboard;