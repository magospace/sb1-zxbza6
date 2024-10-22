import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Clock, Phone, MapPin, Stethoscope } from 'lucide-react';
import AppointmentBookingForm from './AppointmentBookingForm';

interface Service {
  id: string;
  name: string;
  price: number;
}

interface OperatingHours {
  day: string;
  hours: string;
}

interface Clinic {
  id: string;
  name: string;
  address: string;
  phone: string;
  services: Service[];
  operatingHours: OperatingHours[];
}

interface ClinicDetailsDialogProps {
  clinic: Clinic | null;
  onClose: () => void;
  onBookAppointment: (appointmentData: any) => void;
}

const ClinicDetailsDialog: React.FC<ClinicDetailsDialogProps> = ({ clinic, onClose, onBookAppointment }) => {
  if (!clinic) return null;

  return (
    <Dialog open={!!clinic} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{clinic.name}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Información de Contacto</h3>
            <p className="flex items-center mb-2"><MapPin className="mr-2" size={16} /> {clinic.address}</p>
            <p className="flex items-center mb-2"><Phone className="mr-2" size={16} /> {clinic.phone}</p>
            <h3 className="text-lg font-semibold mt-4 mb-2">Horario de Atención</h3>
            <ul>
              {clinic.operatingHours.map((oh, index) => (
                <li key={index} className="flex justify-between">
                  <span>{oh.day}</span>
                  <span>{oh.hours}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Servicios Disponibles</h3>
            <ul>
              {clinic.services.map((service) => (
                <li key={service.id} className="flex justify-between items-center mb-2">
                  <span className="flex items-center">
                    <Stethoscope className="mr-2" size={16} />
                    {service.name}
                  </span>
                  <span>${service.price.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Reservar Cita</h3>
          <AppointmentBookingForm
            clinicId={clinic.id}
            onSubmit={onBookAppointment}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClinicDetailsDialog;