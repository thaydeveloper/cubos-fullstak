import React, { useCallback, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { moviesService, type MoviePayload } from '../services/movies.service';
import { uploadService } from '../services/upload.service';
import { MovieHero } from '../components/MovieHero';
import { MovieTrailer } from '../components/MovieTrailer';
import { MovieFormModal, type MovieFormData } from '../components/ui/MovieFormModal';
import { ConfirmModal } from '../components/ui/ConfirmModal';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const MovieDetailsContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { data: movie, isLoading } = useQuery({
    queryKey: ['movie', id],
    queryFn: ({ signal }: { signal?: AbortSignal }) => moviesService.getById(id!, signal),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });

  const [isDeleting, setIsDeleting] = useState(false);

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<MoviePayload> }) =>
      moviesService.update(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['movie', id] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => moviesService.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['movies'] }),
  });

  const handleEdit = useCallback(() => setShowEditModal(true), []);
  const handleGoBack = useCallback(() => navigate('/movies'), [navigate]);

  const handleEditSubmit = useCallback(
    async (data: MovieFormData, file?: File | null) => {
      if (!id) return;
      try {
        let imageUrl: string = (data.imageUrl ?? '').trim();
        if (file) imageUrl = await uploadService.uploadImage(file);
        if (!imageUrl) throw new Error('Uma URL de imagem válida é obrigatória');
        const releaseDateISO = data.releaseDate
          ? new Date(data.releaseDate + 'T00:00:00.000Z').toISOString()
          : new Date().toISOString();
        const payload = {
          title: data.title.trim(),
          description: data.description.trim(),
          duration: Number(data.duration),
          releaseDate: releaseDateISO,
          genre: data.genre.trim(),
          director: data.director.trim(),
          cast: data.cast
            .split(',')
            .map(s => s.trim())
            .filter(Boolean),
          rating: Number(data.rating),
          imageUrl,
          ...(data.trailerUrl &&
            data.trailerUrl.trim().length > 0 && { trailerUrl: data.trailerUrl.trim() }),
          ...(data.tagline && data.tagline.trim().length > 0 && { tagline: data.tagline.trim() }),
        };
  await updateMutation.mutateAsync({ id, payload });
  setShowEditModal(false);
  alert('Filme atualizado com sucesso!');
      } catch (e) {
        alert(`Falha ao atualizar filme: ${e instanceof Error ? e.message : 'Erro desconhecido'}`);
      }
    },
    [id, updateMutation],
  );

  const handleDelete = useCallback(() => setShowDeleteModal(true), []);
  const confirmDelete = useCallback(async () => {
    if (!id) return;
    try {
      setIsDeleting(true);
      await deleteMutation.mutateAsync(id);
      navigate('/movies');
    } catch (e) {
      alert(`Falha ao deletar filme: ${e instanceof Error ? e.message : 'Erro desconhecido'}`);
    } finally {
      setShowDeleteModal(false);
      setIsDeleting(false);
    }
  }, [id, deleteMutation, navigate]);

  const percentage = useMemo(
    () => (movie ? Math.round(((movie.rating || 0) / 10) * 100) : 0),
    [movie],
  );
  const genres = useMemo(
    () => (movie?.genre ? [{ id: 0, name: movie.genre }] : []),
    [movie?.genre],
  );
  const initialValues = useMemo(() => {
    if (!movie) return undefined;
    return {
      title: movie.title,
      tagline: movie.tagline,
      description: movie.description,
      duration: String(movie.duration || ''),
      releaseDate: movie.releaseDate ? movie.releaseDate.split('T')[0] : '',
      genre: movie.genre || '',
      director: movie.director || '',
      cast: (movie.cast || []).join(', '),
      rating: String(movie.rating ?? ''),
      imageUrl: movie.imageUrl || '',
      trailerUrl: movie.trailerUrl || '',
    };
  }, [movie]);
  const formattedReleaseDate = useMemo(
    () => (movie ? new Date(movie.releaseDate).toLocaleDateString('pt-BR') : ''),
    [movie],
  );

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='w-12 h-12 border-4 border-[var(--color-purple-950)] border-t-transparent rounded-full animate-spin' />
      </div>
    );
  }
  if (!movie) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <p className='text-white text-xl'>Filme não encontrado</p>
      </div>
    );
  }
  return (
    <div
      className='w-full min-h-screen pb-8 bg-cover bg-center bg-no-repeat'
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.6) 20%, #000000 100%), url('/src/assets/images/background-hero.png')`,
      }}
    >
      <div className='w-full max-w-[1342px] mx-auto px-4 pt-4'>
        <button
          onClick={handleGoBack}
          className='flex items-center gap-2 text-white hover:text-purple-400 transition-colors duration-200 font-montserrat font-medium text-sm group'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5 transform group-hover:-translate-x-1 transition-transform duration-200'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 19l-7-7 7-7'
            />
          </svg>
          Voltar para Filmes
        </button>
      </div>
      <MovieFormModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleEditSubmit}
        initialValues={initialValues}
        title='Editar Filme'
        submitLabel='Salvar Alterações'
        isLoading={isLoading}
      />
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title='Excluir Filme'
        message={`Tem certeza que deseja excluir o filme "${movie.title}"? Esta ação não pode ser desfeita.`}
        confirmLabel='Excluir'
        cancelLabel='Cancelar'
        isLoading={isDeleting}
      />
      <MovieHero
        title={movie.title}
        originalTitle={movie.title}
        tagline={movie.tagline}
        posterUrl={movie.imageUrl || '/src/assets/images/background-hero.png'}
        backdropUrl={movie.imageUrl || '/src/assets/images/background-hero.png'}
        overview={movie.description}
        genres={genres}
        votes={0}
        percentage={percentage}
        releaseDate={formattedReleaseDate}
        runtime={movie.duration}
        budget={0}
        revenue={0}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {movie.trailerUrl && <MovieTrailer url={movie.trailerUrl} />}
    </div>
  );
};
