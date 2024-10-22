import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { motion, AnimatePresence } from 'framer-motion';

const schema = z.object({
  comment: z.string().min(1, 'El comentario no puede estar vacío'),
});

type FormData = z.infer<typeof schema>;

interface Comment {
  id: string;
  user: string;
  content: string;
}

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (comment: Omit<Comment, 'id'>) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments, onAddComment }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    onAddComment({ user: 'Current User', content: data.comment });
    reset();
  };

  return (
    <div>
      <h3 className="font-semibold mb-2">Comentarios</h3>
      <AnimatePresence>
        {comments.map((comment) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-2"
          >
            <span className="font-semibold">{comment.user}: </span>
            <span>{comment.content}</span>
          </motion.div>
        ))}
      </AnimatePresence>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex">
        <Input
          {...register('comment')}
          placeholder="Añade un comentario..."
          className="flex-grow mr-2"
        />
        <Button type="submit">Comentar</Button>
      </form>
      {errors.comment && <p className="text-red-500 mt-2">{errors.comment.message}</p>}
    </div>
  );
};

export default CommentSection;