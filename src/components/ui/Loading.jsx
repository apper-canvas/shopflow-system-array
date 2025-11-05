import React from "react";

const Loading = ({ className = "" }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow-card">
            <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
            <div className="bg-gray-200 h-4 rounded mb-2"></div>
            <div className="bg-gray-200 h-3 rounded mb-3 w-3/4"></div>
            <div className="flex justify-between items-center">
              <div className="bg-gray-200 h-6 rounded w-20"></div>
              <div className="bg-gray-200 h-8 rounded w-24"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;