import React from 'react';
import { z } from 'zod';
import Form from './Form';
import { useAuth } from '../hooks/useAuth';
import { useNotifications } from '../hooks/useNotifications';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const { addNotification } = useNotifications();

  const handleSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      addNotification('Inicio de sesión exitoso', 'success');
    } catch (error) {
      addNotification('Error al iniciar sesión', 'error');
    }
  };

  return (
    <Form<LoginFormData>
      schema={loginSchema}
      onSubmit={handleSubmit}
      fields={[
        { name: 'email', label: 'Email', type: 'email', placeholder: 'tu@email.com' },
        { name: 'password', label: 'Contraseña', type: 'password', placeholder: '******' },
      ]}
      submitText="Iniciar Sesión"
    />
  );
};

export default LoginForm;