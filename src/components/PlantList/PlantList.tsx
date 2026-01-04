import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setSearchTerm, setSortBy, setSortOrder, removePlant, deleteAllPlants } from '../../store/plantSlice';
import { addToast, setActiveView } from '../../store/uiSlice';
import { Search, SortAsc, SortDesc, Trash2, Download, MapPin, Calendar, Eye, Filter } from 'lucide-react';
import { format } from 'date-fns';
import { exportToCSV, exportToJSON } from '../../utils/storage';

const PlantList: React.FC = () => {
  const dispatch = useDispatch();
  const { filteredPlants, searchTerm, sortBy, sortOrder } = useSelector((state: RootState) => state.plants);
  const isDarkMode = useSelector((state: RootState) => state.ui.isDarkMode);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedPlant, setSelectedPlant] = useState<string | null>(null);

  const handleDelete = (plantId: string, plantName: string) => {
    if (window.confirm(`Are you sure you want to delete ${plantName}?`)) {
      dispatch(removePlant(plantId));
      dispatch(addToast({
        message: `🗑️ Deleted ${plantName}`,
        type: 'success',
      }));
    }
  };

  const handleExport = (format: 'csv' | 'json') => {
    if (filteredPlants.length === 0) {
      dispatch(addToast({
        message: 'No plants to export',
        type: 'info',
      }));
      return;
    }

    if (format === 'csv') {
      exportToCSV(filteredPlants);
    } else {
      exportToJSON(filteredPlants);
    }

    dispatch(addToast({
      message: `📊 Exported ${filteredPlants.length} plants as ${format.toUpperCase()}`,
      type: 'success',
    }));
  };

  const handleDeleteAll = () => {
    if (window.confirm(`Are you sure you want to delete all ${filteredPlants.length} plants? This action cannot be undone.`)) {
      dispatch(deleteAllPlants());
      dispatch(addToast({
        message: '🗑️ All plants deleted successfully',
        type: 'success',
      }));
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto relative">
      {/* Attractive Transparent Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-500/8 via-pink-400/6 to-orange-500/8 rounded-3xl backdrop-blur-sm"></div>
      
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2310b981' fill-opacity='0.08' fill-rule='evenodd'%3E%3Cpath d='M60 60c16.569 0 30-13.431 30-30S76.569 0 60 0 30 13.431 30 30s13.431 30 30 30zm0 30c16.569 0 30-13.431 30-30S76.569 60 60 60 30 73.431 30 90s13.431 30 30 30z'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-10 left-10 w-20 h-20 rounded-full opacity-10 animate-gentle-bounce ${isDarkMode ? 'bg-green-400' : 'bg-green-300'}`}></div>
        <div className={`absolute top-20 right-20 w-16 h-16 rounded-full opacity-10 animate-gentle-bounce delay-100 ${isDarkMode ? 'bg-blue-400' : 'bg-blue-300'}`}></div>
        <div className={`absolute bottom-20 left-20 w-12 h-12 rounded-full opacity-10 animate-gentle-bounce delay-200 ${isDarkMode ? 'bg-purple-400' : 'bg-purple-300'}`}></div>
        <div className={`absolute bottom-10 right-10 w-24 h-24 rounded-full opacity-10 animate-gentle-bounce delay-300 ${isDarkMode ? 'bg-emerald-400' : 'bg-emerald-300'}`}></div>
      </div>
      
      <div className="relative z-10">
        {/* Enhanced Header */}
        <div className="mb-8 space-y-6 animate-fade-up">
          {/* Search Bar */}
          <div className="relative group">
            <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-all duration-300 group-focus-within:text-green-500 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-400'
            }`} />
            <input
              type="text"
              placeholder="🔍 Search your plant collection..."
              value={searchTerm}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              className={`w-full pl-12 pr-6 py-4 rounded-2xl border-2 focus:ring-4 focus:ring-green-200 focus:border-green-400 transition-all duration-300 text-lg ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-700' 
                  : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:bg-green-50/50'
              }`}
            />
          </div>
          
          {/* Controls Row */}
          <div className="flex flex-wrap gap-4 items-center justify-between">
            {/* Left Controls */}
            <div className="flex items-center space-x-4">
              {/* Sort Controls */}
              <div className="flex items-center space-x-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-xl">
                <select
                  value={sortBy}
                  onChange={(e) => dispatch(setSortBy(e.target.value as 'date' | 'location'))}
                  className={`px-4 py-2 rounded-lg border-0 focus:ring-2 focus:ring-green-400 transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-gray-600 text-white' 
                      : 'bg-white text-gray-900'
                  }`}
                >
                  <option value="date">📅 By Date</option>
                  <option value="location">📍 By Location</option>
                </select>
                
                <button
                  onClick={() => dispatch(setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'))}
                  className={`p-2 rounded-lg transition-all duration-300 transform hover:scale-110 ${
                    isDarkMode 
                      ? 'bg-gray-600 text-white hover:bg-gray-500' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                </button>
              </div>
              
              {/* View Mode Toggle */}
              <div className="flex items-center space-x-1 p-1 bg-gray-100 dark:bg-gray-700 rounded-xl">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    viewMode === 'grid'
                      ? 'bg-green-500 text-white shadow-lg'
                      : isDarkMode ? 'text-gray-400 hover:text-white hover:bg-gray-600' : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                  }`}
                >
                  <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                  </div>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    viewMode === 'list'
                      ? 'bg-green-500 text-white shadow-lg'
                      : isDarkMode ? 'text-gray-400 hover:text-white hover:bg-gray-600' : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                  }`}
                >
                  <div className="w-4 h-4 flex flex-col space-y-1">
                    <div className="bg-current h-0.5 rounded"></div>
                    <div className="bg-current h-0.5 rounded"></div>
                    <div className="bg-current h-0.5 rounded"></div>
                  </div>
                </button>
              </div>
            </div>
            
            {/* Export Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={() => handleExport('csv')}
                className="feature-card flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 focus:ring-4 focus:ring-green-200 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Download className="w-4 h-4" />
                <span className="font-semibold">📊 CSV</span>
              </button>
              <button
                onClick={() => handleExport('json')}
                className="feature-card flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl hover:from-blue-600 hover:to-cyan-700 focus:ring-4 focus:ring-blue-200 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Download className="w-4 h-4" />
                <span className="font-semibold">🔧 JSON</span>
              </button>
              <button
                onClick={handleDeleteAll}
                disabled={filteredPlants.length === 0}
                className="feature-card flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 focus:ring-4 focus:ring-red-200 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Trash2 className="w-4 h-4" />
                <span className="font-semibold">🗑️ Delete All</span>
              </button>
            </div>
          </div>
          
          {/* Stats Bar */}
          <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-gradient-to-r from-green-50 to-blue-50 border-green-200'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-green-500 rounded-lg">
                    <Eye className="w-4 h-4 text-white" />
                  </div>
                  <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {filteredPlants.length} Plants Found
                  </span>
                </div>
                {searchTerm && (
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-blue-500" />
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Filtered by: "{searchTerm}"
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Plant Display */}
        {filteredPlants.length === 0 ? (
          <div className={`text-center py-16 animate-fade-up ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <div className="mb-4">
              <div className="w-24 h-24 mx-auto bg-gradient-to-r from-green-100 to-blue-100 rounded-full flex items-center justify-center">
                <Search className="w-12 h-12 text-green-500" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {searchTerm ? 'No plants match your search' : 'Your farm is empty right now'}
            </h3>
            <p className="mb-6">
              {searchTerm 
                ? `Try adjusting your search term "${searchTerm}" or browse all plants.` 
                : 'Upload your first plant image to start mapping your land and building your digital farm collection.'
              }
            </p>
            {!searchTerm && (
              <button 
                onClick={() => dispatch(setActiveView('upload'))}
                className="btn-primary"
              >
                🌱 Start Your Farm Journey
              </button>
            )}
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
            {filteredPlants.map((plant, index) => (
              viewMode === 'grid' ? (
                <div 
                  key={plant.id} 
                  className={`group feature-card card overflow-hidden animate-fade-up hover:scale-105 transition-all duration-500 cursor-pointer ${
                    isDarkMode ? 'bg-gray-800/90 hover:bg-gray-700/90' : 'hover:shadow-2xl'
                  } ${selectedPlant === plant.id ? 'ring-4 ring-green-400' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setSelectedPlant(selectedPlant === plant.id ? null : plant.id)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={plant.imageUrl}
                      alt={plant.imageName}
                      className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-3 right-3 p-2 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <MapPin className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className={`font-semibold mb-3 truncate transition-colors duration-200 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>{plant.imageName}</h3>
                    <div className={`space-y-2 text-sm transition-colors duration-200 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-green-500" />
                        <span>{plant.latitude.toFixed(4)}, {plant.longitude.toFixed(4)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-blue-500" />
                        <span>{format(new Date(plant.uploadedAt), 'MMM dd, yyyy')}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(plant.id, plant.imageName);
                        }}
                        className="flex items-center space-x-2 text-red-500 hover:text-red-600 focus:outline-none transition-all duration-200 transform hover:scale-105 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="text-sm font-medium">Delete</span>
                      </button>
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'
                      }`}>
                        📸 Image
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div 
                  key={plant.id}
                  className={`feature-card card p-6 animate-fade-up hover:scale-[1.01] transition-all duration-300 ${
                    isDarkMode ? 'bg-gray-800/90' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-center space-x-6">
                    <img
                      src={plant.imageUrl}
                      alt={plant.imageName}
                      className="w-20 h-20 object-cover rounded-xl shadow-lg"
                    />
                    <div className="flex-1">
                      <h3 className={`font-semibold text-lg mb-2 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>{plant.imageName}</h3>
                      <div className={`flex items-center space-x-6 text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-green-500" />
                          <span>{plant.latitude.toFixed(6)}, {plant.longitude.toFixed(6)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-blue-500" />
                          <span>{format(new Date(plant.uploadedAt), 'MMM dd, yyyy HH:mm')}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(plant.id, plant.imageName)}
                      className="flex items-center space-x-2 text-red-500 hover:text-red-600 focus:outline-none transition-all duration-200 transform hover:scale-105 p-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantList;