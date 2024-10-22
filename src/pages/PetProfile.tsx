import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { motion } from 'framer-motion';
import PetPhotoGallery from '../components/PetPhotoGallery';
import HealthTracker from '../components/HealthTracker';
import { useNotifications } from '../hooks/useNotifications';
import NotificationSystem from '../components/NotificationSystem';
import SocialShare from '../components/SocialShare';
import { fetchPetProfile } from '../api/petApi';

const PetProfile: React.FC = () => {
  const { petId } = useParams<{ petId: string }>();
  const { notifications, addNotification, removeNotification } = useNotifications();

  const { data: pet, isLoading, error } = useQuery(['pet', petId], () => fetchPetProfile(petId), {
    onError: () => {
      addNotification('Error al cargar el perfil de la mascota', 'error');
    },
  });

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error || !pet) {
    return <div>Error al cargar el perfil de la mascota</div>;
  }

  const shareUrl = `${window.location.origin}/pet/${petId}`;
  const shareTitle = `Conoce a ${pet.name} en BienPet`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <NotificationSystem notifications={notifications} removeNotification={removeNotification} />
      <h1 className="text-3xl font-bold mb-6">Perfil de {pet.name}</h1>
      <div className="mb-6">
        <SocialShare url={shareUrl} title={shareTitle} />
      </div>
      {/* Rest of the component remains the same */}
    </motion.div>
  );
};

export default PetProfile;