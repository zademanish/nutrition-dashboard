import React from 'react';

const GradientBackground = ({ children }) => {
  return (
    <div className="gradient-background min-h-screen flex items-center justify-center ">
      {children}
    </div>
  );
};

export default GradientBackground;
