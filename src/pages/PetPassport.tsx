import React from 'react';
import { Clipboard, FileText, Bell } from 'lucide-react';

const PetPassport: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Pasaporte de Mascota de BienPet</h1>
        <h2 className="text-2xl text-center mb-12">Viaja Tranquilo con tu Mejor Amigo</h2>

        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <p className="text-lg mb-6">
            Con el Pasaporte de Mascota de BienPet, puedes almacenar y compartir fácilmente todos los detalles médicos y certificados de tu mascota. Esto te permitirá cumplir con los requisitos de aerolíneas y países, facilitando el proceso de viaje. Además, recibirás recordatorios para mantener toda la información actualizada.
          </p>

          <h3 className="text-2xl font-semibold mb-4">Características del Pasaporte de Mascota:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FileText size={40} />}
              title="Perfil Completo"
              features={[
                "Información del dueño y la mascota",
                "Vacunas, tratamientos y condiciones especiales",
                "Documentos oficiales, como certificados de salud y vacunas"
              ]}
            />
            <FeatureCard
              icon={<Clipboard size={40} />}
              title="Funcionalidades Clave"
              features={[
                "Copia-Rápida para compartir la información en segundos",
                "Generar PDF del Pasaporte para enviarlo vía email o imprimirlo",
                "Recordatorios Automáticos de próximas vacunas o tratamientos"
              ]}
            />
            <FeatureCard
              icon={<Bell size={40} />}
              title="Recordatorios"
              features={[
                "Alertas para próximas vacunas",
                "Notificaciones de citas médicas",
                "Recordatorios de tratamientos preventivos"
              ]}
            />
          </div>
        </div>

        <div className="text-center">
          <button className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-green-700 transition duration-300">
            Crear Pasaporte de Mascota
          </button>
        </div>
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; features: string[] }> = ({ icon, title, features }) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
      <div className="text-green-600 mb-4 flex justify-center">{icon}</div>
      <h4 className="text-xl font-semibold mb-4">{title}</h4>
      <ul className="list-disc list-inside">
        {features.map((feature, index) => (
          <li key={index} className="mb-2 text-gray-700">{feature}</li>
        ))}
      </ul>
    </div>
  );
};

export default PetPassport;