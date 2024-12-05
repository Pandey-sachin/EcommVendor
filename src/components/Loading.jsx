import React from 'react';
import { Loader2} from 'lucide-react';


const LoadingSpinner = ({text ="Loading your content..."}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4 rounded-lg bg-white shadow-sm p-6">
      <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      <p className="text-sm text-gray-500 animate-pulse">{text}</p>
    </div>
  );
};

export default LoadingSpinner;