import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Star, Trophy, Zap, Users } from 'lucide-react';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { useNotifications } from '../hooks/useNotifications';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchUserPoints, fetchUserAchievements, unlockAchievement, fetchLeaderboard } from '../api/communityApi';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  points: number;
}

const achievements: Achievement[] = [
  { id: '1', title: 'Primer Paseo', description: 'Completaste tu primer paseo con tu mascota', icon: <Award />, points: 50 },
  { id: '2', title: 'Maestro del Cuidado', description: 'Completaste todas las tareas de cuidado por una semana', icon: <Star />, points: 100 },
  { id: '3', title: 'Experto en Salud', description: 'Registraste 5 chequeos veterinarios', icon: <Trophy />, points: 150 },
  { id: '4', title: 'Amigo Fiel', description: 'Usaste la app por 30 días consecutivos', icon: <Zap />, points: 200 },
];

const Gamification: React.FC = () => {
  const [dailyChallenge, setDailyChallenge] = useState<Achievement | null>(null);
  const { addNotification } = useNotifications();
  const queryClient = useQueryClient();

  const { data: points = 0 } = useQuery('userPoints', fetchUserPoints);
  const { data: unlockedAchievements = [] } = useQuery('userAchievements', fetchUserAchievements);
  const { data: leaderboard = [] } = useQuery('leaderboard', fetchLeaderboard);

  const level = Math.floor(points / 100) + 1;

  const unlockAchievementMutation = useMutation(unlockAchievement, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('userPoints');
      queryClient.invalidateQueries('userAchievements');
      addNotification(`¡Logro desbloqueado: ${data.title}!`, 'success');
    },
    onError: () => {
      addNotification('Error al desbloquear el logro', 'error');
    },
  });

  useEffect(() => {
    generateDailyChallenge();
  }, []);

  const generateDailyChallenge = () => {
    const randomAchievement = achievements[Math.floor(Math.random() * achievements.length)];
    setDailyChallenge({ ...randomAchievement, points: randomAchievement.points * 2 });
  };

  const unlockAchievementHandler = async (achievement: Achievement) => {
    if (!unlockedAchievements.includes(achievement.id)) {
      unlockAchievementMutation.mutate(achievement.id);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Gamificación</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-xl font-semibold mb-2">Nivel {level}</p>
        <Progress value={(points % 100)} max={100} className="mb-2" />
        <p className="text-sm text-gray-600">{points} puntos totales</p>
      </div>

      {dailyChallenge && (
        <motion.div
          className="bg-yellow-100 p-4 rounded-lg shadow"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="font-semibold mb-2">Desafío Diario</h3>
          <p>{dailyChallenge.description}</p>
          <p className="text-sm text-green-600">+{dailyChallenge.points} puntos</p>
          <Button
            className="mt-2"
            onClick={() => unlockAchievementHandler(dailyChallenge)}
          >
            Completar Desafío
          </Button>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence>
          {achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              className={`bg-white p-4 rounded-lg shadow ${
                unlockedAchievements.includes(achievement.id) ? 'border-2 border-green-500' : ''
              }`}
              whileHover={{ scale: 1.05 }}
              layout
            >
              <div className="flex items-center space-x-4">
                <div className="text-green-500">{achievement.icon}</div>
                <div>
                  <h3 className="font-semibold">{achievement.title}</h3>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                  <p className="text-sm text-green-600">+{achievement.points} puntos</p>
                </div>
              </div>
              {!unlockedAchievements.includes(achievement.id) && (
                <Button
                  className="mt-2 w-full"
                  onClick={() => unlockAchievementHandler(achievement)}
                >
                  Desbloquear
                </Button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-2 flex items-center">
          <Users className="mr-2" />
          Tabla de Clasificación
        </h3>
        <ul>
          {leaderboard.map((user, index) => (
            <li key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
              <span>{user.name}</span>
              <span>{user.points} puntos</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Gamification;