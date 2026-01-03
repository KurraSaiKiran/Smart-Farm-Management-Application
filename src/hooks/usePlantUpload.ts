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
    
    // Initialize upload progress
    dispatch(addUpload({
      id: uploadId,
      progress: 0,
      status: 'uploading',
    }));

    try {
      // Phase 1: Upload to Cloudinary
      const cloudinaryResponse = await uploadToCloudinary(file, (progress) => {
        dispatch(updateUpload({ id: uploadId, progress }));
      });

      dispatch(updateUpload({ 
        id: uploadId, 
        status: 'extracting',
        progress: 100 
      }));

      // Phase 2: Extract location data
      const locationResponse = await extractLocationFromImage(
        USER_EMAIL,
        cloudinaryResponse.original_filename || file.name,
        cloudinaryResponse.secure_url
      );

      if (!locationResponse.success) {
        throw new Error('Failed to extract location data');
      }

      dispatch(updateUpload({ 
        id: uploadId, 
        status: 'saving' 
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
        status: 'completed' 
      }));

      dispatch(addToast({
        message: `Successfully uploaded ${plant.imageName}`,
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
        error: error instanceof Error ? error.message : 'Upload failed'
      }));

      dispatch(addToast({
        message: `Failed to upload ${file.name}: ${error instanceof Error ? error.message : 'Unknown error'}`,
        type: 'error',
      }));
    }
  }, [dispatch]);

  return { uploadPlant };
};