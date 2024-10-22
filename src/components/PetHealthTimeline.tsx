import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Activity, Syringe, Pill } from 'lucide-react';

interface HealthEvent {
  id: string;
  date: string;
  type: 'checkup' | 'vaccination' | 'medication';
  description: string;
}

interface PetHealthTimelineProps {
  events: HealthEvent[];
}

const PetHealthTimeline: React.FC<PetHealthTimelineProps> = ({ events }) => {
  const sortedEvents = [...events].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">Historial de Salud</h3>
      {sortedEvents.map((event, index) => (
        <motion.div
          key={event.id}
          className="flex items-start"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
            {event.type === 'checkup' && <Activity className="text-green-600" />}
            {event.type === 'vaccination' && <Syringe className="text-blue-600" />}
            {event.type === 'medication' && <Pill className="text-red-600" />}
          </div>
          <div>
            <p className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
            <p className="font-semibold">{event.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PetHealthTimeline;