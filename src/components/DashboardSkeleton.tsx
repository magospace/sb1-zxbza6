import React from 'react';
import SkeletonLoader from './SkeletonLoader';

const DashboardSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      <SkeletonLoader height="40px" className="mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <SkeletonLoader height="24px" className="mb-4" />
            <SkeletonLoader height="16px" className="mb-2" />
            <SkeletonLoader height="16px" width="60%" />
          </div>
        ))}
      </div>
      <SkeletonLoader height="300px" className="mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <SkeletonLoader height="24px" className="mb-4" />
            <SkeletonLoader height="16px" className="mb-2" />
            <SkeletonLoader height="16px" width="80%" className="mb-4" />
            <SkeletonLoader height="32px" width="50%" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardSkeleton;