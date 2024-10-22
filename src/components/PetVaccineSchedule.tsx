import React from 'react';
import { motion } from 'framer-motion';
import { Syringe, Check, AlertTriangle, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

interface Vaccine {
  id: string;
  name: string;
  dueDate: string;
  isCompleted: boolean;
}

interface PetVaccineScheduleProps {
  vaccines: Vaccine[];
  onUpdateVaccine: (updatedVaccine: Vaccine) => void;
}

const vaccineSchema = z.object({
  dueDate: z.string().min(1, 'La fecha es requerida'),
});

type VaccineFormData = z.infer<typeof vaccineSchema>;

const PetVaccineSchedule: React.FC<PetVaccineScheduleProps> = ({ vaccines, onUpdateVaccine }) => {
  const sortedVaccines = [...vaccines].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  const { register, handleSubmit, reset } = useForm<VaccineFormData>({
    resolver: zodResolver(vaccineSchema),
  });

  const handleComplete = (vaccine: Vaccine) => {
    onUpdateVaccine({ ...vaccine, isCompleted: true });
  };

  const handleReschedule = (vaccine: Vaccine, data: VaccineFormData) => {
    onUpdateVaccine({ ...vaccine, dueDate: data.dueDate, isCompleted: false });
    reset();
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">Calendario de Vacunas</h3>
      {sortedVaccines.map((vaccine, index) => (
        <motion.div
          key={vaccine.id}
          className={`flex items-center p-3 rounded-lg ${
            vaccine.isCompleted ? 'bg-green-100' : 'bg-yellow-100'
          }`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          {vaccine.isCompleted ? (
            <Check className="text-green-600 mr-3" size={20} />
          ) : (
            <Syringe className="text-yellow-600 mr-3" size={20} />
          )}
          <div className="flex-grow">
            <p className="font-semibold">{vaccine.name}</p>
            <p className="text-sm text-gray-600">
              {vaccine.isCompleted
                ? `Completada el ${new Date(vaccine.dueDate).toLocaleDateString()}`
                : `Programada para el ${new Date(vaccine.dueDate).toLocaleDateString()}`}
            </p>
          </div>
          {!vaccine.isCompleted && (
            <div className="flex space-x-2">
              <Button size="sm" onClick={() => handleComplete(vaccine)}>Completar</Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    <Calendar size={16} className="mr-2" />
                    Reprogramar
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Reprogramar Vacuna</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit((data) => handleReschedule(vaccine, data))} className="space-y-4">
                    <Input
                      type="date"
                      {...register('dueDate')}
                      defaultValue={vaccine.dueDate}
                    />
                    <Button type="submit">Guardar</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          )}
          {!vaccine.isCompleted && new Date(vaccine.dueDate) < new Date() && (
            <AlertTriangle className="text-red-500 ml-2" size={20} />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default PetVaccineSchedule;