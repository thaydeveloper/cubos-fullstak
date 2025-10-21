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
  tagline: z.string().optional(),
  description: z.string().min(1, 'Descrição é obrigatória'),
  duration: z
    .string()
    .min(1, 'Duração é obrigatória')
    .refine(v => !Number.isNaN(Number(v)) && Number(v) > 0, 'Informe a duração em minutos'),
  releaseDate: z.string().min(1, 'Data de lançamento é obrigatória'),
  genre: z.string().min(1, 'Gênero é obrigatório'),
  director: z.string().min(1, 'Diretor é obrigatório'),
  cast: z.string(),
  rating: z
    .string()
    .min(1, 'Avaliação é obrigatória')
    .refine(v => !Number.isNaN(Number(v)) && Number(v) >= 0 && Number(v) <= 10, 'De 0 a 10'),
  // A URL será validada quando presente; regra de obrigatoriedade depende da presença de arquivo
  imageUrl: z.string().url('Informe uma URL válida (https://...)').optional().or(z.literal('')),
  trailerUrl: z.string().url('Informe uma URL válida (https://...)').optional().or(z.literal('')),
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
  const [file, setFile] = React.useState<File | null>(null);
  const emptyValues: MovieFormData = {
    title: '',
    tagline: '',
    description: '',
    duration: '',
    releaseDate: '',
    genre: '',
    director: '',
    cast: '',
    rating: '',
    imageUrl: '',
    trailerUrl: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<MovieFormData>({
    resolver: zodResolver(movieSchema),
    defaultValues: { ...emptyValues, ...(initialValues as Partial<MovieFormData>) },
  });

  useEffect(() => {
    if (isOpen) {
      reset({ ...emptyValues, ...(initialValues as Partial<MovieFormData>) });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFormSubmit = (data: MovieFormData) => {
    // Se não há arquivo selecionado, a URL passa a ser obrigatória
    const hasFile = !!file;
    const hasUrl = !!data.imageUrl && data.imageUrl.trim().length > 0;

    if (!hasFile && !hasUrl) {
      setError('imageUrl', {
        type: 'manual',
        message: 'Informe a URL da imagem quando não selecionar um arquivo',
      });
      return;
    }

    onSubmit(data, file);
    reset();
    setFile(null);
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

              {/* Campo Tagline */}
              <Form.Field name='tagline'>
                <Input
                  {...register('tagline')}
                  type='text'
                  label='Tagline (opcional)'
                  placeholder='Digite a tagline do filme'
                  error={errors.tagline?.message}
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

              {/* Campo Duração (minutos) */}
              <Form.Field name='duration'>
                <Input
                  {...register('duration')}
                  type='number'
                  label='Duração (minutos)'
                  placeholder='Ex: 120'
                  error={errors.duration?.message}
                  fullWidth
                />
              </Form.Field>

              {/* Campo Gênero */}
              <Form.Field name='genre'>
                <Input
                  {...register('genre')}
                  type='text'
                  label='Gênero'
                  placeholder='Ex: Drama'
                  error={errors.genre?.message}
                  fullWidth
                />
              </Form.Field>

              {/* Campo Diretor */}
              <Form.Field name='director'>
                <Input
                  {...register('director')}
                  type='text'
                  label='Diretor'
                  placeholder='Ex: Denis Villeneuve'
                  error={errors.director?.message}
                  fullWidth
                />
              </Form.Field>

              {/* Campo Elenco (separado por vírgulas) */}
              <Form.Field name='cast'>
                <Input
                  {...register('cast')}
                  type='text'
                  label='Elenco (separe por vírgulas)'
                  placeholder='Ex: Ator 1, Atriz 2, Ator 3'
                  error={errors.cast?.message}
                  fullWidth
                />
              </Form.Field>

              {/* Campo Avaliação (0 a 10) */}
              <Form.Field name='rating'>
                <Input
                  {...register('rating')}
                  type='number'
                  step='0.1'
                  min='0'
                  max='10'
                  label='Avaliação (0 a 10)'
                  placeholder='Ex: 7.5'
                  error={errors.rating?.message}
                  fullWidth
                />
              </Form.Field>

              {/* Campo URL da Imagem */}
              <Form.Field name='imageUrl'>
                <Input
                  {...register('imageUrl')}
                  type='url'
                  label='URL da Imagem'
                  placeholder='https://...'
                  error={errors.imageUrl?.message}
                  fullWidth
                />
              </Form.Field>

              {/* Campo URL do Trailer (opcional) */}
              <Form.Field name='trailerUrl'>
                <Input
                  {...register('trailerUrl')}
                  type='url'
                  label='URL do Trailer (opcional)'
                  placeholder='https://youtube.com/watch?v=...'
                  error={errors.trailerUrl?.message}
                  fullWidth
                />
              </Form.Field>

              {/* Upload de Imagem (opcional) */}
              <div className='flex flex-col gap-1 w-full'>
                <label className='text-xs font-medium text-[var(--color-mauve-dark-300)] block'>
                  Ou selecione um arquivo de imagem
                </label>
                <input
                  type='file'
                  accept='image/*'
                  onChange={e => setFile(e.target.files?.[0] || null)}
                  className='w-full text-sm text-[var(--color-input-text)]'
                />
                <span className='text-xs text-[var(--color-mauve-dark-extra-3)]/60'>
                  Se você enviar um arquivo, a URL não é obrigatória (o arquivo terá prioridade).
                </span>
              </div>
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
