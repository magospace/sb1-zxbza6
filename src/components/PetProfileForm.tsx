import React from 'react';
import { z } from 'zod';
import Form from './Form';
import { useDispatch } from 'react-redux';
import { addPet, updatePet } from '../store/petsSlice';
import { useNotifications } from '../hooks/useNotifications';

const petProfileSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  species: z.string().min(1, 'La especie es requerida'),
  breed: z.string().min(1, 'La raza es requerida'),
  birthDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Fecha inválida",
  }),
});

type PetProfileFormData = z.infer<typeof petProfileSchema>;

interface PetProfileFormProps {
  pet?: PetProfileFormData & { id: number };
  onSuccess: () => void;
}

const PetProfileForm: React.FC<PetProfileFormProps> = ({ pet, onSuccess }) => {
  const dispatch = useDispatch();
  const { addNotification } = useNotifications();

  const handleSubmit = async (data: PetProfileFormData) => {
    try {
      if (pet) {
        dispatch(updatePet({ ...data, id: pet.id }));
        addNotification('Perfil de mascota actualizado', 'success');
      } else {
        dispatch(addPet(data));
        addNotification('Mascota agregada exitosamente', 'success');
      }
      onSuccess();
    } catch (error) {
      addNotification('Error al guardar el perfil de la mascota', 'error');
    }
  };

  return (
    <Form<PetProfileFormData>
      schema={petProfileSchema}
      onSubmit={handleSubmit}
      fields={[
        { name: 'name', label: 'Nombre', type: 'text', placeholder: 'Nombre de tu mascota' },
        { name: 'species', label: 'Especie', type: 'text', placeholder: 'Ej: Perro, Gato' },
        { name: 'breed', label: 'Raza', type: 'text', placeholder: 'Raza de tu mascota' },
        { name: 'birthDate', label: 'Fecha de Nacimiento', type: 'date' },
      ]}
      submitText={pet ? 'Actualizar Perfil' : 'Agregar Mascota'}
    />
  );
};

export default PetProfileForm;