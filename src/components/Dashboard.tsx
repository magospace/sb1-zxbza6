import React from 'react';
import { motion } from 'framer-motion';
import UserDashboard from './UserDashboard';
import RewardsPage from './RewardsPage';
import MissionsPage from './MissionsPage';
import ReferralProgram from './ReferralProgram';
import PetSummary from './PetSummary';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import DashboardSkeleton from './DashboardSkeleton';
import { useQuery } from 'react-query';
import { fetchUserData } from '../api/userApi';
import { fetchPets } from '../api/petApi';

const Dashboard: React.FC = () => {
  const { data: userData, isLoading: isUserLoading, error: userError } = useQuery('userData', fetchUserData);
  const { data: pets, isLoading: isPetsLoading, error: petsError } = useQuery('pets', fetchPets);

  if (isUserLoading || isPetsLoading) {
    return <DashboardSkeleton />;
  }

  if (userError || petsError) {
    return <div>Error loading dashboard data</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <Tabs defaultValue="overview">
        <TabsList className="mb-8">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="pets">Mis Mascotas</TabsTrigger>
          <TabsTrigger value="rewards">Recompensas</TabsTrigger>
          <TabsTrigger value="missions">Misiones</TabsTrigger>
          <TabsTrigger value="referral">Programa de Referidos</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <UserDashboard user={userData} />
        </TabsContent>
        <TabsContent value="pets">
          <PetSummary pets={pets} />
        </TabsContent>
        <TabsContent value="rewards">
          <RewardsPage userPoints={userData.points} />
        </TabsContent>
        <TabsContent value="missions">
          <MissionsPage />
        </TabsContent>
        <TabsContent value="referral">
          <ReferralProgram />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default Dashboard;