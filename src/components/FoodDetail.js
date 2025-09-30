import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, Edit3 } from 'lucide-react';
import { saveFoodEntry } from '../services/storage';

const FoodDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { food, isNew } = location.state || {};
  const [quantity, setQuantity] = useState(1);

  if (!food) {
    navigate('/');
    return null;
  }

  const adjustQuantity = (change) => {
    setQuantity(Math.max(0.1, quantity + change));
  };

  const handleDone = () => {
    if (isNew) {
      // Save the new food entry
      const currentTime = new Date().toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
      
      const foodEntry = {
        ...food,
        quantity: quantity,
        time: currentTime,
        calories: food.calories * quantity,
        protein: food.protein * quantity,
        carbs: food.carbs * quantity,
        fat: food.fat * quantity
      };
      
      saveFoodEntry(foodEntry);
    }
    
    navigate('/');
  };

  const getHealthScoreColor = (score) => {
    if (score >= 8) return 'bg-green-500';
    if (score >= 6) return 'bg-yellow-500';
    if (score >= 4) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getHealthScoreText = (score) => {
    if (score >= 8) return 'Excellent';
    if (score >= 6) return 'Good';
    if (score >= 4) return 'Fair';
    return 'Poor';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="relative">
        <div className="absolute top-4 left-4 z-10">
          <button 
            onClick={() => navigate('/')}
            className="bg-black bg-opacity-50 rounded-full p-2"
          >
            <ArrowLeft className="text-white" size={24} />
          </button>
        </div>
        
        {/* Food image */}
        <div className="w-full h-64 bg-gray-200 overflow-hidden">
          {food.image ? (
            <img 
              src={food.image} 
              alt={food.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center">
              <span className="text-white text-6xl">🥞</span>
            </div>
          )}
        </div>
        
        {/* Tags overlay */}
        <div className="absolute top-4 right-4 flex gap-2">
          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm">
            Blueberries 5
          </span>
          <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm">
            Pancakes 3.5g
          </span>
          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm">
            Syrup 15
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Food name and category */}
        <div className="mb-4">
          <p className="text-gray-600 text-sm mb-1">Breakfast</p>
          <h1 className="text-2xl font-bold text-gray-800">{food.name}</h1>
        </div>

        {/* Quantity selector */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => adjustQuantity(-0.1)}
              className="bg-gray-100 rounded-full p-2"
            >
              <Minus size={20} />
            </button>
            <span className="text-xl font-semibold min-w-[3ch] text-center">
              {quantity.toFixed(1)}
            </span>
            <button 
              onClick={() => adjustQuantity(0.1)}
              className="bg-gray-100 rounded-full p-2"
            >
              <Plus size={20} />
            </button>
          </div>
          <button className="p-2">
            <Edit3 size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Nutrition info */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-yellow-500">⚡</span>
                <span className="text-gray-600">Calories</span>
                <span className="text-gray-600">📝</span>
              </div>
              <p className="text-2xl font-bold">{Math.round(food.calories * quantity)}</p>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-blue-500">💧</span>
                <span className="text-gray-600">Fats</span>
                <span className="text-gray-600">📝</span>
              </div>
              <p className="text-2xl font-bold">{Math.round(food.fat * quantity)}g</p>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-red-500">🔥</span>
                <span className="text-gray-600">Protein</span>
                <span className="text-gray-600">📝</span>
              </div>
              <p className="text-2xl font-bold">{Math.round(food.protein * quantity)}g</p>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-gray-500">⚪</span>
                <span className="text-gray-600">Carbs</span>
                <span className="text-gray-600">📝</span>
              </div>
              <p className="text-2xl font-bold">{Math.round(food.carbs * quantity)}g</p>
            </div>
          </div>
        </div>

        {/* Health Score */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">🌿 Health score</span>
            <span className="text-2xl font-bold">{food.healthScore}/10</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div 
              className={`h-3 rounded-full ${getHealthScoreColor(food.healthScore)}`}
              style={{ width: `${(food.healthScore / 10) * 100}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between text-sm text-gray-600">
            <span>Poor</span>
            <span className="font-semibold">{getHealthScoreText(food.healthScore)}</span>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <div className="max-w-400px mx-auto flex gap-4">
          {isNew && (
            <button className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold">
              ✏️ Fix Results
            </button>
          )}
          <button 
            onClick={handleDone}
            className="flex-1 bg-black text-white py-3 rounded-lg font-semibold"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodDetail;