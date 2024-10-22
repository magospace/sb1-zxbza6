import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Calendar, Star } from 'lucide-react';
import { Button } from './ui/button';

interface Mission {
  id: string;
  title: string;
  description: string;
  points: number;
  type: 'daily' | 'weekly' | 'monthly' | 'special';
  completed: boolean;
}

const initialMissions: Mission[] = [
  { id: '1', title: 'Realiza un examen físico completo', description: 'Visita a tu veterinario para un chequeo', points: 200, type: 'weekly', completed: false },
  { id: '2', title: 'Participa en un taller de cuidado animal', description: 'Asiste a un taller organizado por BienPet', points: 300, type: 'monthly', completed: false },
  { id: '3', title: 'Comparte una historia de éxito en redes sociales', description: 'Publica sobre tu experiencia con BienPet', points: 500, type: 'special', completed: false },
];

const MissionsPage: React.FC = () => {
  const [missions, setMissions] = useState<Mission[]>(initialMissions);

  const completeMission = (id: string) => {
    setMissions(missions.map(mission =>
      mission.id === id ? { ...mission, completed: true } : mission
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Tus Misiones
      </motion.h1>
      <p className="text-lg mb-8">
        Completa misiones para ganar puntos adicionales y recompensas exclusivas. ¡Empieza hoy mismo!
      </p>
      <div className="space-y-6">
        {missions.map((mission) => (
          <motion.div
            key={mission.id}
            className={`bg-white rounded-lg shadow-md p-6 ${mission.completed ? 'opacity-50' : ''}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-2">
              {mission.type === 'daily' && <Calendar className="text-blue-500 mr-2" />}
              {mission.type === 'weekly' && <Calendar className="text-green-500 mr-2" />}
              {mission.type === 'monthly' && <Calendar className="text-purple-500 mr-2" />}
              {mission.type === 'special' && <Star className="text-yellow-500 mr-2" />}
              <h3 className="text-xl font-semibold">{mission.title}</h3>
            </div>
            <p className="text-gray-600 mb-4">{mission.description}</p>
            <div className="flex justify-between items-center">
              <span className="font-bold text-green-600">+{mission.points} puntos</span>
              <Button
                onClick={() => completeMission(mission.id)}
                disabled={mission.completed}
              >
                {mission.completed ? 'Completada' : 'Marcar como Completada'}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MissionsPage;