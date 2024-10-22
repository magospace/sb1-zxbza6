import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Select } from './ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

interface Reminder {
  id: string;
  title: string;
  date: string;
  type: 'appointment' | 'medication' | 'grooming' | 'other';
}

const reminderSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  date: z.string().min(1, 'La fecha es requerida'),
  type: z.enum(['appointment', 'medication', 'grooming', 'other']),
});

type ReminderFormData = z.infer<typeof reminderSchema>;

const PetCareReminders: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isAddReminderOpen, setIsAddReminderOpen] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ReminderFormData>({
    resolver: zodResolver(reminderSchema),
  });

  const onSubmit = (data: ReminderFormData) => {
    const newReminder: Reminder = {
      id: Date.now().toString(),
      ...data,
    };
    setReminders([...reminders, newReminder]);
    setIsAddReminderOpen(false);
    reset();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Recordatorios de Cuidado</h3>
        <Dialog open={isAddReminderOpen} onOpenChange={setIsAddReminderOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus size={16} className="mr-2" />
              Agregar Recordatorio
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Recordatorio</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                {...register('title')}
                placeholder="Título del recordatorio"
                error={errors.title?.message}
              />
              <Input
                type="date"
                {...register('date')}
                error={errors.date?.message}
              />
              <Select {...register('type')} error={errors.type?.message}>
                <option value="appointment">Cita</option>
                <option value="medication">Medicación</option>
                <option value="grooming">Aseo</option>
                <option value="other">Otro</option>
              </Select>
              <Button type="submit">Guardar Recordatorio</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {reminders.length === 0 ? (
        <p className="text-gray-500">No hay recordatorios programados.</p>
      ) : (
        <ul className="space-y-2">
          {reminders.map((reminder) => (
            <motion.li
              key={reminder.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center bg-white p-3 rounded-lg shadow"
            >
              <Bell className="text-green-500 mr-3" size={20} />
              <div>
                <p className="font-semibold">{reminder.title}</p>
                <p className="text-sm text-gray-500">{new Date(reminder.date).toLocaleDateString()}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PetCareReminders;