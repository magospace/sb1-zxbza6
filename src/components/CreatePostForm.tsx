import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { motion } from 'framer-motion';

const schema = z.object({
  content: z.string().min(1, 'El contenido es requerido'),
  image: z.string().url('URL de imagen inválida').optional().or(z.literal('')),
});

type FormData = z.infer<typeof schema>;

interface CreatePostFormProps {
  onCreatePost: (post: { user: string; content: string; image: string }) => void;
  initialContent?: string;
  onCancel?: () => void;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onCreatePost, initialContent = '', onCancel }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { content: initialContent },
  });

  const onSubmit = (data: FormData) => {
    onCreatePost({ user: 'Current User', ...data });
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-6 bg-white rounded-lg shadow-md p-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Textarea
        {...register('content')}
        placeholder="¿Qué estás pensando?"
        className="mb-4"
      />
      {errors.content && <p className="text-red-500 mb-2">{errors.content.message}</p>}
      <Input
        {...register('image')}
        placeholder="URL de la imagen (opcional)"
        className="mb-4"
      />
      {errors.image && <p className="text-red-500 mb-2">{errors.image.message}</p>}
      <div className="flex justify-end">
        {onCancel && (
          <Button type="button" onClick={onCancel} variant="outline" className="mr-2">
            Cancelar
          </Button>
        )}
        <Button type="submit">
          {initialContent ? 'Actualizar' : 'Publicar'}
        </Button>
      </div>
    </motion.form>
  );
};

export default CreatePostForm;