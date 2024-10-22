import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Check } from 'lucide-react';
import { Button } from './ui/button';

interface Reward {
  id: string;
  name: string;
  description: string;
  points: number;
  icon: React.ReactNode;
}

const rewards: Reward[] = [
  { id: '1', name: 'Descuento en Planes', description: '10% de descuento en tu próximo plan anual', points: 500, icon: <Gift /> },
  { id: '2', name: 'Servicio Gratuito', description: 'Examen físico gratuito', points: 1000, icon: <Check /> },
  { id: '3', name: 'Merchandising', description: 'Kit exclusivo de cuidado para mascotas', points: 1500, icon: <Gift /> },
];

interface RewardsPageProps {
  userPoints: number;
}

const RewardsPage: React.FC<RewardsPageProps> = ({ userPoints }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Recompensas de BienPet
      </motion.h1>
      <p className="text-lg mb-8">
        Canjea tus puntos por descuentos exclusivos y servicios gratuitos. ¡Elige lo que más te convenga!
      </p>
      <p className="text-xl font-semibold mb-6">Tus puntos actuales: {userPoints}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.map((reward) => (
          <motion.div
            key={reward.id}
            className="bg-white rounded-lg shadow-md p-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-4">
              <div className="text-green-600 mr-4">{reward.icon}</div>
              <h3 className="text-xl font-semibold">{reward.name}</h3>
            </div>
            <p className="text-gray-600 mb-4">{reward.description}</p>
            <div className="flex justify-between items-center">
              <span className="font-bold text-green-600">{reward.points} puntos</span>
              <Button
                disabled={userPoints < reward.points}
                onClick={() => console.log(`Canjear recompensa: ${reward.name}`)}
              >
                Canjear Ahora
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RewardsPage;