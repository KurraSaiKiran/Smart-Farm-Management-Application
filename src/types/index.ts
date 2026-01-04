export interface Plant {
  id: string;
  imageName: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
  uploadedAt: string;
}

export interface UploadProgress {
  id: string;
  progress: number;
  status: 'uploading' | 'extracting' | 'saving' | 'completed' | 'error';
  error?: string;
  message?: string;
}

export interface CloudinaryResponse {
  public_id: string;
  secure_url: string;
  original_filename: string;
}

export interface LocationResponse {
  success: boolean;
  data: {
    imageName: string;
    latitude: number;
    longitude: number;
  };
}

export interface SavePlantRequest {
  emailId: string;
  imageName: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
}

export interface SavePlantResponse {
  success: boolean;
  message: string;
  isUpdate: boolean;
  data: {
    id: string;
    emailId: string;
    imageName: string;
    imageUrl: string;
    latitude: number;
    longitude: number;
    uploadedAt: string;
    location: {
      type: string;
      coordinates: [number, number];
    };
    createdAt: string;
    updatedAt: string;
  };
}