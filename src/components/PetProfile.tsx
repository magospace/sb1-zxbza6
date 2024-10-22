import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import PetPhotoGallery from './PetPhotoGallery';
import HealthTracker from './HealthTracker';
import PetHealthTimeline from './PetHealthTimeline';
import PetCareReminders from './PetCareReminders';
import PetVaccineSchedule from './PetVaccineSchedule';
import { useNotifications } from '../hooks/useNotifications';
import NotificationSystem from './NotificationSystem';
import SocialShare from './SocialShare';
import PetProfileSkeleton from './PetProfileSkeleton';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchPetProfile, addHealthRecord, addMedication, updateVaccine } from '../api/petApi';

const PetProfile: React.FC = () => {
  const { petId } = useParams<{ petId: string }>();
  const { notifications, addNotification, removeNotification } = useNotifications();
  const queryClient = useQueryClient();

  const { data: pet, isLoading, error } = useQuery(['pet', petId], () => fetchPetProfile(petId), {
    onError: () => {
      addNotification('Error al cargar el perfil de la mascota', 'error');
    },
  });

  const addHealthRecordMutation = useMutation(
    (record: Omit<HealthRecord, 'id'>) => addHealthRecord(petId!, record),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['pet', petId]);
        addNotification('Registro de salud agregado exitosamente', 'success');
      },
      onError: () => {
        addNotification('Error al agregar el registro de salud', 'error');
      },
    }
  );

  const addMedicationMutation = useMutation(
    (medication: Omit<Medication, 'id'>) => addMedication(petId!, medication),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['pet', petId]);
        addNotification('Medicamento agregado exitosamente', 'success');
      },
      onError: () => {
        addNotification('Error al agregar el medicamento', 'error');
      },
    }
  );

  const updateVaccineMutation = useMutation(
    (vaccine: Vaccine) => updateVaccine(petId!, vaccine),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['pet', petId]);
        addNotification('Vacuna actualizada exitosamente', 'success');
      },
      onError: () => {
        addNotification('Error al actualizar la vacuna', 'error');
      },
    }
  );

  if (isLoading) {
    return <PetProfileSkeleton />;
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Información General</h2>
          <p><strong>Especie:</strong> {pet.species}</p>
          <p><strong>Raza:</strong> {pet.breed}</p>
          <PetPhotoGallery photos={pet.photos} petName={pet.name} />
        </motion.div>
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <HealthTracker
            petName={pet.name}
            healthRecords={pet.healthRecords}
            medications={pet.medications}
            onAddHealthRecord={addHealthRecordMutation.mutate}
            onAddMedication={addMedicationMutation.mutate}
          />
        </motion.div>
      </div>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-8"
      >
        <PetHealthTimeline events={pet.healthEvents} />
      </motion.div>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-8"
      >
        <PetCareReminders />
      </motion.div>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-8"
      >
        <PetVaccineSchedule
          vaccines={pet.vaccines}
          onUpdateVaccine={updateVaccineMutation.mutate}
        />
      </motion.div>
    </motion.div>
  );
};

export default PetProfile;