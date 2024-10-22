import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">BienPet</h3>
            <p>Cuidando a tu mascota con amor y profesionalismo.</p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Enlaces rápidos</h3>
            <ul>
              <li><Link to="/" className="hover:text-green-400">Inicio</Link></li>
              <li><Link to="/about" className="hover:text-green-400">Acerca de</Link></li>
              <li><Link to="/plans" className="hover:text-green-400">Planes</Link></li>
              <li><Link to="/pet-passport" className="hover:text-green-400">Pasaporte de Mascota</Link></li>
              <li><Link to="/travel-resources" className="hover:text-green-400">Recursos de Viaje</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Contacto</h3>
            <p>Email: info@bienpet.com</p>
            <p>Teléfono: (123) 456-7890</p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Síguenos</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-green-400"><Facebook /></a>
              <a href="#" className="hover:text-green-400"><Twitter /></a>
              <a href="#" className="hover:text-green-400"><Instagram /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2023 BienPet. Todos los derechos reservados.</p>
          <div className="mt-2">
            <Link to="/terms" className="hover:text-green-400 mr-4">Términos y Condiciones</Link>
            <Link to="/privacy" className="hover:text-green-400">Política de Privacidad</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;