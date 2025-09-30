import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Home, User } from 'lucide-react';
import MacroCircle from './MacroCircle';
import FoodEntry from './FoodEntry';
import { getDailyNutritionSummary, getUserProfile, initializeSampleData } from '../services/storage';

const Dashboard = () => {
  const navigate = useNavigate();
  const [todaysFood, setTodaysFood] = useState([]);
  const [macros, setMacros] = useState({
    calories: { current: 0, target: 2000 },
    protein: { current: 0, target: 150 },
    carbs: { current: 0, target: 200 },
    fat: { current: 0, target: 80 }
  });

  useEffect(() => {
    loadDailyData();
  }, []);

  const loadDailyData = () => {
    // Initialize sample data if needed
    initializeSampleData();
    
    // Get today's nutrition summary
    const summary = getDailyNutritionSummary();
    const profile = getUserProfile();
    
    setTodaysFood(summary.entries);
    setMacros({
      calories: { current: Math.round(summary.calories), target: profile.goals.calories },
      protein: { current: Math.round(summary.protein), target: profile.goals.protein },
      carbs: { current: Math.round(summary.carbs), target: profile.goals.carbs },
      fat: { current: Math.round(summary.fat), target: profile.goals.fat }
    });
  };

  const getCurrentDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  const getCurrentDay = () => {
    const date = new Date();
    return date.getDate();
  };

  const getDayNumbers = () => {
    const currentDay = getCurrentDay();
    const days = [];
    for (let i = currentDay - 3; i <= currentDay + 3; i++) {
      days.push(i);
    }
    return days;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header with date picker */}
      <div className="bg-white p-4">
        <div className="text-center mb-4">
          <p className="text-gray-600 mb-2">{getCurrentDate()}</p>
          <div className="flex justify-center gap-2">
            {getDayNumbers().map((day, index) => (
              <div
                key={index}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  day === getCurrentDay()
                    ? 'bg-black text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {day}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2">
            <div className="w-2 h-2 bg-black rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Welcome message */}
      <div className="container">
        <h1 className="text-2xl font-bold text-center mb-2">Welcome, Abhishek!</h1>
        <p className="text-center text-gray-600 mb-6">Let's track your meals and hit your goals.</p>

        {/* Today's Summary */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Today's Summary</h2>
          <div className="grid grid-cols-4 gap-4">
            <MacroCircle 
              value={macros.calories.current}
              target={macros.calories.target}
              label="Calories"
              color="green"
            />
            <MacroCircle 
              value={macros.protein.current}
              target={macros.protein.target}
              label="Protein"
              color="blue"
            />
            <MacroCircle 
              value={macros.carbs.current}
              target={macros.carbs.target}
              label="Carbs"
              color="orange"
            />
            <MacroCircle 
              value={macros.fat.current}
              target={macros.fat.target}
              label="Fat"
              color="purple"
            />
          </div>
        </div>

        {/* Food entries */}
        <div className="mb-20">
          <h2 className="text-lg font-semibold mb-4">Food Logged for today</h2>
          {todaysFood.map((food) => (
            <FoodEntry key={food.id} food={food} />
          ))}
        </div>
      </div>

      {/* Scan button */}
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2">
        <button
          onClick={() => navigate('/scanner')}
          className="bg-black text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-lg"
        >
          <Camera size={20} />
          Scan Your Meal
        </button>
      </div>

      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-400px mx-auto flex justify-around py-2">
          <div className="flex flex-col items-center p-2">
            <Home size={24} className="text-black" />
            <div className="w-16 h-1 bg-black rounded-full mt-1"></div>
          </div>
          <div className="flex flex-col items-center p-2">
            <User size={24} className="text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;