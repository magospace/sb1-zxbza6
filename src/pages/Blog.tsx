import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';

const Blog: React.FC = () => {
  const blogPosts = [
    {
      title: 'Consejos para viajar con tu mascota',
      excerpt: 'Descubre cómo hacer que los viajes con tu mascota sean seguros y divertidos...',
      date: '15 de Mayo, 2023',
      author: 'Dr. María Rodríguez',
      image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
      title: 'La importancia de la nutrición en mascotas',
      excerpt: 'Una dieta balanceada es clave para la salud y longevidad de tu compañero peludo...',
      date: '3 de Junio, 2023',
      author: 'Lic. Carlos Gómez',
      image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
      title: 'Cuidados dentales para perros y gatos',
      excerpt: 'Aprende cómo mantener la salud dental de tu mascota y prevenir problemas futuros...',
      date: '22 de Junio, 2023',
      author: 'Dra. Ana Martínez',
      image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Blog de BienPet</h1>
        <p className="text-lg text-center mb-12">
          Descubre consejos, noticias y artículos sobre el cuidado de tus mascotas.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <BlogPostCard key={index} {...post} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition duration-300 flex items-center justify-center mx-auto">
            Ver Más Artículos
            <ArrowRight size={20} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

const BlogPostCard: React.FC<{ title: string; excerpt: string; date: string; author: string; image: string }> = ({ title, excerpt, date, author, image }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{excerpt}</p>
        <div className="flex items-center text-sm text-gray-500">
          <Calendar size={16} className="mr-2" />
          <span className="mr-4">{date}</span>
          <User size={16} className="mr-2" />
          <span>{author}</span>
        </div>
      </div>
    </div>
  );
};

export default Blog;