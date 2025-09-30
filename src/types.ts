export interface NutritionalInfo {
  calories: number;
  protein: number; // in grams
  carbs: number; // in grams
  fat: number; // in grams
}

export interface FoodItem {
  id: string;
  name: string;
  image?: string;
  nutritionalInfo: NutritionalInfo;
  quantity: number; // serving size multiplier
  timestamp: Date;
  healthScore?: number; // 1-10 scale
}

export interface DailyGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface UserProfile {
  name: string;
  dailyGoals: DailyGoals;
  currentStreak?: number;
}

export type Screen = 'dashboard' | 'camera' | 'foodDetail' | 'profile';

export interface AppState {
  currentScreen: Screen;
  currentUser: UserProfile;
  todaysFoods: FoodItem[];
  selectedFood?: FoodItem;
  cameraCapture?: string;
}