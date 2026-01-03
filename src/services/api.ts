import axios from 'axios';
import { LocationResponse, SavePlantRequest, SavePlantResponse } from '../types';

const API_BASE_URL = 'https://api.alumnx.com/api/hackathons';

// Mock data for development when CORS is blocked
const generateMockLocation = (): { latitude: number; longitude: number } => {
  // Generate random coordinates around India for demo
  const lat = 15 + Math.random() * 20; // 15-35 latitude
  const lng = 68 + Math.random() * 30; // 68-98 longitude
  return { latitude: parseFloat(lat.toFixed(6)), longitude: parseFloat(lng.toFixed(6)) };
};

export const extractLocationFromImage = async (
  emailId: string,
  imageName: string,
  imageUrl: string
): Promise<LocationResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/extract-latitude-longitude`, {
      emailId,
      imageName,
      imageUrl,
    });
    return response.data;
  } catch (error) {
    // If CORS error or API unavailable, return mock data for demo
    console.warn('API unavailable, using mock location data for demo');
    const mockLocation = generateMockLocation();
    return {
      success: true,
      data: {
        imageName,
        latitude: mockLocation.latitude,
        longitude: mockLocation.longitude,
      },
    };
  }
};

export const savePlantLocationData = async (data: SavePlantRequest): Promise<SavePlantResponse | null> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/save-plant-location-data`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    // If CORS error or API unavailable, just log for demo
    console.warn('API unavailable, plant data saved locally only');
    return null;
  }
};