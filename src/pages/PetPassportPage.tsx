import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchPetPassport } from '../api/petApi';
import PetPassport from '../components/PetPassport';
import LoadingSpinner from '../components/LoadingSpinner';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

const PetPassportPage: React.FC = () => {
  const { petId } = useParams<{ petId: string }>();
  const navigate = useNavigate();
  const { data: pet, isLoading, error } = useQuery(['petPassport', petId], () => fetchPetPassport(petId));

  if (isLoading) return <LoadingSpinner />;
  if (error) return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8 text-center"
    >
      <AlertTriangle size={48} className="mx-auto text-red-500 mb-4" />
      <h1 className="text-2xl font-bold mb-2">Error al cargar el pasaporte de mascota</h1>
      <p className="mb-4">Por favor, intenta de nuevo más tarde o contacta a soporte si el problema persiste.</p>
      <Button onClick={() => navigate(-1)}>Volver</Button>
    </motion.div>
  );
  if (!pet) return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8 text-center"
    >
      <AlertTriangle size={48} className="mx-auto text-yellow-500 mb-4" />
      <h1 className="text-2xl font-bold mb-2">Mascota no encontrada</h1>
      <p className="mb-4">La mascota que estás buscando no existe o ha sido eliminada.</p>
      <Button onClick={() => navigate('/dashboard')}>Ir al Dashboard</Button>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-6">Pasaporte de Mascota para {pet.name}</h1>
      <PetPassport pet={pet} />
      <div className="mt-8">
        <Button onClick={() => navigate(-1)}>Volver</Button>
      </div>
    </motion.div>
  );
};

export default PetPassportPage;