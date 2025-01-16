'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { NavigationFormData } from '@/types/navigation';
import { TrashIcon, SearchIcon } from '../IconComponents';

const schema: z.ZodSchema<NavigationFormData> = z.lazy(() =>
  z.object({
    label: z.string().min(1, 'Nazwa jest wymagana'),
    url: z
      .string()
      .transform(str => str.trim())
      .refine(
        val => {
          if (!val) return true;
          try {
            if (val.startsWith('/')) return true;
            new URL(val);
            return true;
          } catch {
            return false;
          }
        },
        { message: 'Nieprawidłowy format URL' }
      ),
    children: z.array(schema).optional(),
  })
);

interface Props {
  initialData?: NavigationFormData;
  onSubmit: (data: NavigationFormData) => void;
  onClose: () => void;
}

export default function NavigationForm({
  initialData,
  onSubmit,
  onClose,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NavigationFormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData,
    mode: 'onChange',
  });

  return (
    <div className="glass-card p-4 md:p-6 mx-4 md:mx-6 my-4 relative animate-scale max-w-full md:w-auto border border-border-primary">
      <button
        onClick={onClose}
        className="absolute right-4 top-4 text-text-tertiary hover:text-text-secondary"
      >
        <TrashIcon className="hover:text-red-500 transition-colors" />
      </button>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-[95%]">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">
            Nazwa
          </label>
          <input
            {...register('label')}
            className="w-full p-2 border border-border-primary rounded text-base font-normal placeholder-text-placeholder focus:outline-none focus:ring-2 focus:ring-button-primary-bg shadow-custom"
            placeholder="Nazwa pozycji"
          />
          {errors.label && (
            <span className="text-red-500 text-sm">{errors.label.message}</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">
            Link
          </label>
          <div className="relative">
            <input
              {...register('url')}
              className={`w-full pl-10 p-2 border border-border-primary rounded text-base font-normal placeholder-text-placeholder focus:outline-none focus:ring-2 focus:ring-button-primary-bg  shadow-custom ${
                errors.url ? 'border-red-500' : ''
              }`}
              placeholder="Wklej link"
            />
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          {errors.url && (
            <span className="text-red-500 text-sm">{errors.url.message}</span>
          )}
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="button-hover px-4 py-2 text-sm font-semibold text-button-secondary-fg glass-card rounded-md"
          >
            Anuluj
          </button>
          <button
            type="submit"
            className="button-hover px-4 py-2 text-sm font-semibold text-button-primary-bg glass-card rounded-md"
          >
            {initialData ? 'Zapisz' : 'Dodaj'}
          </button>
        </div>
      </form>
    </div>
  );
}
