import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HealthRecord {
  id: string;
  date: string;
  weight: number;
  notes: string;
}

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
}

interface Pet {
  id: number;
  name: string;
  species: string;
  breed: string;
  healthRecords: HealthRecord[];
  medications: Medication[];
}

interface PetsState {
  pets: Pet[];
}

const initialState: PetsState = {
  pets: [],
};

export const petsSlice = createSlice({
  name: 'pets',
  initialState,
  reducers: {
    addPet: (state, action: PayloadAction<Pet>) => {
      state.pets.push(action.payload);
    },
    updatePet: (state, action: PayloadAction<Pet>) => {
      const index = state.pets.findIndex(pet => pet.id === action.payload.id);
      if (index !== -1) {
        state.pets[index] = action.payload;
      }
    },
    deletePet: (state, action: PayloadAction<number>) => {
      state.pets = state.pets.filter(pet => pet.id !== action.payload);
    },
    addHealthRecord: (state, action: PayloadAction<{ petId: number; record: HealthRecord }>) => {
      const pet = state.pets.find(p => p.id === action.payload.petId);
      if (pet) {
        pet.healthRecords.push(action.payload.record);
      }
    },
    addMedication: (state, action: PayloadAction<{ petId: number; medication: Medication }>) => {
      const pet = state.pets.find(p => p.id === action.payload.petId);
      if (pet) {
        pet.medications.push(action.payload.medication);
      }
    },
  },
});

export const { addPet, updatePet, deletePet, addHealthRecord, addMedication } = petsSlice.actions;

export default petsSlice.reducer;