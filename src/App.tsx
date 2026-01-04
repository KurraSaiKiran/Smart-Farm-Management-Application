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
import CursorFollower from './components/UI/CursorFollower';
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

  const getViewBackground = () => {
    switch (currentView) {
      case 'upload':
        return isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-emerald-900/20 to-green-900/30'
          : 'bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50';
      case 'map':
        return isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-blue-900/20 to-cyan-900/30'
          : 'bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50';
      case 'list':
        return isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-rose-900/20 to-pink-900/30'
          : 'bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50';
      case 'analytics':
        return isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-purple-900/20 to-indigo-900/30'
          : 'bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50';
      case 'settings':
        return isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-violet-900/20 to-purple-900/30'
          : 'bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50';
      default:
        return isDarkMode ? 'bg-gray-900' : 'bg-gray-50';
    }
  };
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
            <div className="text-center space-y-4 animate-fade-up">
              <h2 className="text-4xl font-bold modern-gradient">
                Upload Plant Images
              </h2>
              <p className={`text-lg max-w-2xl mx-auto leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Transform your geo-tagged photos into an interactive farm map with AI-powered location extraction.
              </p>
            </div>
            <div className="animate-fade-up delay-100">
              <ImageUpload />
            </div>
            <div className="animate-fade-up delay-200">
              <UploadProgress />
            </div>
          </div>
        );
      
      case 'map':
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4 animate-fade-up">
              <h2 className="text-4xl font-bold modern-gradient">
                Interactive Farm Map
              </h2>
              <p className={`text-lg max-w-2xl mx-auto leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Explore your farm like never before. Each pin tells a story of growth and location.
              </p>
            </div>
            {plantCount > 0 ? (
              <div className={`card p-4 animate-fade-up delay-100 ${isDarkMode ? 'bg-gray-800' : ''}`}>
                <PlantMap />
              </div>
            ) : (
              <div className={`card p-12 text-center animate-fade-up delay-100 ${isDarkMode ? 'bg-gray-800 text-white' : ''}`}>
                <MapPin className={`w-16 h-16 mx-auto mb-4 animate-gentle-bounce ${isDarkMode ? 'text-gray-400' : 'text-gray-300'}`} />
                <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>Your Farm Map Awaits</h3>
                <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Upload some plant images to see them come alive on the map!</p>
                <button className="btn-primary">Start Uploading</button>
              </div>
            )}
          </div>
        );
      
      case 'list':
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4 animate-fade-up">
              <h2 className="text-4xl font-bold modern-gradient">
                Plant Collection
              </h2>
              <p className={`text-lg max-w-2xl mx-auto leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Manage your digital garden with powerful search, sorting, and export capabilities.
              </p>
            </div>
            <div className="animate-fade-up delay-100">
              <PlantList />
            </div>
          </div>
        );
      
      case 'analytics':
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4 animate-fade-up">
              <h2 className="text-4xl font-bold modern-gradient">
                Farm Analytics
              </h2>
              <p className={`text-lg max-w-2xl mx-auto leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Gain insights into your farming patterns with detailed analytics and trends.
              </p>
            </div>
            <div className="animate-fade-up delay-100">
              <Analytics />
            </div>
          </div>
        );
      
      case 'settings':
        return (
          <div className="animate-fade-up">
            <Settings />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ease-in-out ${
      getViewBackground()
    }`}>
      <Navigation />
      <main className={`max-w-7xl mx-auto px-4 lg:px-6 py-6 lg:py-12 transition-all duration-300 ${
        isTransitioning ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
      }`}>
        {renderContent()}
      </main>
      <Toast />
      <CursorFollower />
      
      {/* Dynamic background elements based on view */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        {currentView === 'upload' && (
          <>
            <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse ${
              isDarkMode ? 'bg-emerald-500/20' : 'bg-emerald-300/40'
            }`}></div>
            <div className={`absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse delay-1000 ${
              isDarkMode ? 'bg-green-500/20' : 'bg-green-300/40'
            }`}></div>
          </>
        )}
        {currentView === 'map' && (
          <>
            <div className={`absolute top-1/3 right-1/3 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse ${
              isDarkMode ? 'bg-blue-500/20' : 'bg-blue-300/40'
            }`}></div>
            <div className={`absolute bottom-1/3 left-1/3 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse delay-1000 ${
              isDarkMode ? 'bg-cyan-500/20' : 'bg-cyan-300/40'
            }`}></div>
          </>
        )}
        {currentView === 'list' && (
          <>
            <div className={`absolute top-1/4 right-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse ${
              isDarkMode ? 'bg-rose-500/20' : 'bg-rose-300/40'
            }`}></div>
            <div className={`absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse delay-1000 ${
              isDarkMode ? 'bg-pink-500/20' : 'bg-pink-300/40'
            }`}></div>
          </>
        )}
        {currentView === 'analytics' && (
          <>
            <div className={`absolute top-1/3 left-1/3 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse ${
              isDarkMode ? 'bg-purple-500/20' : 'bg-purple-300/40'
            }`}></div>
            <div className={`absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse delay-1000 ${
              isDarkMode ? 'bg-indigo-500/20' : 'bg-indigo-300/40'
            }`}></div>
          </>
        )}
        {currentView === 'settings' && (
          <>
            <div className={`absolute top-1/4 left-1/3 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse ${
              isDarkMode ? 'bg-violet-500/20' : 'bg-violet-300/40'
            }`}></div>
            <div className={`absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse delay-1000 ${
              isDarkMode ? 'bg-fuchsia-500/20' : 'bg-fuchsia-300/40'
            }`}></div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;