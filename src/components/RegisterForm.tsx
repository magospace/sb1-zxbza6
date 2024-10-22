import React from 'react';
import { z } from 'zod';
import Form from './Form';
import { useAuth } from '../hooks/useAuth';
import { useNotifications } from '../hooks/useNotifications';

const registerSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterForm: React.FC = () => {
  const { register } = useAuth();
  const { addNotification } = useNotifications();

  const handleSubmit = async (data: RegisterFormData) => {
    try {
      await register(data);
      addNotification('Registro exitoso', 'success');
    } catch (error) {
      addNotification('Error al registrarse', 'error');
    }
  };

  return (
    <Form<RegisterFormData>
      schema={registerSchema}
      onSubmit={handleSubmit}
      fields={[
        { name: 'name', label: 'Nombre', type: 'text', placeholder: 'Tu nombre' },
        { name: 'email', label: 'Email', type: 'email', placeholder: 'tu@email.com' },
        { name: 'password', label: 'Contraseña', type: 'password', placeholder: '******' },
        { name: 'confirmPassword', label: 'Confirmar Contraseña', type: 'password', placeholder: '******' },
      ]}
      submitText="Registrarse"
    />
  );
};

export default RegisterForm;