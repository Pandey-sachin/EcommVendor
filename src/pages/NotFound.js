import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen/3 bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8 text-red-600 flex justify-center">
          <svg className="w-32 h-32" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12z"
              fill="currentColor"
            />
            <path
              d="M8.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM15.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM7.5 14.5h9a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Error Message */}
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-500 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            <Home className="w-4 h-4" />
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;