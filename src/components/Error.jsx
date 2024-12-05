import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorDisplay = ({ error }) => {
  return (
    <div className="min-h-[200px] flex items-center justify-center p-4">
      <div className="flex items-start space-x-3 max-w-md bg-red-50 border border-red-200 p-4 rounded-lg">
        <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm text-red-700">
            {error || 'An unexpected error occurred. Please try again later.'}
          </p>
        </div>
      </div>
    </div>
  );
};
export default ErrorDisplay;
