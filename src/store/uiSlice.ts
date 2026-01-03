import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface UIState {
  isLoading: boolean;
  toasts: Toast[];
  activeView: 'upload' | 'map' | 'list' | 'analytics' | 'settings';
  isDarkMode: boolean;
}

const initialState: UIState = {
  isLoading: false,
  toasts: [],
  activeView: 'upload',
  isDarkMode: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addToast: (state, action: PayloadAction<Omit<Toast, 'id'>>) => {
      const toast: Toast = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.toasts.push(toast);
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter(toast => toast.id !== action.payload);
    },
    setActiveView: (state, action: PayloadAction<'upload' | 'map' | 'list' | 'analytics' | 'settings'>) => {
      state.activeView = action.payload;
    },
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { setLoading, addToast, removeToast, setActiveView, toggleDarkMode } = uiSlice.actions;
export default uiSlice.reducer;