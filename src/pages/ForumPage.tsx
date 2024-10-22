import React from 'react';
import Forum from '../components/Forum';

const ForumPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Foro de la Comunidad</h1>
      <Forum />
    </div>
  );
};

export default ForumPage;