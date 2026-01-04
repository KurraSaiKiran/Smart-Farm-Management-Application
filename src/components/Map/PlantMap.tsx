import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { format } from 'date-fns';
import L from 'leaflet';

// Fix for default markers in React Leaflet
const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const PlantMap: React.FC = () => {
  const plants = useSelector((state: RootState) => state.plants.filteredPlants);
  const { isDarkMode } = useSelector((state: RootState) => state.ui);

  // Default center (can be adjusted based on your region)
  const defaultCenter: [number, number] = [20.5937, 78.9629]; // India center
  const defaultZoom = 5;

  // Calculate map center based on plants
  const mapCenter: [number, number] = plants.length > 0 
    ? [
        plants.reduce((sum, plant) => sum + plant.latitude, 0) / plants.length,
        plants.reduce((sum, plant) => sum + plant.longitude, 0) / plants.length
      ]
    : defaultCenter;

  const mapZoom = plants.length > 0 ? 10 : defaultZoom;

  return (
    <div className="relative w-full h-96 rounded-2xl overflow-hidden">
      {/* Attractive Transparent Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-400/8 to-indigo-500/10 rounded-2xl backdrop-blur-sm"></div>
      
      {/* Enhanced Map Container Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800"></div>
      
      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-4 left-4 w-16 h-16 rounded-full opacity-10 animate-gentle-bounce ${isDarkMode ? 'bg-green-400' : 'bg-green-300'}`}></div>
        <div className={`absolute top-4 right-4 w-12 h-12 rounded-full opacity-10 animate-gentle-bounce delay-100 ${isDarkMode ? 'bg-blue-400' : 'bg-blue-300'}`}></div>
        <div className={`absolute bottom-4 left-4 w-10 h-10 rounded-full opacity-10 animate-gentle-bounce delay-200 ${isDarkMode ? 'bg-purple-400' : 'bg-purple-300'}`}></div>
        <div className={`absolute bottom-4 right-4 w-14 h-14 rounded-full opacity-10 animate-gentle-bounce delay-300 ${isDarkMode ? 'bg-emerald-400' : 'bg-emerald-300'}`}></div>
      </div>
      
      <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20">
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {plants.map((plant) => (
          <Marker
            key={plant.id}
            position={[plant.latitude, plant.longitude]}
            icon={customIcon}
          >
            <Popup>
              <div className="p-3 min-w-52 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <img 
                  src={plant.imageUrl} 
                  alt={plant.imageName}
                  className="w-full h-32 object-cover rounded-lg mb-3 shadow-md"
                />
                <h3 className="font-semibold text-base mb-2 text-gray-900 dark:text-white">{plant.imageName}</h3>
                <div className="space-y-1">
                  <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                    📍 {plant.latitude.toFixed(6)}, {plant.longitude.toFixed(6)}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    📅 {format(new Date(plant.uploadedAt), 'MMM dd, yyyy HH:mm')}
                  </p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      </div>
    </div>
  );
};

export default PlantMap;