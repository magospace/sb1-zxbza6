import React from 'react';
import { Clipboard, Syringe, Plane, Bell, Search, Users } from 'lucide-react';

const AppFeatures: React.FC = () => {
  const features = [
    {
      icon: <Clipboard size={48} />,
      title: "Registros Médicos Completos",
      description: "Mantén un historial detallado de vacunas, tratamientos y visitas al veterinario."
    },
    {
      icon: <Syringe size={48} />,
      title: "Resumen de Vacunas",
      description: "Visualiza rápidamente el estado de vacunación de tu mascota."
    },
    {
      icon: <Plane size={48} />,
      title: "Información para Viajes",
      description: "Accede a requisitos de viaje y documentación necesaria para tu mascota."
    },
    {
      icon: <Bell size={48} />,
      title: "Recordatorios Personalizados",
      description: "Recibe alertas para vacunas, medicamentos y citas veterinarias."
    },
    {
      icon: <Search size={48} />,
      title: "Búsqueda de Clínicas",
      description: "Encuentra clínicas veterinarias cercanas y lee reseñas de otros usuarios."
    },
    {
      icon: <Users size={48} />,
      title: "Comunidad de Mascotas",
      description: "Conecta con otros dueños de mascotas, comparte consejos y experiencias."
    }
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Características de la App BienPet</h1>
        <p className="text-lg text-center mb-12">
          Descubre todas las herramientas que BienPet ofrece para cuidar mejor a tu mascota.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">¿Listo para empezar?</h2>
          <p className="text-lg mb-6">
            Descarga la app gratuita BienPet y comienza a disfrutar de todas estas características.
          </p>
          <button className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-green-700 transition duration-300">
            Descargar App Gratis
          </button>
        </div>
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <div className="text-green-600 mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default AppFeatures;