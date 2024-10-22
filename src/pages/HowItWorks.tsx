import React from 'react';
import { Clipboard, Stethoscope, Plane, Bell } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <Clipboard size={48} className="text-green-600" />,
      title: "1. Elige tu Plan",
      description: "Selecciona el plan que mejor se adapte a las necesidades de tu mascota y tu estilo de vida."
    },
    {
      icon: <Stethoscope size={48} className="text-green-600" />,
      title: "2. Visita Nuestras Clínicas",
      description: "Accede a nuestra red de clínicas asociadas para chequeos regulares y cuidado preventivo."
    },
    {
      icon: <Plane size={48} className="text-green-600" />,
      title: "3. Crea el Pasaporte de Mascota",
      description: "Genera un pasaporte digital con toda la información importante de tu mascota para viajes y emergencias."
    },
    {
      icon: <Bell size={48} className="text-green-600" />,
      title: "4. Recibe Recordatorios",
      description: "Obtén notificaciones para vacunas, chequeos y otros cuidados importantes para tu mascota."
    }
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Cómo Funciona BienPet</h1>
        <p className="text-lg text-center mb-12">
          Cuidar de tu mascota nunca ha sido tan fácil. Sigue estos simples pasos para comenzar con BienPet.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <StepCard key={index} {...step} />
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4">Beneficios Adicionales</h2>
          <ul className="list-disc list-inside space-y-2 mb-6">
            <li>Acceso a la app BienPet para gestionar la salud de tu mascota</li>
            <li>Consultas veterinarias en línea para dudas rápidas</li>
            <li>Descuentos en productos y servicios de nuestros socios</li>
            <li>Comunidad de dueños de mascotas para compartir experiencias</li>
          </ul>
          <p className="text-lg mb-6">
            Con BienPet, tienes todo lo que necesitas para cuidar de tu mascota en un solo lugar. Nuestro enfoque integral asegura que tu compañero peludo reciba el mejor cuidado posible.
          </p>
          <div className="text-center">
            <button className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-green-700 transition duration-300">
              Comienza Ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StepCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <div className="mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default HowItWorks;