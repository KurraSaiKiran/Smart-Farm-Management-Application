import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { useLocalStorage } from './hooks/useLocalStorage';
import Navigation from './components/UI/Navigation';
import Toast from './components/UI/Toast';
import ImageUpload from './components/Upload/ImageUpload';
import UploadProgress from './components/Upload/UploadProgress';
import PlantMap from './components/Map/PlantMap';
import PlantList from './components/PlantList/PlantList';
import Analytics from './components/Analytics/Analytics';
import Settings from './components/Settings/Settings';
import { Sparkles, MapPin, Database, BarChart3, Settings as SettingsIcon } from 'lucide-react';

const App: React.FC = () => {
  useLocalStorage(); // Initialize localStorage persistence
  
  const { activeView, isDarkMode } = useSelector((state: RootState) => state.ui);
  const plantCount = useSelector((state: RootState) => state.plants.plants.length);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentView, setCurrentView] = useState(activeView);

  // Handle smooth view transitions
  useEffect(() => {
    if (activeView !== currentView) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentView(activeView);
        setIsTransitioning(false);
      }, 150);
    }
  }, [activeView, currentView]);

  // Apply dark mode to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Register service worker for PWA
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('SW registered'))
        .catch(() => console.log('SW registration failed'));
    }
  }, []);

  const renderContent = () => {
    switch (currentView) {
      case 'upload':
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4 animate-fade-in">
              <div className="flex items-center justify-center space-x-3">
                <Sparkles className="w-8 h-8 text-green-500 animate-bounce" />
                <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Upload Plant Images
                </h2>
                <Sparkles className="w-8 h-8 text-blue-500 animate-bounce" style={{animationDelay: '0.5s'}} />
              </div>
              <p className={`text-xl max-w-2xl mx-auto leading-relaxed transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Transform your geo-tagged photos into an interactive farm map. 
                <span className="font-semibold text-green-600">AI-powered location extraction</span> makes it effortless!
              </p>
            </div>
            <div className="animate-slide-up">
              <ImageUpload />
            </div>
            <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
              <UploadProgress />
            </div>
          </div>
        );
      
      case 'map':
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4 animate-fade-in">
              <div className="flex items-center justify-center space-x-3">
                <MapPin className="w-8 h-8 text-blue-500 animate-pulse" />
                <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Interactive Farm Map
                </h2>
                <MapPin className="w-8 h-8 text-purple-500 animate-pulse" style={{animationDelay: '0.5s'}} />
              </div>
              <p className={`text-xl max-w-2xl mx-auto leading-relaxed transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Explore your farm like never before. Each pin tells a story of growth and location.
              </p>
            </div>
            {plantCount > 0 ? (
              <div className={`card p-2 animate-scale-in ${isDarkMode ? 'bg-gray-800' : ''}`}>
                <PlantMap />
              </div>
            ) : (
              <div className={`card p-12 text-center animate-scale-in ${isDarkMode ? 'bg-gray-800 text-white' : ''}`}>
                <MapPin className={`w-16 h-16 mx-auto mb-4 animate-bounce ${isDarkMode ? 'text-gray-400' : 'text-gray-300'}`} />
                <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>Your Farm Map Awaits</h3>
                <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Upload some plant images to see them come alive on the map!</p>
                <button className="btn-primary transform hover:scale-105 transition-transform duration-200">Start Uploading</button>
              </div>
            )}
          </div>
        );
      
      case 'list':
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4 animate-fade-in">
              <div className="flex items-center justify-center space-x-3">
                <Database className="w-8 h-8 text-purple-500 animate-pulse" />
                <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Plant Collection
                </h2>
                <Database className="w-8 h-8 text-pink-500 animate-pulse" style={{animationDelay: '0.5s'}} />
              </div>
              <p className={`text-xl max-w-2xl mx-auto leading-relaxed transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Manage your digital garden with powerful search, sorting, and export capabilities.
              </p>
            </div>
            <div className="animate-slide-up">
              <PlantList />
            </div>
          </div>
        );
      
      case 'analytics':
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4 animate-fade-in">
              <div className="flex items-center justify-center space-x-3">
                <BarChart3 className="w-8 h-8 text-orange-500 animate-pulse" />
                <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Farm Analytics
                </h2>
                <BarChart3 className="w-8 h-8 text-red-500 animate-pulse" style={{animationDelay: '0.5s'}} />
              </div>
              <p className={`text-xl max-w-2xl mx-auto leading-relaxed transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Gain insights into your farming patterns with detailed analytics and trends.
              </p>
            </div>
            <div className="animate-slide-up">
              <Analytics />
            </div>
          </div>
        );
      
      case 'settings':
        return (
          <div className="animate-fade-in">
            <Settings />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ease-in-out ${
      isDarkMode ? 'dark bg-gray-900' : ''
    }`}>
      <Navigation />
      <main className={`max-w-7xl mx-auto px-4 lg:px-6 py-6 lg:py-12 transition-all duration-300 ${
        isTransitioning ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
      }`}>
        {renderContent()}
      </main>
      <Toast />
      
      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow ${
          isDarkMode ? 'bg-green-400' : 'bg-green-200'
        }`}></div>
        <div className={`absolute top-3/4 right-1/4 w-64 h-64 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow ${
          isDarkMode ? 'bg-blue-400' : 'bg-blue-200'
        }`} style={{animationDelay: '2s'}}></div>
        <div className={`absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow ${
          isDarkMode ? 'bg-purple-400' : 'bg-purple-200'
        }`} style={{animationDelay: '4s'}}></div>
      </div>
    </div>
  );
};

export default App;