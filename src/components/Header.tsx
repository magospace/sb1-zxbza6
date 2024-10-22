import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MegaMenu from './MegaMenu';
import MobileNavDrawer from './MobileNavDrawer';

const Header: React.FC<{ onOpenSearch: () => void }> = ({ onOpenSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-green-600 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">BienPet</Link>
        <MegaMenu />
        <div className="flex items-center space-x-4">
          <button onClick={onOpenSearch} className="hover:text-green-200">
            <Search size={20} />
          </button>
          <Link to="/member-area" className="hover:text-green-200">
            <User size={20} />
          </Link>
          <motion.button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>
      <MobileNavDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
};

export default Header;