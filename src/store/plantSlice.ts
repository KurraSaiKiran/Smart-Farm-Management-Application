import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Plant } from '../types';

interface PlantState {
  plants: Plant[];
  filteredPlants: Plant[];
  searchTerm: string;
  sortBy: 'date' | 'location';
  sortOrder: 'asc' | 'desc';
}

const initialState: PlantState = {
  plants: [],
  filteredPlants: [],
  searchTerm: '',
  sortBy: 'date',
  sortOrder: 'desc',
};

const plantSlice = createSlice({
  name: 'plants',
  initialState,
  reducers: {
    addPlant: (state, action: PayloadAction<Plant>) => {
      state.plants.push(action.payload);
      state.filteredPlants = filterAndSortPlants(state.plants, state.searchTerm, state.sortBy, state.sortOrder);
    },
    removePlant: (state, action: PayloadAction<string>) => {
      state.plants = state.plants.filter(plant => plant.id !== action.payload);
      state.filteredPlants = filterAndSortPlants(state.plants, state.searchTerm, state.sortBy, state.sortOrder);
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.filteredPlants = filterAndSortPlants(state.plants, state.searchTerm, state.sortBy, state.sortOrder);
    },
    setSortBy: (state, action: PayloadAction<'date' | 'location'>) => {
      state.sortBy = action.payload;
      state.filteredPlants = filterAndSortPlants(state.plants, state.searchTerm, state.sortBy, state.sortOrder);
    },
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortOrder = action.payload;
      state.filteredPlants = filterAndSortPlants(state.plants, state.searchTerm, state.sortBy, state.sortOrder);
    },
    loadPlantsFromStorage: (state, action: PayloadAction<Plant[]>) => {
      state.plants = action.payload;
      state.filteredPlants = filterAndSortPlants(state.plants, state.searchTerm, state.sortBy, state.sortOrder);
    },
    deleteAllPlants: (state) => {
      state.plants = [];
      state.filteredPlants = [];
    },
  },
});

function filterAndSortPlants(plants: Plant[], searchTerm: string, sortBy: 'date' | 'location', sortOrder: 'asc' | 'desc'): Plant[] {
  let filtered = plants;
  
  if (searchTerm) {
    filtered = plants.filter(plant => 
      plant.imageName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  return filtered.sort((a, b) => {
    let comparison = 0;
    
    if (sortBy === 'date') {
      comparison = new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime();
    } else {
      comparison = Math.sqrt(a.latitude ** 2 + a.longitude ** 2) - Math.sqrt(b.latitude ** 2 + b.longitude ** 2);
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });
}

export const { addPlant, removePlant, setSearchTerm, setSortBy, setSortOrder, loadPlantsFromStorage, deleteAllPlants } = plantSlice.actions;
export default plantSlice.reducer;