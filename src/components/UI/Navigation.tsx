import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setActiveView, toggleDarkMode } from '../../store/uiSlice';
import { Upload, Map, List, Leaf, BarChart3, Moon, Sun, Settings, Menu, X } from 'lucide-react';

const Navigation: React.FC = () => {
  const dispatch = useDispatch();
  const { activeView, isDarkMode } = useSelector((state: RootState) => state.ui);
  const plantCount = useSelector((state: RootState) => state.plants.plants.length);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'upload' as const, label: 'Upload', icon: Upload, color: 'from-green-500 to-emerald-600' },
    { id: 'map' as const, label: 'Farm Map', icon: Map, color: 'from-blue-500 to-cyan-600' },
    { id: 'list' as const, label: `Plants (${plantCount})`, icon: List, color: 'from-purple-500 to-pink-600' },
    { id: 'analytics' as const, label: 'Analytics', icon: BarChart3, color: 'from-orange-500 to-red-600' },
    { id: 'settings' as const, label: 'Settings', icon: Settings, color: 'from-purple-500 to-pink-600' },
  ];

  const handleNavClick = (viewId: typeof activeView) => {
    dispatch(setActiveView(viewId));
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={`glass-effect px-6 py-4 sticky top-0 z-50 hidden lg:block ${
        isDarkMode ? 'bg-gray-900/90 text-white' : 'bg-white/90'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-lg">
                <Leaf className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold modern-gradient">
                  GeoTag Plants
                </h1>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Smart Farm Management</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`nav-button ${isActive ? 'active' : ''} flex items-center space-x-2 px-6 py-3`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              
              <button
                onClick={() => dispatch(toggleDarkMode())}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-yellow-500 text-white hover:bg-yellow-600' 
                    : 'bg-gray-700 text-white hover:bg-gray-800'
                }`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className={`glass-effect px-4 py-3 sticky top-0 z-50 block lg:hidden ${
        isDarkMode ? 'bg-gray-900/90 text-white' : 'bg-white/90'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-lg">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold modern-gradient">
                GeoTag Plants
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => dispatch(toggleDarkMode())}
              className={`p-2 rounded-lg transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-yellow-500 text-white hover:bg-yellow-600' 
                  : 'bg-gray-700 text-white hover:bg-gray-800'
              }`}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition-all duration-300 ${
                isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="block lg:hidden">
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          <div className={`fixed top-0 right-0 h-full w-80 z-50 transform transition-all duration-300 animate-slide-in ${
            isDarkMode ? 'bg-gray-900' : 'bg-white'
          } shadow-2xl`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-lg">
                    <Leaf className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold modern-gradient">
                      Navigation
                    </h2>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-3">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium text-left ${
                        isActive
                          ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                          : `${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                      <span className="text-lg">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;