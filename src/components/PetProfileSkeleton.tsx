import React from 'react';
import SkeletonLoader from './SkeletonLoader';

const PetProfileSkeleton: React.FC = () => {
  return (
    <div className="space-y-4">
      <SkeletonLoader height="40px" className="mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <SkeletonLoader height="30px" className="mb-4" />
          <SkeletonLoader height="20px" className="mb-2" />
          <SkeletonLoader height="20px" className="mb-2" />
          <SkeletonLoader height="200px" className="mb-4" />
        </div>
        <div>
          <SkeletonLoader height="30px" className="mb-4" />
          <SkeletonLoader height="100px" className="mb-4" />
          <SkeletonLoader height="30px" className="mb-2" />
          <SkeletonLoader height="100px" />
        </div>
      </div>
    </div>
  );
};

export default PetProfileSkeleton;