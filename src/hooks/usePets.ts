import { useState, useCallback } from 'react';

export interface Pet {
  id: number;
  name: string;
  species: string;
  breed: string;
}

export const usePets = () => {
  const [pets, setPets] = useState<Pet[]>([]);

  const addPet = useCallback((pet: Omit<Pet, 'id'>) => {
    setPets(prevPets => [...prevPets, { ...pet, id: Date.now() }]);
  }, []);

  const updatePet = useCallback((updatedPet: Pet) => {
    setPets(prevPets => prevPets.map(pet => pet.id === updatedPet.id ? updatedPet : pet));
  }, []);

  const deletePet = useCallback((id: number) => {
    setPets(prevPets => prevPets.filter(pet => pet.id !== id));
  }, []);

  return { pets, addPet, updatePet, deletePet };
};