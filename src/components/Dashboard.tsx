import React from 'react';
import { Home, User, Camera } from 'lucide-react';
import { UserProfile, FoodItem, Screen } from '../types';
import NutritionSummary from './NutritionSummary';
import FoodList from './FoodList';

interface DashboardProps {
  user: UserProfile;
  todaysFoods: FoodItem[];
  onNavigate: (screen: Screen) => void;
  onSelectFood: (food: FoodItem) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  user, 
  todaysFoods, 
  onNavigate, 
  onSelectFood 
}) => {
  const currentDate = new Date();
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const dayOfMonth = currentDate.getDate();

  // Calculate daily totals
  const dailyTotals = todaysFoods.reduce(
    (totals, food) => ({
      calories: totals.calories + (food.nutritionalInfo.calories * food.quantity),
      protein: totals.protein + (food.nutritionalInfo.protein * food.quantity),
      carbs: totals.carbs + (food.nutritionalInfo.carbs * food.quantity),
      fat: totals.fat + (food.nutritionalInfo.fat * food.quantity),
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="px-6 py-4 bg-white">
        <div className="text-center mb-6">
          <div className="text-gray-600 text-sm mb-2">{monthName}</div>
          <div className="flex justify-center items-center space-x-2 mb-4">
            {/* Calendar dots */}
            <div className="flex space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">29</div>
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">30</div>
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">1</div>
              <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-white text-xs font-semibold">{dayOfMonth}</div>
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">3</div>
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">4</div>
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">5</div>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Welcome, {user.name}!</h1>
          <p className="text-gray-500 text-sm">Let's track your meals and hit your goals.</p>
        </div>

        {/* Today's Summary */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Today's Summary</h2>
          <NutritionSummary 
            current={dailyTotals}
            goals={user.dailyGoals}
          />
        </div>
      </div>

      {/* Food Log Section */}
      <div className="flex-1 px-6 pb-24">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Food Logged for today</h2>
        <FoodList 
          foods={todaysFoods}
          onSelectFood={onSelectFood}
        />
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2">
        <button
          onClick={() => onNavigate('camera')}
          className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-2 transition-all duration-200"
        >
          <Camera size={20} />
          <span className="font-medium">Scan Your Meal</span>
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200">
        <div className="flex justify-around py-4">
          <button className="flex flex-col items-center space-y-1 text-gray-900">
            <Home size={20} />
            <span className="text-xs">Home</span>
          </button>
          <div className="w-12 h-1 bg-gray-900 rounded-full"></div>
          <button 
            className="flex flex-col items-center space-y-1 text-gray-400"
            onClick={() => onNavigate('profile')}
          >
            <User size={20} />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;