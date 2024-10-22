import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';

interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  nextVaccine?: {
    name: string;
    dueDate: string;
  };
}

interface PetSummaryProps {
  pets: Pet[];
}

const PetSummary: React.FC<PetSummaryProps> = ({ pets }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Resumen de Mascotas</h2>
      {pets.map((pet, index) => (
        <motion.div
          key={pet.id}
          className="bg-white p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <h3 className="text-xl font-semibold mb-2">{pet.name}</h3>
          <p className="text-gray-600 mb-4">{pet.species} - {pet.breed}</p>
          {pet.nextVaccine && (
            <div className="flex items-center mb-4">
              <Calendar className="text-blue-500 mr-2" size={20} />
              <span>
                Próxima vacuna: {pet.nextVaccine.name} - {new Date(pet.nextVaccine.dueDate).toLocaleDateString()}
              </span>
              {new Date(pet.nextVaccine.dueDate) < new Date() && (
                <AlertTriangle className="text-red-500 ml-2" size={20} />
              )}
            </div>
          )}
          <Link to={`/pet/${pet.id}`}>
            <Button>Ver Perfil</Button>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default PetSummary;