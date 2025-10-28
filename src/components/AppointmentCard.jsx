import React from 'react';
import { Clock, User } from 'lucide-react';

const AppointmentCard = ({ appointment }) => {
  return (
    <div className="flex items-center gap-4 p-4 hover:bg-slate-700/30 rounded-lg transition-all duration-200">
      <img
        src={appointment.avatar}
        alt={appointment.name}
        className="w-12 h-12 rounded-full object-cover border-2 border-slate-600"
      />
      <div className="flex-1">
        <h4 className="text-white font-semibold">{appointment.name}</h4>
        <p className="text-gray-400 text-sm">{appointment.date}</p>
      </div>
      <div className="text-right">
        <div className="flex items-center gap-2 text-white font-medium mb-1">
          <Clock className="w-4 h-4" />
          {appointment.time}
        </div>
        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
          appointment.type === 'Virtual' 
            ? 'bg-blue-500/20 text-blue-300' 
            : 'bg-green-500/20 text-green-300'
        }`}>
          {appointment.type === 'Virtual' ? '💻' : '👤'} {appointment.type}
        </span>
      </div>
    </div>
  );
};

export default AppointmentCard;