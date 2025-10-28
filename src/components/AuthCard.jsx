import React from 'react';

const AuthCard = ({ title, subtitle, children }) => {
  return (
    <div className="w-full max-w-md bg-white/10 p-8 rounded-xl shadow-lg backdrop-blur-md">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-semibold text-center text-white">{title}</h1>
        <p className="mt-2 text-center text-gray-200">{subtitle}</p>
      </div>
      {children}
    </div>
  );
};

export default AuthCard;