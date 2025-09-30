import { FoodItem } from '../types';

// Mock food database with common foods and their nutritional information
const FOOD_DATABASE = [
  {
    name: 'Pancakes with blueberries & syrup',
    keywords: ['pancake', 'blueberry', 'syrup', 'breakfast'],
    nutritionalInfo: {
      calories: 615,
      protein: 11,
      carbs: 93,
      fat: 21
    },
    healthScore: 7
  },
  {
    name: 'Mixed Green Salad',
    keywords: ['salad', 'lettuce', 'tomato', 'vegetables', 'green'],
    nutritionalInfo: {
      calories: 150,
      protein: 5,
      carbs: 12,
      fat: 8
    },
    healthScore: 9
  },
  {
    name: 'Chicken Breast',
    keywords: ['chicken', 'meat', 'protein'],
    nutritionalInfo: {
      calories: 284,
      protein: 53,
      carbs: 0,
      fat: 6
    },
    healthScore: 8
  },
  {
    name: 'Hamburger',
    keywords: ['burger', 'hamburger', 'bun', 'meat'],
    nutritionalInfo: {
      calories: 540,
      protein: 25,
      carbs: 40,
      fat: 31
    },
    healthScore: 5
  },
  {
    name: 'Pizza Slice',
    keywords: ['pizza', 'cheese', 'slice'],
    nutritionalInfo: {
      calories: 285,
      protein: 12,
      carbs: 36,
      fat: 10
    },
    healthScore: 6
  },
  {
    name: 'Apple',
    keywords: ['apple', 'fruit'],
    nutritionalInfo: {
      calories: 95,
      protein: 0,
      carbs: 25,
      fat: 0
    },
    healthScore: 10
  },
  {
    name: 'Banana',
    keywords: ['banana', 'fruit'],
    nutritionalInfo: {
      calories: 105,
      protein: 1,
      carbs: 27,
      fat: 0
    },
    healthScore: 9
  },
  {
    name: 'Oatmeal',
    keywords: ['oatmeal', 'oats', 'breakfast', 'bowl'],
    nutritionalInfo: {
      calories: 158,
      protein: 6,
      carbs: 28,
      fat: 3
    },
    healthScore: 8
  },
  {
    name: 'Grilled Salmon',
    keywords: ['salmon', 'fish', 'seafood'],
    nutritionalInfo: {
      calories: 231,
      protein: 25,
      carbs: 0,
      fat: 14
    },
    healthScore: 9
  },
  {
    name: 'Pasta with Tomato Sauce',
    keywords: ['pasta', 'spaghetti', 'tomato', 'sauce'],
    nutritionalInfo: {
      calories: 220,
      protein: 8,
      carbs: 43,
      fat: 1
    },
    healthScore: 7
  }
];

// Simulate image analysis delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock food recognition function
export const recognizeFood = async (imageData: string): Promise<FoodItem> => {
  // Simulate processing time
  await delay(2000 + Math.random() * 2000);

  // For demo purposes, we'll randomly select a food or use a default
  // In a real app, this would use computer vision APIs like Google Vision, 
  // Clarifai, or custom ML models
  
  let recognizedFood;
  
  // Simple heuristic: try to detect pancakes if the image looks brownish
  // This is just for demo - real implementation would use proper image analysis
  try {
    // Create a simple color analysis
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.src = imageData;
    await new Promise(resolve => {
      img.onload = resolve;
    });
    
    canvas.width = 100;
    canvas.height = 100;
    ctx?.drawImage(img, 0, 0, 100, 100);
    
    const imageDataPixels = ctx?.getImageData(0, 0, 100, 100);
    let brownishPixels = 0;
    let greenishPixels = 0;
    
    if (imageDataPixels) {
      for (let i = 0; i < imageDataPixels.data.length; i += 4) {
        const r = imageDataPixels.data[i];
        const g = imageDataPixels.data[i + 1];
        const b = imageDataPixels.data[i + 2];
        
        // Detect brownish colors (potential pancakes/cooked food)
        if (r > 100 && g > 60 && b < 100 && r > g && g > b) {
          brownishPixels++;
        }
        
        // Detect greenish colors (potential salad/vegetables)
        if (g > r && g > b && g > 80) {
          greenishPixels++;
        }
      }
    }
    
    // Choose food based on color analysis
    if (brownishPixels > greenishPixels && brownishPixels > 50) {
      recognizedFood = FOOD_DATABASE.find(f => f.keywords.includes('pancake')) || FOOD_DATABASE[0];
    } else if (greenishPixels > 100) {
      recognizedFood = FOOD_DATABASE.find(f => f.keywords.includes('salad')) || FOOD_DATABASE[1];
    } else {
      // Default to a random food
      recognizedFood = FOOD_DATABASE[Math.floor(Math.random() * FOOD_DATABASE.length)];
    }
    
  } catch (error) {
    // If image analysis fails, use a default
    recognizedFood = FOOD_DATABASE[0]; // Default to pancakes
  }

  // Create FoodItem with unique ID and current timestamp
  const foodItem: FoodItem = {
    id: `food_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    name: recognizedFood.name,
    image: imageData, // Store the captured image
    nutritionalInfo: recognizedFood.nutritionalInfo,
    quantity: 1,
    timestamp: new Date(),
    healthScore: recognizedFood.healthScore
  };

  return foodItem;
};

// Alternative food search function for manual food entry
export const searchFood = (query: string): typeof FOOD_DATABASE => {
  const lowerQuery = query.toLowerCase();
  return FOOD_DATABASE.filter(food => 
    food.name.toLowerCase().includes(lowerQuery) ||
    food.keywords.some(keyword => keyword.includes(lowerQuery))
  );
};

// Get random food suggestions
export const getFoodSuggestions = (count: number = 5): typeof FOOD_DATABASE => {
  const shuffled = [...FOOD_DATABASE].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};