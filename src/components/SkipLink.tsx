import React from 'react';

const SkipLink: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-green-600 text-white p-2 z-50"
    >
      Saltar al contenido principal
    </a>
  );
};

export default SkipLink;