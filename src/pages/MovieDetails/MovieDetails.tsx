import React, { useEffect, useState } from 'react';
import { MovieFormModal, type MovieFormData } from '../../components/ui/MovieFormModal';
import { useParams, useNavigate } from 'react-router-dom';
import { moviesService, type BackendMovie } from '../../services/movies.service';
import { uploadService } from '../../services/upload.service';
import { MovieHero } from '../../components/MovieHero';
import { MovieTrailer } from '../../components/MovieTrailer';

export const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<BackendMovie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;

      setIsLoading(true);
      try {
        const data = await moviesService.getById(id);
        setMovie(data);
      } catch (error) {
        console.error('Erro ao carregar detalhes do filme:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleEditSubmit = async (data: MovieFormData, file?: File | null) => {
    try {
      if (!id) return;
      setIsLoading(true);

      // Upload da imagem se houver arquivo
      let imageUrl: string = (data.imageUrl ?? '').trim();
      if (file) {
        try {
          imageUrl = await uploadService.uploadImage(file);
        } catch (uploadErr) {
          console.error('Erro no upload da imagem:', uploadErr);
          throw new Error(
            `Falha no upload da imagem: ${uploadErr instanceof Error ? uploadErr.message : 'Erro desconhecido'}`,
          );
        }
      }

      // Converte a data para ISO format
      const releaseDateISO = data.releaseDate
        ? new Date(data.releaseDate + 'T00:00:00.000Z').toISOString()
        : new Date().toISOString();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const payload: any = {
        title: data.title,
        description: data.description,
        duration: Number(data.duration),
        releaseDate: releaseDateISO,
        genre: data.genre,
        director: data.director,
        cast: data.cast
          .split(',')
          .map(s => s.trim())
          .filter(Boolean),
        rating: Number(data.rating),
        imageUrl: imageUrl,
      };

      // Inclui trailerUrl apenas se fornecido
      if (data.trailerUrl && data.trailerUrl.trim().length > 0) {
        payload.trailerUrl = data.trailerUrl.trim();
      }

      await moviesService.update(id, payload);

      // Recarrega os detalhes do filme
      const updatedMovie = await moviesService.getById(id);
      setMovie(updatedMovie);
      setShowEditModal(false);
      alert('Filme atualizado com sucesso!');
    } catch (e) {
      console.error('Erro ao atualizar filme:', e);
      alert(`Falha ao atualizar filme: ${e instanceof Error ? e.message : 'Erro desconhecido'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      if (!id) return;
      if (confirm('Tem certeza que deseja deletar este filme?')) {
        await moviesService.remove(id);
        navigate('/movies');
      }
    } catch (e) {
      console.error('Erro ao deletar filme:', e);
      alert('Falha ao deletar filme.');
    }
  };

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

  const percentage = Math.round(((movie.rating || 0) / 10) * 100);

  return (
    <div
      className='w-full min-h-screen pb-8  bg-cover bg-center bg-no-repeat'
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.6) 20%, #000000 100%), url('/src/assets/images/background-hero.png')`,
      }}
    >
      {/* Modal de edição de filme */}
      <MovieFormModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleEditSubmit}
        initialValues={{
          title: movie.title,
          description: movie.description,
          duration: String(movie.duration || ''),
          releaseDate: movie.releaseDate ? movie.releaseDate.split('T')[0] : '',
          genre: movie.genre || '',
          director: movie.director || '',
          cast: (movie.cast || []).join(', '),
          rating: String(movie.rating ?? ''),
          imageUrl: movie.imageUrl || '',
          trailerUrl: movie.trailerUrl || '',
        }}
        title='Editar Filme'
        submitLabel='Salvar Alterações'
        isLoading={isLoading}
      />

      {/* Seção 1: Hero com detalhes do Filme */}
      <MovieHero
        title={movie.title}
        originalTitle={movie.title}
        posterUrl={movie.imageUrl || '/src/assets/images/background-hero.png'}
        backdropUrl={movie.imageUrl || '/src/assets/images/background-hero.png'}
        overview={movie.description}
        genres={movie.genre ? [{ id: 0, name: movie.genre }] : []}
        votes={0}
        percentage={percentage}
        releaseDate={new Date(movie.releaseDate).toLocaleDateString('pt-BR')}
        runtime={movie.duration}
        budget={0}
        revenue={0}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Seção 2: Trailer */}
      {movie.trailerUrl && <MovieTrailer url={movie.trailerUrl} />}
    </div>
  );
};
