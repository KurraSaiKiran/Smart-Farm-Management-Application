import { Plant } from '../types';

const STORAGE_KEY = 'geotag-plants';

export const saveToLocalStorage = (plants: Plant[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plants));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

export const loadFromLocalStorage = (): Plant[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return [];
  }
};

export const exportToCSV = (plants: Plant[]): void => {
  const headers = ['Image Name', 'Latitude', 'Longitude', 'Upload Date', 'Image URL'];
  const csvContent = [
    headers.join(','),
    ...plants.map(plant => [
      plant.imageName,
      plant.latitude,
      plant.longitude,
      new Date(plant.uploadedAt).toISOString(),
      plant.imageUrl
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'plant-locations.csv';
  a.click();
  URL.revokeObjectURL(url);
};

export const exportToJSON = (plants: Plant[]): void => {
  const jsonContent = JSON.stringify(plants, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'plant-locations.json';
  a.click();
  URL.revokeObjectURL(url);
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};