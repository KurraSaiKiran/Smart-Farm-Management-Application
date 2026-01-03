import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UploadProgress } from '../types';

interface UploadState {
  uploads: UploadProgress[];
}

const initialState: UploadState = {
  uploads: [],
};

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    addUpload: (state, action: PayloadAction<UploadProgress>) => {
      state.uploads.push(action.payload);
    },
    updateUpload: (state, action: PayloadAction<Partial<UploadProgress> & { id: string }>) => {
      const index = state.uploads.findIndex(upload => upload.id === action.payload.id);
      if (index !== -1) {
        state.uploads[index] = { ...state.uploads[index], ...action.payload };
      }
    },
    removeUpload: (state, action: PayloadAction<string>) => {
      state.uploads = state.uploads.filter(upload => upload.id !== action.payload);
    },
    clearCompletedUploads: (state) => {
      state.uploads = state.uploads.filter(upload => upload.status !== 'completed');
    },
  },
});

export const { addUpload, updateUpload, removeUpload, clearCompletedUploads } = uploadSlice.actions;
export default uploadSlice.reducer;