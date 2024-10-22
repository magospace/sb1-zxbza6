import React from 'react';
import { motion } from 'framer-motion';

interface PetAvatarProps {
  name: string;
  species: string;
}

const PetAvatar: React.FC<PetAvatarProps> = ({ name, species }) => {
  const getInitial = (name: string) => name.charAt(0).toUpperCase();
  const getColor = (species: string) => {
    switch (species.toLowerCase()) {
      case 'dog':
        return 'bg-blue-500';
      case 'cat':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <motion.div
      className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${getColor(species)}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {getInitial(name)}
    </motion.div>
  );
};

export default PetAvatar;