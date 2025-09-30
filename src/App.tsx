import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import CameraScreen from './components/CameraScreen';
import FoodDetailScreen from './components/FoodDetailScreen';
import { AppState, FoodItem, UserProfile, Screen } from './types';

const defaultUser: UserProfile = {
  name: 'Abhishek',
  dailyGoals: {
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 67
  }
};

function App() {
  const [appState, setAppState] = useState<AppState>({
    currentScreen: 'dashboard',
    currentUser: defaultUser,
    todaysFoods: []
  });

  // Load data from localStorage on app start
  useEffect(() => {
    const savedData = localStorage.getItem('calorieTrackerData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setAppState(prevState => ({
          ...prevState,
          todaysFoods: parsedData.todaysFoods?.map((food: any) => ({
            ...food,
            timestamp: new Date(food.timestamp)
          })) || []
        }));
      } catch (error) {
        console.error('Failed to load saved data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever todaysFoods changes
  useEffect(() => {
    localStorage.setItem('calorieTrackerData', JSON.stringify({
      todaysFoods: appState.todaysFoods
    }));
  }, [appState.todaysFoods]);

  const navigateToScreen = (screen: Screen) => {
    setAppState(prev => ({ ...prev, currentScreen: screen }));
  };

  const addFood = (food: FoodItem) => {
    setAppState(prev => ({
      ...prev,
      todaysFoods: [...prev.todaysFoods, food],
      currentScreen: 'dashboard'
    }));
  };

  const selectFood = (food: FoodItem) => {
    setAppState(prev => ({
      ...prev,
      selectedFood: food,
      currentScreen: 'foodDetail'
    }));
  };

  const setCameraCapture = (imageData: string) => {
    setAppState(prev => ({ ...prev, cameraCapture: imageData }));
  };

  const renderCurrentScreen = () => {
    switch (appState.currentScreen) {
      case 'dashboard':
        return (
          <Dashboard 
            user={appState.currentUser}
            todaysFoods={appState.todaysFoods}
            onNavigate={navigateToScreen}
            onSelectFood={selectFood}
          />
        );
      case 'camera':
        return (
          <CameraScreen
            onNavigate={navigateToScreen}
            onFoodCaptured={addFood}
            onCameraCapture={setCameraCapture}
            capturedImage={appState.cameraCapture}
          />
        );
      case 'foodDetail':
        return (
          <FoodDetailScreen
            food={appState.selectedFood!}
            onNavigate={navigateToScreen}
            onUpdateFood={addFood}
          />
        );
      default:
        return (
          <Dashboard 
            user={appState.currentUser}
            todaysFoods={appState.todaysFoods}
            onNavigate={navigateToScreen}
            onSelectFood={selectFood}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-lg">
        {renderCurrentScreen()}
      </div>
    </div>
  );
}

export default App;