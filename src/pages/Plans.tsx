import React from 'react';
import { Check } from 'lucide-react';

const Plans: React.FC = () => {
  const plans = [
    {
      name: 'Básico',
      price: '$299',
      features: [
        'Consultas veterinarias ilimitadas',
        'Vacunas esenciales',
        'Desparasitación',
        'Pasaporte de Mascota digital',
      ],
    },
    {
      name: 'Premium',
      price: '$499',
      features: [
        'Todo lo del plan Básico',
        'Exámenes de sangre anuales',
        'Limpieza dental',
        'Descuentos en tratamientos especializados',
        'Pasaporte de Mascota físico y digital',
      ],
    },
    {
      name: 'Viajero',
      price: '$699',
      features: [
        'Todo lo del plan Premium',
        'Certificados internacionales de salud',
        'Asistencia para viajes internacionales',
        'Seguro de viaje para mascotas',
        'Pasaporte de Mascota premium con actualizaciones prioritarias',
      ],
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Nuestros Planes</h1>
        <p className="text-lg text-center mb-12">
          Elige el plan perfecto para ti y tu mascota. Todos los planes incluyen acceso a nuestra red de clínicas asociadas y la app BienPet.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PlanCard key={index} {...plan} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">¿No estás seguro de qué plan elegir?</h2>
          <p className="text-lg mb-6">
            Nuestros expertos pueden ayudarte a encontrar el plan perfecto para ti y tu mascota.
          </p>
          <button className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-green-700 transition duration-300">
            Contáctanos para Asesoría
          </button>
        </div>
      </div>
    </div>
  );
};

const PlanCard: React.FC<{ name: string; price: string; features: string[] }> = ({ name, price, features }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 flex flex-col">
      <h3 className="text-2xl font-bold mb-4">{name}</h3>
      <p className="text-4xl font-bold text-green-600 mb-6">{price}<span className="text-base font-normal text-gray-600">/mes</span></p>
      <ul className="mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center mb-2">
            <Check size={20} className="text-green-600 mr-2" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button className="w-full bg-green-600 text-white py-3 rounded-full font-semibold hover:bg-green-700 transition duration-300">
        Elegir Plan
      </button>
    </div>
  );
};

export default Plans;