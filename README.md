# Calorie Tracker App

A modern, intuitive calorie tracking application built with React that allows users to track their daily food intake using image recognition technology.

## 🌟 Features

### 📱 Core Functionality
- **Daily Dashboard**: Track calories, protein, carbs, and fat with visual progress circles
- **Food Scanning**: Use camera or upload images to automatically identify food and get nutritional information
- **Nutritional Analysis**: Get detailed nutritional breakdowns including calories, macros, and health scores
- **Food Database**: Searchable database of food items with nutritional information
- **Local Storage**: Persist food entries and user data locally

### 🎨 User Interface
- **Mobile-First Design**: Responsive design optimized for mobile devices
- **Modern UI**: Clean, intuitive interface inspired by popular fitness apps
- **Visual Progress Tracking**: Circular progress indicators for daily macro goals
- **Health Scoring**: Visual health score system (1-10) for food items

### 📷 Image Recognition
- **Camera Integration**: Real-time food scanning using device camera
- **File Upload**: Support for uploading food images from gallery
- **AI Food Recognition**: Mock AI service that identifies food items and provides nutritional data
- **Barcode Support**: (Interface ready) Scan product barcodes for instant nutrition facts

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
1. Clone the repository
   ```bash
   git clone <your-repo-url>
   cd calorie-tracker-app
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the app

## 📁 Project Structure
```
src/
├── components/
│   ├── Dashboard.js       # Main dashboard with daily summary
│   ├── FoodScanner.js     # Camera/image upload interface
│   ├── FoodDetail.js      # Food information and editing screen
│   ├── MacroCircle.js     # Circular progress component for macros
│   └── FoodEntry.js       # Individual food entry component
├── services/
│   ├── nutritionAPI.js    # Mock nutrition and food recognition API
│   └── storage.js         # Local storage management
├── App.js                 # Main app component with routing
└── index.js              # Application entry point
```

## 🔧 Key Components

### Dashboard
- Displays daily calorie and macro progress
- Shows logged food entries
- Quick access to food scanner
- Date navigation for viewing different days

### Food Scanner
- Camera interface for real-time food scanning
- File upload from gallery
- Loading states during food analysis
- Integration with nutrition API

### Food Detail
- Detailed nutritional information
- Quantity adjustment
- Health score visualization
- Save/edit functionality

## 📊 Data Management

### Local Storage
- Food entries with timestamps
- User profile and goals
- Daily nutrition summaries
- Persistent data across sessions

### Mock API Services
- Food recognition from images
- Nutritional database lookup
- Health score calculations
- Barcode scanning (interface ready)

## 🎯 Future Enhancements

### Short Term
- [ ] Real food recognition API integration (Edamam, Spoonacular)
- [ ] Barcode scanning functionality
- [ ] Food search and manual entry
- [ ] User profile and goal setting
- [ ] Export data functionality

### Long Term
- [ ] Backend API integration
- [ ] User authentication
- [ ] Social features and sharing
- [ ] Meal planning
- [ ] Nutrition recommendations
- [ ] Exercise tracking integration
- [ ] Cloud sync across devices

## 🛠️ Technology Stack

- **Frontend**: React 18, React Router
- **Styling**: CSS3, Flexbox, Grid
- **Icons**: Lucide React
- **Camera**: WebRTC API
- **Storage**: Local Storage API
- **Build Tool**: Create React App

## 📝 API Integration

The app is designed to easily integrate with real nutrition APIs:

### Recommended APIs
- **Edamam Food Database API**: Comprehensive food database
- **USDA FoodData Central**: Official nutrition database
- **Spoonacular API**: Food recognition and analysis
- **Clarifai**: AI-powered food recognition

### Integration Points
- Replace `analyzeFoodImage()` in `nutritionAPI.js`
- Add API keys in environment variables
- Update food data structure as needed

## 🏃‍♂️ Running the App

The app includes sample data for demonstration purposes. When first loaded:
1. Sample food entries are created
2. Daily nutrition summary is calculated
3. All features are fully functional

## 📱 Mobile Features

- **Camera Access**: Uses `navigator.mediaDevices.getUserMedia()`
- **Responsive Design**: Mobile-first approach
- **Touch Friendly**: Optimized for touch interactions
- **Progressive Web App**: Ready for PWA conversion

## 🔒 Privacy & Data

- All data stored locally in browser
- No data transmitted to external servers (except for nutrition APIs when integrated)
- Users maintain full control over their data
- Easy data export/import capabilities

## 🤝 Contributing

This app was built as a demonstration project. For production use:
1. Integrate real nutrition APIs
2. Add comprehensive testing
3. Implement proper error handling
4. Add accessibility features
5. Optimize performance

## 📄 License

This project is open source and available under the MIT License.