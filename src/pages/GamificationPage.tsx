import React from 'react';
import Gamification from '../components/Gamification';

const GamificationPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Gamificación</h1>
      <Gamification />
    </div>
  );
};

export default GamificationPage;