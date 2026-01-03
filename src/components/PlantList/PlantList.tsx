import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setSearchTerm, setSortBy, setSortOrder, removePlant } from '../../store/plantSlice';
import { addToast } from '../../store/uiSlice';
import { Search, SortAsc, SortDesc, Trash2, Download } from 'lucide-react';
import { format } from 'date-fns';
import { exportToCSV, exportToJSON } from '../../utils/storage';

const PlantList: React.FC = () => {
  const dispatch = useDispatch();
  const { filteredPlants, searchTerm, sortBy, sortOrder } = useSelector((state: RootState) => state.plants);
  const isDarkMode = useSelector((state: RootState) => state.ui.isDarkMode);

  const handleDelete = (plantId: string, plantName: string) => {
    if (window.confirm(`Are you sure you want to delete ${plantName}?`)) {
      dispatch(removePlant(plantId));
      dispatch(addToast({
        message: `Deleted ${plantName}`,
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
      message: `Exported ${filteredPlants.length} plants as ${format.toUpperCase()}`,
      type: 'success',
    }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Search and Controls */}
      <div className="mb-6 space-y-4 animate-fade-in">
        <div className="relative">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-400'
          }`} />
          <input
            type="text"
            placeholder="Search plants..."
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            className={`w-full pl-10 pr-4 py-3 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-transparent transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-600' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:bg-gray-50'
            }`}
          />
        </div>
        
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => dispatch(setSortBy(e.target.value as 'date' | 'location'))}
              className={`px-4 py-3 rounded-xl focus:ring-4 focus:ring-blue-200 transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="date">Sort by Date</option>
              <option value="location">Sort by Location</option>
            </select>
            
            <button
              onClick={() => dispatch(setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'))}
              className={`p-3 rounded-xl focus:ring-4 focus:ring-blue-200 transition-all duration-300 transform hover:scale-105 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' 
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
            </button>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => handleExport('csv')}
              className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 focus:ring-4 focus:ring-green-200 transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
            >
              <Download className="w-4 h-4" />
              <span>CSV</span>
            </button>
            <button
              onClick={() => handleExport('json')}
              className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl hover:from-blue-600 hover:to-cyan-700 focus:ring-4 focus:ring-blue-200 transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
            >
              <Download className="w-4 h-4" />
              <span>JSON</span>
            </button>
          </div>
        </div>
      </div>

      {/* Plant Grid */}
      {filteredPlants.length === 0 ? (
        <div className={`text-center py-12 animate-fade-in ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <p>No plants found. Upload some images to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlants.map((plant, index) => (
            <div 
              key={plant.id} 
              className={`card overflow-hidden animate-scale-in hover:scale-105 transition-all duration-300 ${
                isDarkMode ? 'bg-gray-800/90 hover:bg-gray-700/90' : 'hover:shadow-2xl'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={plant.imageUrl}
                  alt={plant.imageName}
                  className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-4">
                <h3 className={`font-medium mb-2 truncate transition-colors duration-200 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>{plant.imageName}</h3>
                <div className={`space-y-1 text-sm transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <p>Lat: {plant.latitude.toFixed(6)}</p>
                  <p>Lng: {plant.longitude.toFixed(6)}</p>
                  <p>{format(new Date(plant.uploadedAt), 'MMM dd, yyyy HH:mm')}</p>
                </div>
                <button
                  onClick={() => handleDelete(plant.id, plant.imageName)}
                  className="mt-3 flex items-center space-x-2 text-red-500 hover:text-red-600 focus:outline-none transition-all duration-200 transform hover:scale-105"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlantList;