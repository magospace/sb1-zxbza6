import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const siteStructure = [
  { name: 'Inicio', path: '/' },
  { name: 'Acerca de', path: '/about' },
  { name: 'Planes', path: '/plans' },
  { name: 'Cómo Funciona', path: '/how-it-works' },
  { name: 'Pasaporte de Mascota', path: '/pet-passport' },
  { name: 'Recursos de Viaje', path: '/travel-resources' },
  { name: 'Clínicas Asociadas', path: '/associated-clinics' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contacto', path: '/contact' },
  { name: 'Área de Miembros', path: '/member-area' },
  { name: 'Características de la App', path: '/app-features' },
  { name: 'Plan de Bienestar', path: '/wellness-plan' },
  { name: 'Marketplace', path: '/marketplace' },
  { name: 'Términos y Condiciones', path: '/terms' },
  { name: 'Política de Privacidad', path: '/privacy' },
];

const Sitemap: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Mapa del Sitio
      </motion.h1>
      <motion.ul 
        className="space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {siteStructure.map((page, index) => (
          <motion.li 
            key={page.path}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Link to={page.path} className="text-green-600 hover:text-green-800">
              {page.name}
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

export default Sitemap;