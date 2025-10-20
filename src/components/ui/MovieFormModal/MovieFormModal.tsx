import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import * as Form from '@radix-ui/react-form';
import type { MovieFormModalProps, MovieFormData } from './MovieFormModal.types';
import { Button } from '../Button';
import { Input } from '../Input';

const movieSchema = z.object({
  title: z.string().min(1, 'Nome do filme é obrigatório'),
  originalTitle: z.string().min(1, 'Nome original é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  situation: z.string().min(1, 'Situação é obrigatória'),
  releaseDate: z.string().min(1, 'Data de lançamento é obrigatória'),
  budget: z.string().min(1, 'Orçamento é obrigatório'),
  revenue: z.string().min(1, 'Receita é obrigatória'),
  originalLanguage: z.string().min(1, 'Idioma original é obrigatório'),
});

export const MovieFormModal: React.FC<MovieFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  initialValues = {},
  title = 'Adicionar Filme',
  submitLabel = 'Adicionar Filme',
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MovieFormData>({
    resolver: zodResolver(movieSchema),
    defaultValues: initialValues as MovieFormData,
  });

  useEffect(() => {
    if (isOpen) {
      reset(initialValues as MovieFormData);
    }
  }, [isOpen, initialValues, reset]);

  if (!isOpen) return null;

  const handleFormSubmit = (data: MovieFormData) => {
    onSubmit(data);
    reset();
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  const modalContent = (
    <>
      {/* Backdrop com blur */}
      <div
        className='fixed inset-0 z-[9998]'
        style={{
          backgroundColor: 'rgba(181, 178, 188, 0.25)',
          backdropFilter: 'blur(8px)',
          pointerEvents: 'auto',
        }}
        onClick={handleCancel}
      />

      {/* Modal - Lateral direita */}
      <div className='fixed inset-y-0 right-0 z-[9999] flex items-stretch pointer-events-auto'>
        <div
          className='relative w-full max-w-[480px] flex flex-col h-full shadow-2xl'
          style={{
            backgroundColor: '#232225',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRight: 'none',
          }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className='flex items-center justify-between px-5 py-4 border-b border-white/10 flex-shrink-0'>
            <h2
              className='text-white text-start flex-1 text-xl font-normal leading-none tracking-normal'
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              {title}
            </h2>
            <button
              onClick={handleCancel}
              className='text-white/60 hover:text-white transition-colors text-2xl leading-none'
              aria-label='Fechar'
            >
              ×
            </button>
          </div>

          {/* Content - Scrollable */}
          <div className='flex-1 overflow-y-auto px-5 py-4'>
            <Form.Root onSubmit={handleSubmit(handleFormSubmit)} className='flex flex-col gap-3'>
              {/* Campo Nome do Filme */}
              <Form.Field name='title'>
                <Input
                  {...register('title')}
                  type='text'
                  label='Nome do Filme'
                  placeholder='Digite o nome do filme'
                  error={errors.title?.message}
                  fullWidth
                />
              </Form.Field>

              {/* Campo Nome Original */}
              <Form.Field name='originalTitle'>
                <Input
                  {...register('originalTitle')}
                  type='text'
                  label='Nome Original'
                  placeholder='Digite o nome original'
                  error={errors.originalTitle?.message}
                  fullWidth
                />
              </Form.Field>

              {/* Campo Descrição */}
              <Form.Field name='description'>
                <div className='flex flex-col gap-1 w-full'>
                  <label
                    htmlFor='description'
                    className='text-xs font-medium text-[var(--color-mauve-dark-300)] block'
                  >
                    Descrição
                  </label>
                  <textarea
                    {...register('description')}
                    id='description'
                    placeholder='Digite a descrição do filme'
                    rows={4}
                    className='w-full px-3 py-2 text-sm bg-[var(--color-input-bg)] border rounded-[4px] text-[var(--color-input-text)] placeholder-[var(--color-mauve-dark-extra-3)]/60 transition-all duration-200 outline-none caret-[var(--color-input-border-focus)] focus:border-[var(--color-input-border-focus)] resize-none'
                    style={{
                      borderColor: errors.description
                        ? 'rgb(239, 68, 68)'
                        : 'var(--color-input-border)',
                    }}
                  />
                  {errors.description && (
                    <span className='text-xs text-red-400 mt-1'>{errors.description.message}</span>
                  )}
                </div>
              </Form.Field>

              {/* Campo Situação */}
              <Form.Field name='situation'>
                <Input
                  {...register('situation')}
                  type='text'
                  label='Situação'
                  placeholder='Ex: Lançado, Em produção, etc.'
                  error={errors.situation?.message}
                  fullWidth
                />
              </Form.Field>

              {/* Campo Data de Lançamento */}
              <Form.Field name='releaseDate'>
                <Input
                  {...register('releaseDate')}
                  type='date'
                  label='Data de Lançamento'
                  error={errors.releaseDate?.message}
                  fullWidth
                />
              </Form.Field>

              {/* Campo Orçamento */}
              <Form.Field name='budget'>
                <Input
                  {...register('budget')}
                  type='text'
                  label='Orçamento'
                  placeholder='Ex: 100000000'
                  error={errors.budget?.message}
                  fullWidth
                />
              </Form.Field>

              {/* Campo Receita */}
              <Form.Field name='revenue'>
                <Input
                  {...register('revenue')}
                  type='text'
                  label='Receita'
                  placeholder='Ex: 500000000'
                  error={errors.revenue?.message}
                  fullWidth
                />
              </Form.Field>

              {/* Campo Idioma Original */}
              <Form.Field name='originalLanguage'>
                <Input
                  {...register('originalLanguage')}
                  type='text'
                  label='Idioma Original'
                  placeholder='Ex: en, pt, es'
                  error={errors.originalLanguage?.message}
                  fullWidth
                />
              </Form.Field>
            </Form.Root>
          </div>

          {/* Footer - Fixed at bottom */}
          <div className='flex justify-end gap-2 px-5 py-4 border-t border-white/10 flex-shrink-0'>
            <Button
              variant='secondary'
              onClick={handleCancel}
              disabled={isLoading}
              style={{
                width: '90px',
                minWidth: '90px',
                height: '40px',
                minHeight: '40px',
                borderRadius: '2px',
                opacity: 1,
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit(handleFormSubmit)}
              isLoading={isLoading}
              className='min-w-[130px] h-10 rounded-[2px] text-center font-normal text-sm leading-none tracking-normal'
              style={{
                background: '#8E4EC6',
                fontFamily: 'Roboto, sans-serif',
              }}
            >
              {submitLabel}
            </Button>
          </div>
        </div>
      </div>
    </>
  );

  return createPortal(modalContent, document.body);
};
