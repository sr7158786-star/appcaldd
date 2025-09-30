import React, { useState } from 'react';
import { ArrowLeft, Plus, Minus, Edit3 } from 'lucide-react';
import { Screen, FoodItem } from '../types';

interface FoodDetailScreenProps {
  food: FoodItem;
  onNavigate: (screen: Screen) => void;
  onUpdateFood: (food: FoodItem) => void;
}

const FoodDetailScreen: React.FC<FoodDetailScreenProps> = ({ 
  food, 
  onNavigate, 
  onUpdateFood 
}) => {
  const [quantity, setQuantity] = useState(food.quantity);
  const [isEditing, setIsEditing] = useState(false);

  const adjustQuantity = (delta: number) => {
    const newQuantity = Math.max(0.25, quantity + delta);
    setQuantity(Math.round(newQuantity * 4) / 4); // Round to nearest 0.25
  };

  const handleDone = () => {
    const updatedFood: FoodItem = {
      ...food,
      quantity: quantity,
      timestamp: new Date()
    };
    onUpdateFood(updatedFood);
  };

  const handleFixResults = () => {
    setIsEditing(true);
  };

  // Calculate nutrition values based on current quantity
  const currentNutrition = {
    calories: Math.round(food.nutritionalInfo.calories * quantity),
    protein: Math.round(food.nutritionalInfo.protein * quantity),
    fat: Math.round(food.nutritionalInfo.fat * quantity),
    carbs: Math.round(food.nutritionalInfo.carbs * quantity)
  };

  const healthScore = food.healthScore || Math.floor(Math.random() * 3) + 7; // Default 7-10 range

  const defaultFoodImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='1.5'%3E%3Cpath d='M18 8h1a4 4 0 0 1 0 8h-1'/%3E%3Cpath d='M2 12h2'/%3E%3Cpath d='M6 8h2v4l-2 2'/%3E%3Cpath d='M8 12h1l2-2'/%3E%3Cpath d='M2 8h12a4 4 0 0 1 0 8H6'/%3E%3C/svg%3E";

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="relative">
        <button
          onClick={() => onNavigate('dashboard')}
          className="absolute top-4 left-4 z-10 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        
        {/* Food Image */}
        <div className="h-64 bg-gray-100 overflow-hidden">
          <img
            src={food.image || defaultFoodImage}
            alt={food.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = defaultFoodImage;
            }}
          />
        </div>

        {/* Food tags overlay */}
        <div className="absolute top-4 right-4 flex flex-wrap gap-2 max-w-48">
          <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Blueberries
          </div>
          <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Pancakes
          </div>
          <div className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            Syrup
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        {/* Food Name and Category */}
        <div className="mb-6">
          <div className="text-sm text-gray-500 uppercase mb-1">Breakfast</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{food.name}</h1>
          
          {/* Quantity Selector */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg text-gray-700">Quantity</span>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => adjustQuantity(-0.25)}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="text-xl font-semibold min-w-12 text-center">{quantity}</span>
              <button
                onClick={() => adjustQuantity(0.25)}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Nutrition Information */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">{currentNutrition.calories}</div>
            <div className="text-sm text-gray-500">Calories</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">{currentNutrition.protein}g</div>
            <div className="text-sm text-gray-500">Protein</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-700">{currentNutrition.protein}g</span>
            <span className="text-gray-500">Protein</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-gray-700">{currentNutrition.fat}g</span>
            <span className="text-gray-500">Fats</span>
          </div>
        </div>

        {/* Health Score */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-medium text-gray-700">🍃 Health score</span>
            <span className="text-xl font-bold text-gray-900">{healthScore}/10</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(healthScore / 10) * 100}%` }}
            ></div>
          </div>
          <div className="text-right text-sm text-gray-500 mt-1">Excellent</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-6 pt-0">
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handleFixResults}
            className="flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium transition-colors"
          >
            <Edit3 size={18} />
            <span>Fix Results</span>
          </button>
          <button
            onClick={handleDone}
            className="bg-gray-900 hover:bg-gray-800 text-white py-3 px-4 rounded-xl font-medium transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodDetailScreen;