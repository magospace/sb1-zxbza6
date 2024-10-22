import React from 'react';
import { User, Award, Zap, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

interface UserDashboardProps {
  user: {
    name: string;
    email: string;
    points: number;
    level: number;
    badges: number;
    streak: number;
  };
}

const UserDashboard: React.FC<UserDashboardProps> = ({ user }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md p-6"
    >
      <h2 className="text-2xl font-bold mb-6">Tu Panel de Bienestar</h2>
      <div className="flex items-center mb-6">
        <User size={48} className="text-green-600 mr-4" />
        <div>
          <h3 className="text-xl font-semibold">{user.name}</h3>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Award className="text-green-600 mr-2" />
            <h4 className="font-semibold">Tus Puntos</h4>
          </div>
          <p className="text-2xl font-bold">{user.points}</p>
          <p className="text-sm text-gray-600">Has acumulado {user.points} puntos. ¡Sigue así!</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Target className="text-green-600 mr-2" />
            <h4 className="font-semibold">Tu Nivel</h4>
          </div>
          <p className="text-2xl font-bold">{user.level}</p>
          <p className="text-sm text-gray-600">Nivel {user.level}: {getLevelName(user.level)}</p>
        </div>
      </div>
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <Award className="text-green-600 mr-2" />
          <h4 className="font-semibold">Tus Insignias</h4>
        </div>
        <p className="mb-2">Has desbloqueado {user.badges} de 10 insignias.</p>
        <Progress value={user.badges * 10} className="w-full" />
      </div>
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <Zap className="text-green-600 mr-2" />
          <h4 className="font-semibold">Tus Rachas</h4>
        </div>
        <p>Racha actual: {user.streak} días sin faltar a citas.</p>
      </div>
      <div className="flex flex-wrap gap-4">
        <Button>Canjear Recompensas</Button>
        <Button variant="outline">Ver Mis Misiones</Button>
        <Button variant="outline">Invitar Amigos</Button>
      </div>
    </motion.div>
  );
};

function getLevelName(level: number): string {
  switch (level) {
    case 1: return 'Novato';
    case 2: return 'Cuidador';
    case 3: return 'Veterinario Asociado';
    case 4: return 'Embajador';
    default: return 'Novato';
  }
}

export default UserDashboard;