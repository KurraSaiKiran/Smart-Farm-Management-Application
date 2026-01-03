import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { loadPlantsFromStorage } from '../store/plantSlice';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/storage';

export const useLocalStorage = () => {
  const dispatch = useDispatch();
  const plants = useSelector((state: RootState) => state.plants.plants);

  // Load plants from localStorage on mount
  useEffect(() => {
    const storedPlants = loadFromLocalStorage();
    if (storedPlants.length > 0) {
      dispatch(loadPlantsFromStorage(storedPlants));
    }
  }, [dispatch]);

  // Save plants to localStorage whenever plants change
  useEffect(() => {
    if (plants.length > 0) {
      saveToLocalStorage(plants);
    }
  }, [plants]);
};