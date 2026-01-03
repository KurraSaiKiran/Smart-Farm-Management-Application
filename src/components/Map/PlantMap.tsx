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
    <div className="w-full h-96 rounded-lg overflow-hidden border">
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
              <div className="p-2 min-w-48">
                <img 
                  src={plant.imageUrl} 
                  alt={plant.imageName}
                  className="w-full h-32 object-cover rounded mb-2"
                />
                <h3 className="font-medium text-sm mb-1">{plant.imageName}</h3>
                <p className="text-xs text-gray-600 mb-1">
                  Lat: {plant.latitude.toFixed(6)}, Lng: {plant.longitude.toFixed(6)}
                </p>
                <p className="text-xs text-gray-500">
                  {format(new Date(plant.uploadedAt), 'MMM dd, yyyy HH:mm')}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default PlantMap;