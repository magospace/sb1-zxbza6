import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Activity, Clipboard, Plus, Bell } from 'lucide-react';
import PetHealthChart from './PetHealthChart';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

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

interface HealthTrackerProps {
  petName: string;
  healthRecords: HealthRecord[];
  medications: Medication[];
  onAddHealthRecord: (record: Omit<HealthRecord, 'id'>) => void;
  onAddMedication: (medication: Omit<Medication, 'id'>) => void;
}

const healthRecordSchema = z.object({
  date: z.string().nonempty('La fecha es requerida'),
  weight: z.number().positive('El peso debe ser un número positivo'),
  notes: z.string().optional(),
});

const medicationSchema = z.object({
  name: z.string().nonempty('El nombre del medicamento es requerido'),
  dosage: z.string().nonempty('La dosis es requerida'),
  frequency: z.string().nonempty('La frecuencia es requerida'),
  startDate: z.string().nonempty('La fecha de inicio es requerida'),
  endDate: z.string().nonempty('La fecha de finalización es requerida'),
});

const HealthTracker: React.FC<HealthTrackerProps> = ({
  petName,
  healthRecords,
  medications,
  onAddHealthRecord,
  onAddMedication
}) => {
  const [isAddRecordOpen, setIsAddRecordOpen] = useState(false);
  const [isAddMedicationOpen, setIsAddMedicationOpen] = useState(false);

  const {
    register: registerHealthRecord,
    handleSubmit: handleSubmitHealthRecord,
    formState: { errors: healthRecordErrors },
    reset: resetHealthRecordForm,
  } = useForm({
    resolver: zodResolver(healthRecordSchema),
  });

  const {
    register: registerMedication,
    handleSubmit: handleSubmitMedication,
    formState: { errors: medicationErrors },
    reset: resetMedicationForm,
  } = useForm({
    resolver: zodResolver(medicationSchema),
  });

  const onSubmitHealthRecord = (data: z.infer<typeof healthRecordSchema>) => {
    onAddHealthRecord(data);
    resetHealthRecordForm();
    setIsAddRecordOpen(false);
  };

  const onSubmitMedication = (data: z.infer<typeof medicationSchema>) => {
    onAddMedication(data);
    resetMedicationForm();
    setIsAddMedicationOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md p-6"
    >
      <h2 className="text-2xl font-semibold mb-4">Seguimiento de Salud de {petName}</h2>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Registros de Salud</h3>
        <PetHealthChart
          petName={petName}
          weights={healthRecords.map(record => record.weight)}
          dates={healthRecords.map(record => record.date)}
        />
        <Dialog open={isAddRecordOpen} onOpenChange={setIsAddRecordOpen}>
          <DialogTrigger asChild>
            <Button className="mt-4">
              <Plus size={16} className="mr-2" />
              Agregar Registro de Salud
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Registro de Salud</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmitHealthRecord(onSubmitHealthRecord)} className="space-y-4">
              <Input
                type="date"
                {...registerHealthRecord('date')}
                error={healthRecordErrors.date?.message}
              />
              <Input
                type="number"
                step="0.1"
                {...registerHealthRecord('weight')}
                placeholder="Peso (kg)"
                error={healthRecordErrors.weight?.message}
              />
              <Input
                {...registerHealthRecord('notes')}
                placeholder="Notas"
              />
              <Button type="submit">Guardar Registro</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Medicaciones</h3>
        {medications.length === 0 ? (
          <p>No hay medicaciones registradas.</p>
        ) : (
          <ul className="space-y-2">
            {medications.map((medication) => (
              <li key={medication.id} className="bg-gray-100 p-3 rounded-lg">
                <p className="font-semibold">{medication.name}</p>
                <p className="text-sm text-gray-600">Dosis: {medication.dosage}</p>
                <p className="text-sm text-gray-600">Frecuencia: {medication.frequency}</p>
                <p className="text-sm text-gray-600">
                  Desde: {new Date(medication.startDate).toLocaleDateString()} - 
                  Hasta: {new Date(medication.endDate).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
        <Dialog open={isAddMedicationOpen} onOpenChange={setIsAddMedicationOpen}>
          <DialogTrigger asChild>
            <Button className="mt-4">
              <Plus size={16} className="mr-2" />
              Agregar Medicación
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar Nueva Medicación</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmitMedication(onSubmitMedication)} className="space-y-4">
              <Input
                {...registerMedication('name')}
                placeholder="Nombre del medicamento"
                error={medicationErrors.name?.message}
              />
              <Input
                {...registerMedication('dosage')}
                placeholder="Dosis"
                error={medicationErrors.dosage?.message}
              />
              <Input
                {...registerMedication('frequency')}
                placeholder="Frecuencia"
                error={medicationErrors.frequency?.message}
              />
              <Input
                type="date"
                {...registerMedication('startDate')}
                error={medicationErrors.startDate?.message}
              />
              <Input
                type="date"
                {...registerMedication('endDate')}
                error={medicationErrors.endDate?.message}
              />
              <Button type="submit">Guardar Medicación</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </motion.div>
  );
};

export default HealthTracker;