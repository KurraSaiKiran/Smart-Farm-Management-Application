import { configureStore } from '@reduxjs/toolkit';
import uploadReducer from './uploadSlice';
import plantReducer from './plantSlice';
import uiReducer from './uiSlice';
import settingsReducer from './settingsSlice';

export const store = configureStore({
  reducer: {
    upload: uploadReducer,
    plants: plantReducer,
    ui: uiReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;