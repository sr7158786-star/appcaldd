import React from 'react';
import { useNavigate } from 'react-router-dom';

const FoodEntry = ({ food }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/food/${food.id}`, { state: { food } });
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-lg p-4 mb-3 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gray-900 rounded-lg overflow-hidden">
          {/* Placeholder for food image */}
          <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center">
            <span className="text-white text-xs">🥞</span>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800">{food.name}</h3>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
              <span>{food.time}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
              <span>C {food.calories}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-red-400 rounded-full"></span>
              <span>P {food.protein}g</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
              <span>F {food.fat}g</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodEntry;