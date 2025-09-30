// Mock nutrition API service
// In a real app, this would integrate with services like:
// - Edamam Food Database API
// - USDA FoodData Central
// - Spoonacular API
// - Custom food recognition AI service

const MOCK_FOOD_DATABASE = [
  {
    name: 'Pancakes with blueberries & syrup',
    calories: 615,
    protein: 11,
    carbs: 93,
    fat: 21,
    fiber: 3,
    sugar: 45,
    sodium: 580,
    healthScore: 7,
    category: 'Breakfast',
    ingredients: ['pancakes', 'blueberries', 'syrup'],
    allergens: ['gluten', 'eggs', 'dairy']
  },
  {
    name: 'Mixed Green Salad',
    calories: 245,
    protein: 8,
    carbs: 15,
    fat: 12,
    fiber: 8,
    sugar: 6,
    sodium: 320,
    healthScore: 9,
    category: 'Lunch',
    ingredients: ['lettuce', 'tomatoes', 'cucumber', 'chickpeas', 'olive oil'],
    allergens: []
  },
  {
    name: 'Grilled Chicken Breast',
    calories: 284,
    protein: 53,
    carbs: 0,
    fat: 6,
    fiber: 0,
    sugar: 0,
    sodium: 98,
    healthScore: 8,
    category: 'Protein',
    ingredients: ['chicken breast'],
    allergens: []
  },
  {
    name: 'Cheeseburger with Fries',
    calories: 1230,
    protein: 45,
    carbs: 89,
    fat: 78,
    fiber: 5,
    sugar: 8,
    sodium: 1850,
    healthScore: 3,
    category: 'Fast Food',
    ingredients: ['beef patty', 'cheese', 'bun', 'lettuce', 'tomato', 'french fries'],
    allergens: ['gluten', 'dairy']
  }
];

// Simulate food recognition from image
export const analyzeFoodImage = async (imageData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock AI food recognition - in reality this would use computer vision
  // to identify food items in the image and return nutritional data
  const randomFood = MOCK_FOOD_DATABASE[Math.floor(Math.random() * MOCK_FOOD_DATABASE.length)];
  
  return {
    ...randomFood,
    id: Date.now(),
    confidence: Math.random() * 0.3 + 0.7, // 70-100% confidence
    image: imageData
  };
};

// Search for food by name
export const searchFood = async (query) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const results = MOCK_FOOD_DATABASE.filter(food => 
    food.name.toLowerCase().includes(query.toLowerCase()) ||
    food.ingredients.some(ingredient => 
      ingredient.toLowerCase().includes(query.toLowerCase())
    )
  );
  
  return results.map(food => ({
    ...food,
    id: Date.now() + Math.random()
  }));
};

// Get food by barcode
export const getFoodByBarcode = async (barcode) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock barcode lookup
  const randomFood = MOCK_FOOD_DATABASE[Math.floor(Math.random() * MOCK_FOOD_DATABASE.length)];
  
  return {
    ...randomFood,
    id: Date.now(),
    barcode: barcode
  };
};

// Calculate health score based on nutritional values
export const calculateHealthScore = (nutrition) => {
  let score = 5; // Base score
  
  // Positive factors
  if (nutrition.protein > 20) score += 1;
  if (nutrition.fiber > 5) score += 1;
  if (nutrition.sodium < 500) score += 1;
  if (nutrition.sugar < 10) score += 1;
  
  // Negative factors
  if (nutrition.fat > 30) score -= 1;
  if (nutrition.sodium > 1000) score -= 1;
  if (nutrition.sugar > 25) score -= 1;
  if (nutrition.calories > 800) score -= 1;
  
  return Math.max(1, Math.min(10, score));
};

// Get daily nutrition summary
export const getDailyNutrition = async (userId, date) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Mock daily nutrition data
  return {
    date: date,
    totalCalories: 1275,
    targetCalories: 2000,
    protein: { current: 26, target: 150 },
    carbs: { current: 134, target: 200 },
    fat: { current: 56, target: 80 },
    fiber: 18,
    sugar: 45,
    sodium: 1200,
    meals: []
  };
};