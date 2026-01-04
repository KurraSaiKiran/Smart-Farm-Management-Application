import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image, Camera, MapPin, Zap } from 'lucide-react';
import { usePlantUpload } from '../../hooks/usePlantUpload';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const ImageUpload: React.FC = () => {
  const { uploadPlant } = usePlantUpload();
  const { isDarkMode } = useSelector((state: RootState) => state.ui);

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
    <div className="w-full max-w-4xl mx-auto relative">
      {/* Attractive Transparent Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-green-400/5 to-teal-500/10 rounded-3xl backdrop-blur-sm"></div>
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-16 left-16 w-24 h-24 rounded-full opacity-10 animate-bounce ${isDarkMode ? 'bg-gradient-to-r from-green-400 to-emerald-400' : 'bg-gradient-to-r from-green-300 to-emerald-300'}`}></div>
        <div className={`absolute top-32 right-32 w-20 h-20 rounded-full opacity-10 animate-pulse ${isDarkMode ? 'bg-gradient-to-r from-blue-400 to-cyan-400' : 'bg-gradient-to-r from-blue-300 to-cyan-300'}`}></div>
        <div className={`absolute bottom-32 left-32 w-16 h-16 rounded-full opacity-10 animate-spin ${isDarkMode ? 'bg-gradient-to-r from-purple-400 to-pink-400' : 'bg-gradient-to-r from-purple-300 to-pink-300'}`} style={{animationDuration: '8s'}}></div>
        <div className={`absolute bottom-16 right-16 w-28 h-28 rounded-full opacity-10 animate-ping ${isDarkMode ? 'bg-gradient-to-r from-orange-400 to-red-400' : 'bg-gradient-to-r from-orange-300 to-red-300'}`}></div>
        
        {/* Moving Icons */}
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="p-3 bg-green-500/20 rounded-full">
            <Upload className="w-6 h-6 text-green-500 animate-pulse" />
          </div>
        </div>
        <div className="absolute bottom-20 right-20 animate-float">
          <div className="p-3 bg-blue-500/20 rounded-full">
            <Camera className="w-6 h-6 text-blue-500" />
          </div>
        </div>
        <div className="absolute top-1/2 left-10 transform -translate-y-1/2 animate-sway">
          <div className="p-3 bg-purple-500/20 rounded-full">
            <MapPin className="w-6 h-6 text-purple-500" />
          </div>
        </div>
        
        {/* Additional moving elements */}
        <div className="absolute top-1/3 right-10 animate-float delay-500">
          <div className="p-2 bg-yellow-500/20 rounded-full animate-pulse">
            <Zap className="w-5 h-5 text-yellow-500" />
          </div>
        </div>
        <div className="absolute bottom-1/3 left-1/4 animate-bounce delay-700">
          <div className="p-2 bg-emerald-500/20 rounded-full">
            <Image className="w-5 h-5 text-emerald-500 animate-spin" style={{animationDuration: '6s'}} />
          </div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute top-12 left-1/3 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-60"></div>
        <div className="absolute top-1/4 right-1/3 w-3 h-3 bg-blue-400 rounded-full animate-bounce opacity-40 delay-300"></div>
        <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-purple-400 rounded-full animate-pulse opacity-50 delay-500"></div>
        <div className="absolute bottom-12 right-1/4 w-3 h-3 bg-pink-400 rounded-full animate-ping opacity-30 delay-700"></div>
        
        {/* Animated lines */}
        <div className="absolute top-0 left-1/4 w-px h-20 bg-gradient-to-b from-transparent via-green-300 to-transparent animate-pulse opacity-30"></div>
        <div className="absolute bottom-0 right-1/3 w-px h-16 bg-gradient-to-t from-transparent via-blue-300 to-transparent animate-pulse opacity-20 delay-1000"></div>
      </div>
      
      <div className="relative z-10">
        <div
          {...getRootProps()}
          className={`group relative border-2 border-dashed rounded-3xl p-16 text-center cursor-pointer transition-all duration-500 overflow-hidden backdrop-blur-sm ${
            isDragActive 
              ? 'border-green-400 bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 scale-[1.02] shadow-2xl' 
              : `border-gray-300 hover:border-green-400 card hover:scale-[1.01] ${isDarkMode ? 'hover:bg-gray-800/50 bg-gray-800/30' : 'hover:bg-gradient-to-br hover:from-green-50/30 hover:to-blue-50/30 bg-white/70'}`
          }`}
        >
        <input {...getInputProps()} />
        
        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center space-y-8">
          {/* Icon with gradient background */}
          <div className={`relative p-8 rounded-full transition-all duration-500 group-hover:scale-110 ${
            isDragActive 
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-2xl' 
              : `bg-gradient-to-r from-green-100 to-emerald-100 text-green-600 ${isDarkMode ? 'from-green-900/30 to-emerald-900/30 text-green-400' : ''}`
          }`}>
            {isDragActive ? (
              <Upload className="w-16 h-16 animate-bounce" />
            ) : (
              <Camera className="w-16 h-16 group-hover:animate-gentle-bounce" />
            )}
            
            {/* Floating icons */}
            <div className="absolute -top-2 -right-2 p-2 bg-blue-500 rounded-full text-white animate-bounce">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="absolute -bottom-2 -left-2 p-2 bg-purple-500 rounded-full text-white animate-bounce delay-100">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          
          {/* Text content */}
          <div className="space-y-4">
            <h3 className={`text-3xl font-bold modern-gradient ${
              isDragActive ? 'animate-bounce' : ''
            }`}>
              {isDragActive ? '🎯 Drop Your Images!' : '📸 Upload Plant Images'}
            </h3>
            
            <p className={`text-xl max-w-2xl mx-auto leading-relaxed ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {isDragActive 
                ? '✨ Release to start the magic transformation!' 
                : 'Drag & drop your geo-tagged plant photos or click to browse your gallery'
              }
            </p>
            
            {/* Feature badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <span className="px-4 py-2 bg-gradient-to-r from-green-100 to-green-200 text-green-800 rounded-full font-semibold text-sm flex items-center space-x-2 animate-pulse">
                <Image className="w-4 h-4" />
                <span>JPG & PNG</span>
              </span>
              <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 rounded-full font-semibold text-sm flex items-center space-x-2 animate-bounce">
                <Upload className="w-4 h-4" />
                <span>Multiple Files</span>
              </span>
              <span className="px-4 py-2 bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 rounded-full font-semibold text-sm flex items-center space-x-2 animate-pulse delay-300">
                <MapPin className="w-4 h-4" />
                <span>GPS Auto-Extract</span>
              </span>
            </div>
            
            {/* Progress indicator */}
            <div className="mt-6 flex justify-center">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
          
          {/* Call to action */}
          {!isDragActive && (
            <div className="mt-8 relative">
              <button className="btn-primary text-lg px-8 py-4 group-hover:scale-105 transition-transform duration-300 relative overflow-hidden">
                <span className="relative z-10 flex items-center space-x-2">
                  <span>🚀 Choose Files</span>
                  <div className="w-4 h-4 bg-white/20 rounded-full animate-ping"></div>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent animate-pulse"></div>
              </button>
              
              {/* Floating action hints */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 animate-bounce opacity-60">
                ✨ Click or Drop
              </div>
            </div>
          )}
        </div>
        
        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;