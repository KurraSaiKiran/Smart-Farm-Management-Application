import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image, Sparkles } from 'lucide-react';
import { usePlantUpload } from '../../hooks/usePlantUpload';

const ImageUpload: React.FC = () => {
  const { uploadPlant } = usePlantUpload();

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      uploadPlant(file);
    });
  }, [uploadPlant]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    multiple: true
  });

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all duration-300 overflow-hidden ${
          isDragActive 
            ? 'border-green-400 bg-gradient-to-br from-green-50 to-blue-50 scale-105' 
            : 'border-gray-300 hover:border-green-400 card hover:scale-102'
        }`}
      >
        <input {...getInputProps()} />
        
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 left-4 w-8 h-8 bg-green-400 rounded-full"></div>
          <div className="absolute top-8 right-8 w-6 h-6 bg-blue-400 rounded-full"></div>
          <div className="absolute bottom-6 left-8 w-4 h-4 bg-purple-400 rounded-full"></div>
          <div className="absolute bottom-4 right-6 w-10 h-10 bg-yellow-400 rounded-full"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center space-y-6">
          <div className={`p-6 rounded-full transition-all duration-300 ${
            isDragActive 
              ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white scale-110' 
              : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-500'
          }`}>
            {isDragActive ? (
              <Upload className="w-12 h-12" />
            ) : (
              <Image className="w-12 h-12" />
            )}
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-center space-x-2">
              <Sparkles className="w-5 h-5 text-green-500" />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                {isDragActive ? 'Drop your images here!' : 'Upload Plant Images'}
              </h3>
              <Sparkles className="w-5 h-5 text-blue-500" />
            </div>
            
            <p className="text-gray-600 text-lg max-w-md mx-auto leading-relaxed">
              {isDragActive 
                ? 'Release to start the magic ✨' 
                : 'Drag & drop your geo-tagged plant photos or click to browse'
              }
            </p>
            
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">JPG</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">PNG</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">Multiple Files</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;