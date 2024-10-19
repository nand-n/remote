import React from "react";

const SceletonLoading: React.FC = () => {
  return (
    <div className="p-4">
      <div className="animate-pulse flex flex-col space-y-4">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-64 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
      </div>
    </div>
  );
};

export default SceletonLoading;
