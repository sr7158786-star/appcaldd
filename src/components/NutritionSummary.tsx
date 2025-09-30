import React from 'react';
import { NutritionalInfo, DailyGoals } from '../types';

interface NutritionSummaryProps {
  current: NutritionalInfo;
  goals: DailyGoals;
}

const NutritionSummary: React.FC<NutritionSummaryProps> = ({ current, goals }) => {
  const calculatePercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  const CircularProgress = ({ 
    percentage, 
    size = 80, 
    strokeWidth = 8, 
    color = '#1f2937' 
  }: { 
    percentage: number; 
    size?: number; 
    strokeWidth?: number; 
    color?: string; 
  }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;

    return (
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>
      </div>
    );
  };

  const nutritionItems = [
    {
      label: 'Calories',
      current: Math.round(current.calories),
      goal: goals.calories,
      color: '#1f2937'
    },
    {
      label: 'Protein',
      current: Math.round(current.protein),
      goal: goals.protein,
      color: '#1f2937',
      unit: 'g'
    },
    {
      label: 'Carbs', 
      current: Math.round(current.carbs),
      goal: goals.carbs,
      color: '#1f2937',
      unit: 'g'
    },
    {
      label: 'Fat',
      current: Math.round(current.fat),
      goal: goals.fat,
      color: '#1f2937',
      unit: 'g'
    }
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {nutritionItems.map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="relative mb-2">
            <CircularProgress 
              percentage={calculatePercentage(item.current, item.goal)}
              color={item.color}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold text-gray-900">{item.current}</span>
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs font-medium text-gray-900">{item.label}</div>
            {item.unit && (
              <div className="text-xs text-gray-500">{item.unit}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NutritionSummary;