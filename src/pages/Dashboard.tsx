import React from 'react';
import { motion } from 'framer-motion';
import UserDashboard from '../components/UserDashboard';
import RewardsPage from '../components/RewardsPage';
import MissionsPage from '../components/MissionsPage';
import ReferralProgram from '../components/ReferralProgram';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import DashboardSkeleton from '../components/DashboardSkeleton';
import { useQuery } from 'react-query';
import { fetchUserData } from '../api/userApi';

const Dashboard: React.FC = () => {
  const { data: userData, isLoading, error } = useQuery('userData', fetchUserData);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
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
          <TabsTrigger value="rewards">Recompensas</TabsTrigger>
          <TabsTrigger value="missions">Misiones</TabsTrigger>
          <TabsTrigger value="referral">Programa de Referidos</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <UserDashboard user={userData} />
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