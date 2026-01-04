import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addUpload, updateUpload, removeUpload } from '../store/uploadSlice';
import { addPlant } from '../store/plantSlice';
import { addToast } from '../store/uiSlice';
import { uploadToCloudinary } from '../services/cloudinary';
import { extractLocationFromImage, savePlantLocationData } from '../services/api';
import { generateId } from '../utils/storage';
import { Plant } from '../types';

const USER_EMAIL = 'farmer@gmail.com'; // Replace with actual user email

export const usePlantUpload = () => {
  const dispatch = useDispatch();

  const uploadPlant = useCallback(async (file: File) => {
    const uploadId = generateId();
    
    // Initialize upload progress with storytelling
    dispatch(addUpload({
      id: uploadId,
      progress: 0,
      status: 'uploading',
      message: 'Plant photo received 🌱'
    }));

    dispatch(addToast({
      message: `📸 Plant photo received! Processing ${file.name}...`,
      type: 'info',
    }));

    try {
      // Phase 1: Upload to Cloudinary
      const cloudinaryResponse = await uploadToCloudinary(file, (progress) => {
        dispatch(updateUpload({ 
          id: uploadId, 
          progress,
          message: progress < 50 ? 'Preparing your plant photo...' : 'Almost ready to find its home...'
        }));
      });

      dispatch(updateUpload({ 
        id: uploadId, 
        status: 'extracting',
        progress: 100,
        message: 'Finding where this plant lives... 🗺️'
      }));

      dispatch(addToast({
        message: '🔍 Finding where this plant lives on your farm...',
        type: 'info',
      }));

      // Phase 2: Extract location data
      const locationResponse = await extractLocationFromImage(
        USER_EMAIL,
        cloudinaryResponse.original_filename || file.name,
        cloudinaryResponse.secure_url
      );

      if (!locationResponse.success) {
        throw new Error('Could not find this plant\'s location');
      }

      dispatch(updateUpload({ 
        id: uploadId, 
        status: 'saving',
        message: 'Adding plant to your farm map... 🌾'
      }));

      // Phase 3: Save plant data
      const plantData = {
        emailId: USER_EMAIL,
        imageName: locationResponse.data.imageName,
        imageUrl: cloudinaryResponse.secure_url,
        latitude: locationResponse.data.latitude,
        longitude: locationResponse.data.longitude,
      };

      await savePlantLocationData(plantData);

      // Add to Redux store
      const plant: Plant = {
        id: generateId(),
        imageName: plantData.imageName,
        imageUrl: plantData.imageUrl,
        latitude: plantData.latitude,
        longitude: plantData.longitude,
        uploadedAt: new Date().toISOString(),
      };

      dispatch(addPlant(plant));
      dispatch(updateUpload({ 
        id: uploadId, 
        status: 'completed',
        message: 'Plant added to your farm! 🎉'
      }));

      dispatch(addToast({
        message: `🌱 ${plant.imageName} has found its place on your farm map!`,
        type: 'success',
      }));

      // Remove upload progress after delay
      setTimeout(() => {
        dispatch(removeUpload(uploadId));
      }, 3000);

    } catch (error) {
      dispatch(updateUpload({ 
        id: uploadId, 
        status: 'error',
        error: error instanceof Error ? error.message : 'Something went wrong',
        message: 'Oops! This plant got lost... 😔'
      }));

      dispatch(addToast({
        message: `😔 ${file.name} couldn't find its way to your farm. Please try again.`,
        type: 'error',
      }));
    }
  }, [dispatch]);

  return { uploadPlant };
};