import React from 'react';

const MacroCircle = ({ value, target, label, color }) => {
  const percentage = Math.min((value / target) * 100, 100);
  const circumference = 2 * Math.PI * 30;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const colorClasses = {
    green: 'stroke-green-500',
    blue: 'stroke-blue-500',
    orange: 'stroke-orange-500',
    purple: 'stroke-purple-500'
  };

  return (
    <div className="text-center">
      <div className="relative w-16 h-16 mx-auto mb-2">
        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 68 68">
          {/* Background circle */}
          <circle
            cx="34"
            cy="34"
            r="30"
            stroke="#e5e7eb"
            strokeWidth="6"
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx="34"
            cy="34"
            r="30"
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={colorClasses[color]}
            style={{
              transition: 'stroke-dashoffset 0.5s ease-in-out',
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold">{value}</span>
        </div>
      </div>
      <p className="text-xs text-gray-600">{label}</p>
    </div>
  );
};

export default MacroCircle;