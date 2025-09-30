// Local storage service for persisting food entries
// In a real app, this would be replaced with a backend database

const STORAGE_KEYS = {
  FOOD_ENTRIES: 'calorie_tracker_food_entries',
  USER_PROFILE: 'calorie_tracker_user_profile',
  DAILY_GOALS: 'calorie_tracker_daily_goals'
};

// Food entries management
export const saveFoodEntry = (foodEntry) => {
  const entries = getFoodEntries();
  const newEntry = {
    ...foodEntry,
    id: foodEntry.id || Date.now(),
    timestamp: new Date().toISOString(),
    date: new Date().toDateString()
  };
  
  entries.push(newEntry);
  localStorage.setItem(STORAGE_KEYS.FOOD_ENTRIES, JSON.stringify(entries));
  return newEntry;
};

export const getFoodEntries = (date = null) => {
  const entries = JSON.parse(localStorage.getItem(STORAGE_KEYS.FOOD_ENTRIES) || '[]');
  
  if (date) {
    const targetDate = new Date(date).toDateString();
    return entries.filter(entry => 
      new Date(entry.timestamp).toDateString() === targetDate
    );
  }
  
  return entries;
};

export const updateFoodEntry = (id, updates) => {
  const entries = getFoodEntries();
  const index = entries.findIndex(entry => entry.id === id);
  
  if (index !== -1) {
    entries[index] = { ...entries[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.FOOD_ENTRIES, JSON.stringify(entries));
    return entries[index];
  }
  
  return null;
};

export const deleteFoodEntry = (id) => {
  const entries = getFoodEntries();
  const filteredEntries = entries.filter(entry => entry.id !== id);
  localStorage.setItem(STORAGE_KEYS.FOOD_ENTRIES, JSON.stringify(filteredEntries));
  return true;
};

// Daily nutrition calculations
export const getDailyNutritionSummary = (date = new Date()) => {
  const entries = getFoodEntries(date);
  
  const summary = entries.reduce((acc, entry) => {
    const quantity = entry.quantity || 1;
    return {
      calories: acc.calories + (entry.calories * quantity),
      protein: acc.protein + (entry.protein * quantity),
      carbs: acc.carbs + (entry.carbs * quantity),
      fat: acc.fat + (entry.fat * quantity),
      fiber: acc.fiber + ((entry.fiber || 0) * quantity),
      sugar: acc.sugar + ((entry.sugar || 0) * quantity),
      sodium: acc.sodium + ((entry.sodium || 0) * quantity)
    };
  }, {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    sugar: 0,
    sodium: 0
  });
  
  return {
    ...summary,
    entryCount: entries.length,
    entries: entries
  };
};

// User profile management
export const getUserProfile = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_PROFILE) || JSON.stringify({
    name: 'Abhishek',
    age: null,
    gender: null,
    height: null,
    weight: null,
    activityLevel: 'moderate',
    goals: {
      calories: 2000,
      protein: 150,
      carbs: 200,
      fat: 80
    }
  }));
};

export const updateUserProfile = (updates) => {
  const profile = getUserProfile();
  const updatedProfile = { ...profile, ...updates };
  localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(updatedProfile));
  return updatedProfile;
};

// Daily goals management
export const getDailyGoals = () => {
  const profile = getUserProfile();
  return profile.goals;
};

export const updateDailyGoals = (goals) => {
  const profile = getUserProfile();
  profile.goals = { ...profile.goals, ...goals };
  localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  return profile.goals;
};

// Initialize sample data if empty
export const initializeSampleData = () => {
  const entries = getFoodEntries();
  if (entries.length === 0) {
    const sampleEntries = [
      {
        id: 1,
        name: 'Pancake',
        calories: 410,
        protein: 8.3,
        carbs: 44,
        fat: 14.8,
        quantity: 1,
        timestamp: new Date().toISOString(),
        date: new Date().toDateString(),
        time: '8:30 AM'
      },
      {
        id: 2,
        name: 'Pancake',
        calories: 410,
        protein: 8.3,
        carbs: 44,
        fat: 14.8,
        quantity: 1,
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
        date: new Date().toDateString(),
        time: '12:00 PM'
      },
      {
        id: 3,
        name: 'Pancake',
        calories: 455,
        protein: 9.0,
        carbs: 46,
        fat: 14.8,
        quantity: 1,
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
        date: new Date().toDateString(),
        time: '6:30 PM'
      }
    ];
    
    localStorage.setItem(STORAGE_KEYS.FOOD_ENTRIES, JSON.stringify(sampleEntries));
  }
};