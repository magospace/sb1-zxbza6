import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav className="bg-gray-100 py-2">
      <div className="container mx-auto px-4">
        <ol className="flex items-center text-sm">
          <li>
            <Link to="/" className="text-green-600 hover:text-green-800">
              Inicio
            </Link>
          </li>
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            return (
              <li key={name} className="flex items-center">
                <ChevronRight size={16} className="mx-2 text-gray-400" />
                {isLast ? (
                  <span className="text-gray-700">{name}</span>
                ) : (
                  <Link to={routeTo} className="text-green-600 hover:text-green-800">
                    {name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;