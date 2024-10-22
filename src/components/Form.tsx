import React from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface FormProps<T extends FieldValues> {
  schema: z.ZodType<T>;
  onSubmit: SubmitHandler<T>;
  fields: Array<{
    name: keyof T;
    label: string;
    type: string;
    placeholder?: string;
  }>;
  submitText: string;
}

const Form = <T extends FieldValues>({ schema, onSubmit, fields, submitText }: FormProps<T>) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<T>({
    resolver: zodResolver(schema),
  });

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {fields.map((field) => (
        <div key={field.name as string}>
          <label htmlFor={field.name as string} className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
          </label>
          <Input
            {...register(field.name as string)}
            type={field.type}
            placeholder={field.placeholder}
            error={errors[field.name]?.message as string}
          />
        </div>
      ))}
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Enviando...' : submitText}
      </Button>
    </motion.form>
  );
};

export default Form;