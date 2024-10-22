import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select } from './ui/select';

const appointmentSchema = z.object({
  petName: z.string().min(1, 'El nombre de la mascota es requerido'),
  service: z.string().min(1, 'El servicio es requerido'),
  date: z.string().min(1, 'La fecha es requerida'),
  time: z.string().min(1, 'La hora es requerida'),
  notes: z.string().optional(),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

interface AppointmentBookingFormProps {
  clinicId: string;
  onSubmit: (data: AppointmentFormData) => void;
}

const AppointmentBookingForm: React.FC<AppointmentBookingFormProps> = ({ clinicId, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        {...register('petName')}
        placeholder="Nombre de la mascota"
        error={errors.petName?.message}
      />
      <Select {...register('service')}>
        <option value="">Selecciona un servicio</option>
        <option value="checkup">Chequeo general</option>
        <option value="vaccination">Vacunación</option>
        <option value="grooming">Peluquería</option>
      </Select>
      {errors.service && <p className="text-red-500 text-sm">{errors.service.message}</p>}
      <Input
        {...register('date')}
        type="date"
        error={errors.date?.message}
      />
      <Input
        {...register('time')}
        type="time"
        error={errors.time?.message}
      />
      <Textarea
        {...register('notes')}
        placeholder="Notas adicionales (opcional)"
      />
      <Button type="submit">Reservar Cita</Button>
    </form>
  );
};

export default AppointmentBookingForm;