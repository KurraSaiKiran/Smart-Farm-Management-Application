import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { updateSettings } from '../../store/settingsSlice';
import { addToast } from '../../store/uiSlice';
import { User, Settings as SettingsIcon, Save, MapPin, Bell } from 'lucide-react';

const Settings: React.FC = () => {
  const dispatch = useDispatch();
  const { isDarkMode } = useSelector((state: RootState) => state.ui);
  const settings = useSelector((state: RootState) => state.settings);
  
  const [formData, setFormData] = useState({
    name: settings.profile.name,
    email: settings.profile.email,
    farmName: settings.profile.farmName,
    location: settings.profile.location,
    defaultMapZoom: settings.preferences.defaultMapZoom,
    units: settings.preferences.units,
    exportFormat: settings.preferences.exportFormat,
    notifications: settings.preferences.notifications
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSave = () => {
    dispatch(updateSettings({
      profile: {
        name: formData.name,
        email: formData.email,
        farmName: formData.farmName,
        location: formData.location
      },
      preferences: {
        defaultMapZoom: formData.defaultMapZoom,
        units: formData.units,
        exportFormat: formData.exportFormat,
        notifications: formData.notifications
      }
    }));
    
    dispatch(addToast({
      message: 'Settings saved successfully!',
      type: 'success'
    }));
  };

  return (
    <div className={`min-h-screen p-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-green-50 to-blue-50'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
            <SettingsIcon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Settings & Profile
            </h1>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Manage your account and preferences
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Settings */}
          <div className={`glass-effect rounded-2xl p-6 ${isDarkMode ? 'bg-gray-800/50' : 'bg-white/70'}`}>
            <div className="flex items-center space-x-3 mb-6">
              <User className="w-6 h-6 text-purple-600" />
              <h2 className="text-xl font-semibold">Profile Information</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500' 
                      : 'bg-white border-gray-300 focus:border-purple-500'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500' 
                      : 'bg-white border-gray-300 focus:border-purple-500'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Farm Name
                </label>
                <input
                  type="text"
                  name="farmName"
                  value={formData.farmName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500' 
                      : 'bg-white border-gray-300 focus:border-purple-500'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                  placeholder="Enter your farm name"
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Farm Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500' 
                      : 'bg-white border-gray-300 focus:border-purple-500'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                  placeholder="Enter farm location"
                />
              </div>
            </div>
          </div>

          {/* App Preferences */}
          <div className={`glass-effect rounded-2xl p-6 ${isDarkMode ? 'bg-gray-800/50' : 'bg-white/70'}`}>
            <div className="flex items-center space-x-3 mb-6">
              <MapPin className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold">App Preferences</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Default Map Zoom
                </label>
                <select
                  name="defaultMapZoom"
                  value={formData.defaultMapZoom}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                      : 'bg-white border-gray-300 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                >
                  <option value={10}>10 - Country View</option>
                  <option value={13}>13 - City View</option>
                  <option value={15}>15 - District View</option>
                  <option value={18}>18 - Close View</option>
                </select>
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Measurement Units
                </label>
                <select
                  name="units"
                  value={formData.units}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                      : 'bg-white border-gray-300 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                >
                  <option value="metric">Metric (km, m)</option>
                  <option value="imperial">Imperial (miles, ft)</option>
                </select>
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Default Export Format
                </label>
                <select
                  name="exportFormat"
                  value={formData.exportFormat}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                      : 'bg-white border-gray-300 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                >
                  <option value="csv">CSV</option>
                  <option value="json">JSON</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="notifications"
                  checked={formData.notifications}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <div className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-blue-600" />
                  <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Enable Notifications
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleSave}
            className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Save className="w-5 h-5" />
            <span className="font-semibold">Save Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;