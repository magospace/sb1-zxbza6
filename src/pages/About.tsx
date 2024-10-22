import React from 'react';
import { Heart, Shield, Users } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Quiénes Somos</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <p className="text-lg mb-6">
            En BienPet, nuestra misión es proporcionar el mejor cuidado posible para las mascotas y tranquilidad para sus dueños. Fundada por un equipo de amantes de los animales y profesionales veterinarios, BienPet nació de la idea de que el cuidado preventivo y la planificación son clave para una vida larga y saludable de nuestras queridas mascotas.
          </p>
          <p className="text-lg mb-6">
            Entendemos que cada mascota es única, y por eso ofrecemos planes de salud personalizados que se adaptan a las necesidades específicas de cada animal. Además, con nuestro innovador Pasaporte de Mascota, facilitamos los viajes y aseguramos que toda la información importante esté siempre a mano.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <ValueCard
            icon={<Heart size={48} className="text-green-600" />}
            title="Pasión por los Animales"
            description="Nuestro amor por las mascotas impulsa todo lo que hacemos, asegurando el mejor cuidado posible."
          />
          <ValueCard
            icon={<Shield size={48} className="text-green-600" />}
            title="Cuidado Preventivo"
            description="Creemos en la importancia de la prevención para mantener a las mascotas saludables y felices."
          />
          <ValueCard
            icon={<Users size={48} className="text-green-600" />}
            title="Comunidad de Cuidado"
            description="Construimos una red de confianza entre dueños, veterinarios y amantes de los animales."
          />
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Únete a la Familia BienPet</h2>
          <p className="text-lg mb-6">
            Descubre cómo podemos ayudarte a cuidar mejor a tu mascota y hacer que los viajes sean más fáciles y seguros.
          </p>
          <button className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-green-700 transition duration-300">
            Explora Nuestros Planes
          </button>
        </div>
      </div>
    </div>
  );
};

const ValueCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <div className="mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default About;