import React from 'react';
import { Check, Star } from 'lucide-react';

const WellnessPlan: React.FC = () => {
  const benefits = [
    "Descuentos exclusivos en servicios veterinarios",
    "Acceso a reseñas detalladas de clínicas asociadas",
    "Consultas veterinarias en línea ilimitadas",
    "Prioridad en citas y atención al cliente",
    "Contenido educativo premium sobre cuidado de mascotas",
    "Seguimiento personalizado de la salud de tu mascota"
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Plan de Bienestar BienPet</h1>
        <p className="text-lg text-center mb-12">
          Mejora la experiencia de cuidado de tu mascota con nuestro plan de bienestar premium.
        </p>

        <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Beneficios del Plan de Bienestar</h2>
          <ul className="space-y-4">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <Check size={24} className="text-green-600 mr-2 flex-shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 text-center">
            <p className="text-3xl font-bold text-green-600 mb-4">$19.99 / mes</p>
            <button className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-green-700 transition duration-300">
              Suscribirse al Plan de Bienestar
            </button>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-8">Lo que dicen nuestros usuarios del Plan de Bienestar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              name="María González"
              comment="Los descuentos en servicios veterinarios han sido increíbles. ¡He ahorrado mucho dinero!"
              rating={5}
            />
            <TestimonialCard
              name="Carlos Ramírez"
              comment="Las consultas en línea son muy convenientes. Siempre obtengo respuestas rápidas a mis preguntas."
              rating={4}
            />
            <TestimonialCard
              name="Ana Martínez"
              comment="El seguimiento personalizado de la salud de mi perro me da mucha tranquilidad. Altamente recomendado."
              rating={5}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const TestimonialCard: React.FC<{ name: string; comment: string; rating: number }> = ({ name, comment, rating }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex mb-2">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} size={20} className="text-yellow-400 fill-current" />
        ))}
      </div>
      <p className="text-gray-700 mb-4">"{comment}"</p>
      <p className="font-semibold">{name}</p>
    </div>
  );
};

export default WellnessPlan;