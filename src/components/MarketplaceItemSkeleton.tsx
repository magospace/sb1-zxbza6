import React from 'react';
import SkeletonLoader from './SkeletonLoader';

const MarketplaceItemSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <SkeletonLoader height="200px" />
      <div className="p-4">
        <SkeletonLoader height="24px" className="mb-2" />
        <SkeletonLoader height="16px" className="mb-4" />
        <SkeletonLoader height="20px" width="50%" className="mb-2" />
        <div className="flex justify-between items-center">
          <SkeletonLoader height="24px" width="30%" />
          <SkeletonLoader height="36px" width="40%" />
        </div>
      </div>
    </div>
  );
};

export default MarketplaceItemSkeleton;