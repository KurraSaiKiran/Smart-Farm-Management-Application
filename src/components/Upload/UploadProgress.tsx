import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { CheckCircle, XCircle, Loader, Sparkles } from 'lucide-react';

const UploadProgress: React.FC = () => {
  const uploads = useSelector((state: RootState) => state.upload.uploads);

  if (uploads.length === 0) return null;

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 space-y-4">
      <div className="flex items-center justify-center space-x-2 mb-6">
        <Sparkles className="w-5 h-5 text-green-500" />
        <h3 className="text-lg font-semibold text-gray-700">Processing Your Plants</h3>
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
        
        const getStatusText = () => {
          switch (upload.status) {
            case 'uploading': return 'Uploading to cloud ☁️';
            case 'extracting': return 'Extracting GPS coordinates 🗺️';
            case 'saving': return 'Saving plant data 🌱';
            case 'completed': return 'Successfully processed! ✨';
            case 'error': return 'Processing failed ⚠️';
            default: return 'Processing...';
          }
        };

        return (
          <div key={upload.id} className="card p-6 border-l-4 border-l-green-400">
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
                  <p className="font-semibold text-gray-800">{getStatusText()}</p>
                  <p className="text-sm text-gray-500">Processing your plant image</p>
                </div>
              </div>
            </div>
            
            {upload.status === 'uploading' && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Upload Progress</span>
                  <span>{upload.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${upload.progress}%` }}
                  />
                </div>
              </div>
            )}
            
            {upload.status === 'error' && upload.error && (
              <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700 font-medium">{upload.error}</p>
              </div>
            )}
            
            {upload.status === 'completed' && (
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-700 font-medium">
                  ✅ Plant successfully added to your collection!
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