import React from 'react';
import { z } from 'zod';
import { Mail, Phone, MapPin } from 'lucide-react';
import Form from '../components/Form';
import { useNotifications } from '../hooks/useNotifications';

const contactSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  email: z.string().email('Email inválido'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact: React.FC = () => {
  const { addNotification } = useNotifications();

  const handleSubmit = async (data: ContactFormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form data:', data);
      addNotification('Mensaje enviado con éxito', 'success');
    } catch (error) {
      addNotification('Error al enviar el mensaje', 'error');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Contáctanos</h1>
        <p className="text-lg text-center mb-12">
          Estamos aquí para ayudarte. No dudes en contactarnos si tienes alguna pregunta o necesitas asistencia.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Envíanos un mensaje</h2>
            <Form<ContactFormData>
              schema={contactSchema}
              onSubmit={handleSubmit}
              fields={[
                { name: 'name', label: 'Nombre', type: 'text', placeholder: 'Tu nombre' },
                { name: 'email', label: 'Email', type: 'email', placeholder: 'tu@email.com' },
                { name: 'message', label: 'Mensaje', type: 'textarea', placeholder: 'Tu mensaje' },
              ]}
              submitText="Enviar Mensaje"
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Información de contacto</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="text-green-600 mr-2" />
                <span>info@bienpet.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="text-green-600 mr-2" />
                <span>+1 (123) 456-7890</span>
              </div>
              <div className="flex items-center">
                <MapPin className="text-green-600 mr-2" />
                <span>123 Calle Principal, Ciudad, País</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;