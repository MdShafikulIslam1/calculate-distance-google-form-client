import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="bg-gray-900 flex items-center justify-center min-h-screen">
      <div className="text-center">
        {/* Loader Animation */}
        <div className="flex items-center justify-center mb-4">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>

        {/* Loader Text */}
        <p className="text-white text-lg font-medium animate-pulse">
          Please wait! Processing...
        </p>
      </div>
    </div>
  );
};

export default Loader;