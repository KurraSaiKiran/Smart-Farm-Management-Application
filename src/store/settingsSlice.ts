import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Profile {
  name: string;
  email: string;
  farmName: string;
  location: string;
}

interface Preferences {
  defaultMapZoom: number;
  units: 'metric' | 'imperial';
  exportFormat: 'csv' | 'json';
  notifications: boolean;
}

interface SettingsState {
  profile: Profile;
  preferences: Preferences;
}

const initialState: SettingsState = {
  profile: {
    name: '',
    email: 'farmer@gmail.com',
    farmName: '',
    location: ''
  },
  preferences: {
    defaultMapZoom: 13,
    units: 'metric',
    exportFormat: 'csv',
    notifications: true
  }
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateSettings: (state, action: PayloadAction<{ profile: Profile; preferences: Preferences }>) => {
      state.profile = action.payload.profile;
      state.preferences = action.payload.preferences;
    },
    updateProfile: (state, action: PayloadAction<Partial<Profile>>) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    updatePreferences: (state, action: PayloadAction<Partial<Preferences>>) => {
      state.preferences = { ...state.preferences, ...action.payload };
    }
  }
});

export const { updateSettings, updateProfile, updatePreferences } = settingsSlice.actions;
export default settingsSlice.reducer;