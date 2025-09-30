# Calorie Tracker App

A modern, mobile-first calorie tracking application with image-based food recognition capabilities.

## Features

- 📱 **Mobile-First Design**: Optimized for smartphone use with touch-friendly interfaces
- 📸 **Food Recognition**: Scan meals using your camera for automatic food identification
- 📊 **Nutrition Tracking**: Track calories, protein, carbs, and fat intake
- 📈 **Daily Summary**: Visual progress tracking with circular progress indicators
- 💾 **Data Persistence**: Your food logs are saved locally in your browser
- 🎯 **Health Scoring**: Get health scores for your meals (1-10 scale)

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd calorie-tracker-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

### Usage

1. **Dashboard**: View your daily nutrition summary and logged meals
2. **Scan Meal**: Tap the "Scan Your Meal" button to use your camera
3. **Camera**: Point your camera at food and tap the capture button
4. **Food Details**: Review and adjust serving sizes, then tap "Done" to log

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Camera**: HTML5 Media API
- **Storage**: localStorage

## Food Recognition

The app includes a mock food recognition system that:
- Analyzes image colors to identify potential food types
- Contains a database of common foods with nutritional information
- Simulates processing time for realistic user experience

In a production environment, this would be replaced with:
- Google Vision API
- Clarifai Food Recognition
- Custom ML models (TensorFlow, PyTorch)
- FoodVisor API
- Nutritionix API

## Project Structure

```
src/
├── components/          # React components
│   ├── Dashboard.tsx    # Main dashboard screen
│   ├── CameraScreen.tsx # Food scanning interface
│   ├── FoodDetailScreen.tsx # Food details and editing
│   ├── NutritionSummary.tsx # Daily nutrition overview
│   └── FoodList.tsx     # List of logged foods
├── utils/
│   └── foodRecognition.ts # Food database and recognition logic
├── types.ts            # TypeScript type definitions
├── App.tsx            # Main application component
└── index.tsx          # Application entry point
```

## Features in Detail

### Camera Functionality
- Front and back camera switching
- Real-time preview with food positioning guide
- Gallery upload option
- Image processing and analysis

### Nutrition Tracking
- Circular progress indicators for daily goals
- Adjustable serving sizes
- Comprehensive nutritional information
- Health scoring system

### Mobile Experience
- Touch-optimized controls
- Responsive design for all screen sizes
- Native-like navigation
- Optimized for portrait orientation

## Future Enhancements

- User profiles and personalized goals
- Meal planning and recommendations
- Social features and sharing
- Integration with fitness trackers
- Barcode scanning for packaged foods
- Offline functionality with service workers
- Advanced analytics and insights

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Icons provided by Lucide React
- Design inspiration from modern calorie tracking apps
- Food nutritional data sourced from USDA database
