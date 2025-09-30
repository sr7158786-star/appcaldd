import React from 'react';
import { FoodItem } from '../types';

interface FoodListProps {
  foods: FoodItem[];
  onSelectFood: (food: FoodItem) => void;
}

const FoodList: React.FC<FoodListProps> = ({ foods, onSelectFood }) => {
  if (foods.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500 mb-2">No meals logged today</div>
        <div className="text-sm text-gray-400">Tap "Scan Your Meal" to get started!</div>
      </div>
    );
  }

  const defaultFoodImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='1.5'%3E%3Cpath d='M18 8h1a4 4 0 0 1 0 8h-1'/%3E%3Cpath d='M2 12h2'/%3E%3Cpath d='M6 8h2v4l-2 2'/%3E%3Cpath d='M8 12h1l2-2'/%3E%3Cpath d='M2 8h12a4 4 0 0 1 0 8H6'/%3E%3C/svg%3E";

  return (
    <div className="space-y-3">
      {foods.map((food, index) => (
        <div
          key={`${food.id}-${index}`}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onSelectFood(food)}
        >
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
              <img
                src={food.image || defaultFoodImage}
                alt={food.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = defaultFoodImage;
                }}
              />
            </div>
            
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">{food.name}</h3>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center space-x-1">
                  <span className="text-gray-500">🔥</span>
                  <span className="text-gray-600">
                    {Math.round(food.nutritionalInfo.calories * food.quantity)}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-gray-500">⚖️</span>
                  <span className="text-gray-600">
                    {Math.round(food.nutritionalInfo.carbs * food.quantity)}g
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-gray-500">💪</span>
                  <span className="text-gray-600">
                    {Math.round(food.nutritionalInfo.protein * food.quantity)}g
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-gray-500">🧈</span>
                  <span className="text-gray-600">
                    {Math.round(food.nutritionalInfo.fat * food.quantity)}g
                  </span>
                </div>
              </div>

              {food.healthScore && (
                <div className="mt-2 text-xs text-gray-500">
                  Health score: {food.healthScore}/10
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodList;