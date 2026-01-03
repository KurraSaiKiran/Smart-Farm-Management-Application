import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { removeToast } from '../../store/uiSlice';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

const Toast: React.FC = () => {
  const dispatch = useDispatch();
  const toasts = useSelector((state: RootState) => state.ui.toasts);

  useEffect(() => {
    toasts.forEach((toast) => {
      const timer = setTimeout(() => {
        dispatch(removeToast(toast.id));
      }, 5000);

      return () => clearTimeout(timer);
    });
  }, [toasts, dispatch]);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => {
        const Icon = toast.type === 'success' ? CheckCircle : toast.type === 'error' ? XCircle : Info;
        const bgColor = toast.type === 'success' ? 'bg-green-50 border-green-200' : 
                       toast.type === 'error' ? 'bg-red-50 border-red-200' : 
                       'bg-blue-50 border-blue-200';
        const textColor = toast.type === 'success' ? 'text-green-800' : 
                         toast.type === 'error' ? 'text-red-800' : 
                         'text-blue-800';
        const iconColor = toast.type === 'success' ? 'text-green-500' : 
                         toast.type === 'error' ? 'text-red-500' : 
                         'text-blue-500';

        return (
          <div
            key={toast.id}
            className={`max-w-sm w-full ${bgColor} border rounded-lg shadow-lg p-4 flex items-start space-x-3`}
          >
            <Icon className={`w-5 h-5 ${iconColor} flex-shrink-0 mt-0.5`} />
            <p className={`text-sm ${textColor} flex-1`}>{toast.message}</p>
            <button
              onClick={() => dispatch(removeToast(toast.id))}
              className={`${textColor} hover:opacity-70 flex-shrink-0`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Toast;