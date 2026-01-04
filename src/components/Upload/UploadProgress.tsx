import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { CheckCircle, XCircle, Loader, Sparkles } from 'lucide-react';

const UploadProgress: React.FC = () => {
  const uploads = useSelector((state: RootState) => state.upload.uploads);
  const isDarkMode = useSelector((state: RootState) => state.ui.isDarkMode);

  if (uploads.length === 0) return null;

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 space-y-4">
      <div className="flex items-center justify-center space-x-2 mb-6">
        <Sparkles className="w-5 h-5 text-green-500" />
        <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
          Your Plants Are Finding Their Way Home
        </h3>
        <Sparkles className="w-5 h-5 text-blue-500" />
      </div>
      
      {uploads.map((upload) => {
        const getStatusColor = () => {
          switch (upload.status) {
            case 'completed': return 'from-green-500 to-emerald-600';
            case 'error': return 'from-red-500 to-pink-600';
            default: return 'from-blue-500 to-purple-600';
          }
        };

        return (
          <div key={upload.id} className={`card p-6 border-l-4 border-l-green-400 ${isDarkMode ? 'bg-gray-800' : ''}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full bg-gradient-to-r ${getStatusColor()}`}>
                  {upload.status === 'completed' && (
                    <CheckCircle className="w-5 h-5 text-white" />
                  )}
                  {upload.status === 'error' && (
                    <XCircle className="w-5 h-5 text-white" />
                  )}
                  {['uploading', 'extracting', 'saving'].includes(upload.status) && (
                    <Loader className="w-5 h-5 text-white animate-spin" />
                  )}
                </div>
                <div>
                  <p className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    {upload.message || 'Processing your plant...'}
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {upload.status === 'uploading' && 'Preparing your plant photo'}
                    {upload.status === 'extracting' && 'Discovering its location'}
                    {upload.status === 'saving' && 'Welcoming it to your farm'}
                    {upload.status === 'completed' && 'Ready to explore on your map!'}
                    {upload.status === 'error' && 'Something went wrong'}
                  </p>
                </div>
              </div>
            </div>
            
            {upload.status === 'uploading' && (
              <div className="space-y-2">
                <div className={`flex justify-between text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span>Journey Progress</span>
                  <span>{upload.progress}%</span>
                </div>
                <div className={`w-full rounded-full h-3 overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <div 
                    className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${upload.progress}%` }}
                  />
                </div>
              </div>
            )}
            
            {upload.status === 'error' && upload.error && (
              <div className={`mt-3 p-3 rounded-lg border ${isDarkMode ? 'bg-red-900/20 border-red-700' : 'bg-red-50 border-red-200'}`}>
                <p className={`text-sm font-medium ${isDarkMode ? 'text-red-300' : 'text-red-700'}`}>
                  {upload.error}
                </p>
              </div>
            )}
            
            {upload.status === 'completed' && (
              <div className={`mt-3 p-3 rounded-lg border ${isDarkMode ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'}`}>
                <p className={`text-sm font-medium ${isDarkMode ? 'text-green-300' : 'text-green-700'}`}>
                  🎉 Your plant has found its place on the farm!
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default UploadProgress;