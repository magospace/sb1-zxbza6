import React from 'react';
import { Star } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'María González',
      pet: 'Max',
      rating: 5,
      comment: 'BienPet ha hecho que cuidar de Max sea mucho más fácil. Los recordatorios de vacunas son muy útiles y el pasaporte de mascota nos facilitó mucho nuestro último viaje.',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
    },
    {
      name: 'Carlos Ramírez',
      pet: 'Luna',
      rating: 5,
      comment: 'El plan premium de BienPet es excelente. La limpieza dental incluida mantuvo a Luna saludable y los descuentos en tratamientos especializados nos ahorraron mucho dinero.',
      image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
    },
    {
      name: 'Ana Martínez',
      pet: 'Coco',
      rating: 4,
      comment: 'La app de BienPet es muy intuitiva y útil. Tener toda la información de Coco en un solo lugar nos da mucha tranquilidad. Solo desearía que hubiera más clínicas asociadas en mi área.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Testimonios</h1>
        <p className="text-lg text-center mb-12">
          Descubre lo que nuestros clientes dicen sobre BienPet y cómo hemos mejorado la vida de sus mascotas.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">¿Tienes una historia que compartir?</h2>
          <p className="text-lg mb-6">
            Nos encantaría escuchar sobre tu experiencia con BienPet. Comparte tu historia y ayuda a otros dueños de mascotas a tomar la mejor decisión para sus compañeros peludos.
          </p>
          <button className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-green-700 transition duration-300">
            Compartir Mi Historia
          </button>
        </div>
      </div>
    </div>
  );
};

const TestimonialCard: React.FC<{ name: string; pet: string; rating: number; comment: string; image: string }> = ({ name, pet, rating, comment, image }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <img src={image} alt={name} className="w-12 h-12 rounded-full mr-4" />
        <div>
          <h3 className="font-bold">{name}</h3>
          <p className="text-sm text-gray-600">Dueño de {pet}</p>
        </div>
      </div>
      <div className="flex mb-2">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} size={20} className="text-yellow-400 fill-current" />
        ))}
      </div>
      <p className="text-gray-700">{comment}</p>
    </div>
  );
};

export default Testimonials;