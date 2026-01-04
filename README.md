# GeoTag Plants - Smart Farm Management Application

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue.svg)](https://www.typescriptlang.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-1.9.7-purple.svg)](https://redux-toolkit.js.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.6-green.svg)](https://tailwindcss.com/)

A production-ready React application that allows farmers to upload geo-tagged plant images, extract GPS coordinates, and visualize plant locations on an interactive farm map with advanced analytics and dark mode support.

## 🔗 Quick Links

- **🌐 Live Demo**: [https://smart-farm-management-application.vercel.app/](https://smart-farm-management-application.vercel.app/)
- **📚 API Documentation**: [https://github.com/KurraSaiKiran/Smart-Farm-Management-Application/blob/main/API_DOCUMENTATION.md](https://github.com/KurraSaiKiran/Smart-Farm-Management-Application/blob/main/API_DOCUMENTATION.md)

---
### 🧠 Design Philosophy

I focused on making **system behavior observable to the user**, especially in cases of **uncertainty or partial failure**, rather than hiding complexity behind generic loading states.

This approach helps users:
- Understand what is happening at each stage of the workflow
- Identify issues early during uploads or location extraction
- Build trust in the system even when data is incomplete or approximate


## 🌟 Features

### Core Functionality
- ✅ **Image Upload**: Drag & drop interface with multiple file support (JPG, PNG)
- ✅ **Location Extraction**: Automatic GPS coordinate extraction from EXIF data
- ✅ **Interactive Map**: Leaflet-based visualization with custom markers
- ✅ **Data Management**: Search, filter, sort, and delete plant entries
- ✅ **Export Options**: Download data as CSV or JSON
- ✅ **Offline Support**: PWA with service worker and localStorage persistence

### Advanced Features
- 🌙 **Dark Mode**: Complete theme switching with smooth transitions
- 📊 **Analytics Dashboard**: Statistics, charts, and growth insights
- 📱 **PWA Support**: Install as mobile app, works offline
- ✨ **Smooth Animations**: Page transitions and micro-interactions
- 🎨 **Modern UI**: Glass morphism, gradients, and responsive design
- ⚙️ **Settings & Profile**: User preferences, farm details, and app customization

## 🏗️ Architecture Overview

### Component Hierarchy
```
App
├── Navigation (UI state, theme toggle)
├── Main Content (view-based routing)
│   ├── Upload View
│   │   ├── ImageUpload (drag & drop)
│   │   └── UploadProgress (real-time status)
│   ├── Map View
│   │   └── PlantMap (Leaflet integration)
│   ├── List View
│   │   └── PlantList (search, sort, export)
│   └── Analytics View
│       └── Analytics (charts, statistics)
└── Toast (global notifications)
```

### State Management Flow
```
Redux Store
├── uploadSlice
│   ├── uploads[] (progress tracking)
│   └── actions: addUpload, updateUpload, removeUpload
├── plantSlice
│   ├── plants[] (main data)
│   ├── filteredPlants[] (search/sort results)
│   └── actions: addPlant, removePlant, setSearchTerm
└── uiSlice
    ├── activeView (navigation state)
    ├── isDarkMode (theme preference)
    ├── toasts[] (notifications)
    └── actions: setActiveView, toggleDarkMode, addToast
```

### Data Flow Architecture
```
1. Image Upload → Cloudinary
2. Location Extraction → External API
3. Plant Data → Redux Store + localStorage
4. Map Visualization → Leaflet markers
5. Analytics → Computed from plant data
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- Cloudinary account (free tier available)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/geotag-plants.git
   cd geotag-plants
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment setup:**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your Cloudinary credentials:
   ```env
   VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
   VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

## ⚙️ Configuration

### Cloudinary Setup
1. Create account at [cloudinary.com](https://cloudinary.com/users/register/free)
2. Navigate to Settings → Upload → Add upload preset
3. Configure preset:
   - Name: `unsigned_upload`
   - Signing Mode: `Unsigned`
   - Allowed formats: `jpg, png`
4. Copy Cloud Name and Upload Preset to `.env`

### API Integration
The application integrates with external APIs:
- **Location Extraction**: `https://api.alumnx.com/api/hackathons/extract-latitude-longitude`
- **Data Persistence**: `https://api.alumnx.com/api/hackathons/save-plant-location-data`

*Note: Update email in `src/hooks/usePlantUpload.ts` line 10*

## 🏛️ Technical Architecture

### Frontend Stack
- **React 18**: Modern hooks, concurrent features
- **TypeScript**: Type safety and developer experience
- **Redux Toolkit**: Predictable state management
- **Tailwind CSS**: Utility-first styling
- **Vite**: Fast build tool and HMR

### Key Design Decisions

#### State Management
- **Redux Toolkit**: Chosen for complex state interactions between upload, plants, and UI
- **Slice Pattern**: Feature-based organization for maintainability
- **Normalized State**: Efficient filtering and sorting operations

#### Component Architecture
- **Feature-based Structure**: Components grouped by functionality
- **Custom Hooks**: Business logic abstraction (`usePlantUpload`, `useLocalStorage`)
- **Service Layer**: API calls separated from components

#### Performance Optimizations
- **React.memo**: Prevent unnecessary re-renders
- **useCallback**: Stable function references
- **CSS Animations**: Hardware-accelerated transitions
- **Image Optimization**: Cloudinary transformations

#### Error Handling Strategy
- **Try-catch Blocks**: Comprehensive async error handling
- **CORS Fallbacks**: Mock data when APIs unavailable
- **User Feedback**: Toast notifications for all actions
- **Graceful Degradation**: App works offline

## 🎨 UI/UX Design

### Design System
- **Color Palette**: Green/Blue gradients for nature theme
- **Typography**: Inter font for modern, readable text
- **Spacing**: Consistent 8px grid system
- **Animations**: Smooth 300ms transitions

### Responsive Design
- **Mobile-first**: Tailwind's responsive utilities
- **Breakpoints**: sm (640px), md (768px), lg (1024px)
- **Touch-friendly**: 44px minimum touch targets

### Accessibility
- **Semantic HTML**: Proper heading hierarchy
- **Keyboard Navigation**: Focus management
- **Screen Readers**: ARIA labels and descriptions
- **Color Contrast**: WCAG AA compliance

## 🧪 Development Workflow

### Code Quality
- **ESLint**: Code linting and formatting
- **TypeScript**: Compile-time error checking
- **Prettier**: Consistent code formatting
- **Git Hooks**: Pre-commit quality checks

### Testing Strategy
- **Unit Tests**: Component and utility testing
- **Integration Tests**: API and state management
- **E2E Tests**: Critical user workflows
- **Visual Regression**: UI consistency checks

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

Set environment variables in Vercel dashboard:
- `VITE_CLOUDINARY_CLOUD_NAME`
- `VITE_CLOUDINARY_UPLOAD_PRESET`

### Alternative Platforms
- **Netlify**: Drag & drop build folder
- **AWS Amplify**: Connect GitHub repository
- **GitHub Pages**: Use `gh-pages` package

## 🔧 Challenges & Solutions

### Challenge 1: CORS Issues with External APIs
**Problem**: Browser blocks cross-origin requests to location extraction API
**Solution**: Implemented fallback system with mock location data for development
```typescript
try {
  const response = await axios.post(API_URL, data);
  return response.data;
} catch (error) {
  // Fallback to mock data for demo
  return generateMockLocation();
}
```

### Challenge 2: Leaflet Marker Icons Not Displaying
**Problem**: Default Leaflet markers don't work with bundlers
**Solution**: Created custom icon with CDN URLs
```typescript
const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
```

### Challenge 3: Smooth Page Transitions
**Problem**: Instant view switching felt jarring
**Solution**: Implemented fade-out/fade-in transition system
```typescript
const [isTransitioning, setIsTransitioning] = useState(false);

useEffect(() => {
  if (activeView !== currentView) {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentView(activeView);
      setIsTransitioning(false);
    }, 150);
  }
}, [activeView, currentView]);
```

### Challenge 4: Dark Mode Implementation
**Problem**: Consistent theming across all components
**Solution**: Tailwind's dark mode with CSS custom properties
```css
.dark .card {
  @apply bg-gray-800/80 border-gray-700/20;
}
```

## 📊 Performance Metrics

### Lighthouse Scores (Target)
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 95+

### Bundle Analysis
- **Initial Bundle**: ~200KB gzipped
- **Lazy Loading**: Map components loaded on demand
- **Tree Shaking**: Unused code eliminated

## 🔮 Future Enhancements

### Planned Features
- [ ] **Real-time Collaboration**: Multiple farmers sharing farm data
- [ ] **Plant Health Indicators**: Color-coded markers based on plant status
- [ ] **Historical Timeline**: View farm changes over time
- [ ] **Geofencing**: Define and visualize farm boundaries
- [ ] **Weather Integration**: Display weather data for plant locations
- [ ] **Machine Learning**: Plant disease detection from images

### Technical Improvements
- [ ] **Unit Test Coverage**: Achieve 90%+ test coverage
- [ ] **Performance Monitoring**: Real user metrics tracking
- [ ] **Internationalization**: Multi-language support
- [ ] **Advanced Analytics**: More detailed insights and reports

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation

## 📄 License

MIT License

Copyright (c) 2024 GeoTag Plants

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **React Team**: For the amazing framework
- **Redux Team**: For predictable state management
- **Tailwind CSS**: For utility-first styling
- **Leaflet**: For interactive maps
- **Cloudinary**: For image management

---

**Built with ❤️ for farmers worldwide** 🌱
