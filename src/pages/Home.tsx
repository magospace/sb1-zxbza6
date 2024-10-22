import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Stethoscope, Plane, Bell, Smartphone, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import Card from '../components/Card';
import LazyImage from '../components/LazyImage';

const Home: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <section className="hero bg-green-600 text-white py-20">
        <motion.div
          className="container mx-auto px-4 text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 className="text-4xl md:text-5xl font-bold mb-4" variants={itemVariants}>
            BienPet - Tu Compañero Digital para el Cuidado de Mascotas
          </motion.h1>
          <motion.p className="text-xl mb-8" variants={itemVariants}>
            Gestiona la salud de tu mascota, planifica viajes y accede a servicios premium con nuestra app gratuita.
          </motion.p>
          <motion.div className="flex justify-center space-x-4" variants={itemVariants}>
            <Button as={Link} to="/download">
              Descargar App Gratis
            </Button>
            <Button as={Link} to="/wellness-plan" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-600">
              Ver Plan de Bienestar
            </Button>
          </motion.div>
        </motion.div>
      </section>

      <section className="features py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Características de la App BienPet</h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <FeatureCard
              icon={<Smartphone size={48} />}
              title="App Gratuita"
              description="Accede a todas las funciones básicas sin costo alguno."
            />
            <FeatureCard
              icon={<Stethoscope size={48} />}
              title="Registros Médicos"
              description="Mantén un historial completo de la salud de tu mascota."
            />
            <FeatureCard
              icon={<Plane size={48} />}
              title="Información de Viaje"
              description="Resumen de vacunas y requisitos para viajar con tu mascota."
            />
            <FeatureCard
              icon={<Bell size={48} />}
              title="Recordatorios"
              description="Notificaciones para vacunas, citas y medicamentos."
            />
            <FeatureCard
              icon={<Shield size={48} />}
              title="Plan de Bienestar Opcional"
              description="Accede a descuentos y reseñas de clínicas asociadas."
            />
            <FeatureCard
              icon={<Heart size={48} />}
              title="Comunidad de Mascotas"
              description="Conecta con otros dueños y comparte experiencias."
            />
          </motion.div>
        </div>
      </section>

      <section className="cta bg-blue-600 text-white py-16">
        <motion.div
          className="container mx-auto px-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">Comienza a Cuidar Mejor a tu Mascota Hoy</h2>
          <p className="text-xl mb-8">Descarga la app gratuita BienPet y descubre cómo podemos ayudarte a mantener a tu mascota feliz y saludable.</p>
          <Button as={Link} to="/download">
            Descargar Ahora
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => {
  return (
    <motion.div variants={itemVariants}>
      <Card>
        <div className="text-green-600 mb-4 flex justify-center">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </Card>
    </motion.div>
  );
};

export default Home;