import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setActiveView, toggleDarkMode } from '../../store/uiSlice';
import { Upload, Map, List, Leaf, BarChart3, Moon, Sun, Settings } from 'lucide-react';

const Navigation: React.FC = () => {
  const dispatch = useDispatch();
  const { activeView, isDarkMode } = useSelector((state: RootState) => state.ui);
  const plantCount = useSelector((state: RootState) => state.plants.plants.length);

  const navItems = [
    { id: 'upload' as const, label: 'Upload', icon: Upload, color: 'from-green-500 to-emerald-600' },
    { id: 'map' as const, label: 'Farm Map', icon: Map, color: 'from-blue-500 to-cyan-600' },
    { id: 'list' as const, label: `Plants (${plantCount})`, icon: List, color: 'from-purple-500 to-pink-600' },
    { id: 'analytics' as const, label: 'Analytics', icon: BarChart3, color: 'from-orange-500 to-red-600' },
    { id: 'settings' as const, label: 'Settings', icon: Settings, color: 'from-purple-500 to-pink-600' },
  ];

  return (
    <nav className={`glass-effect border-b border-white/20 px-6 py-4 sticky top-0 z-50 ${
      isDarkMode ? 'bg-gray-900/80 text-white' : ''
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
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
                  onClick={() => dispatch(setActiveView(item.id))}
                  className={`relative flex items-center space-x-3 px-6 py-3 rounded-xl transition-all duration-300 font-medium ${
                    isActive
                      ? `bg-gradient-to-r ${item.color} text-white shadow-lg transform scale-105`
                      : `${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700/50' : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'} hover:scale-105`
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl"></div>
                  )}
                </button>
              );
            })}
            
            {/* Dark Mode Toggle */}
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
  );
};

export default Navigation;