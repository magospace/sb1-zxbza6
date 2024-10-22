import React from 'react';
import SkeletonLoader from './SkeletonLoader';

const SocialFeedSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      <SkeletonLoader height="40px" className="mb-6" />
      <SkeletonLoader height="100px" className="mb-6" />
      {[...Array(3)].map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <SkeletonLoader width="40px" height="40px" className="rounded-full mr-4" />
            <SkeletonLoader width="120px" height="20px" />
          </div>
          <SkeletonLoader height="16px" className="mb-2" />
          <SkeletonLoader height="16px" width="80%" className="mb-4" />
          <SkeletonLoader height="200px" className="mb-4" />
          <div className="flex justify-between">
            <SkeletonLoader width="60px" height="24px" />
            <SkeletonLoader width="60px" height="24px" />
            <SkeletonLoader width="60px" height="24px" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SocialFeedSkeleton;