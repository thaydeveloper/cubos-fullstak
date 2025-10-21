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

  const handleGoBack = () => {
    navigate('/movies');
  };

  /**
   * Atualiza um filme específico seguindo a documentação da API
   * PUT /api/movies/{id}
   *
   * Campos obrigatórios:
   * - title, description, duration, releaseDate, genre, director, cast, rating, imageUrl
   *
   * Campos opcionais:
   * - trailerUrl, tagline
   *
   * @param data - Dados do formulário
   * @param file - Arquivo de imagem (opcional, se fornecido faz upload primeiro)
   */
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

      // Valida se temos uma URL de imagem
      if (!imageUrl) {
        throw new Error('Uma URL de imagem válida é obrigatória');
      }

      // Converte a data para ISO format (data completa no formato ISO)
      const releaseDateISO = data.releaseDate
        ? new Date(data.releaseDate + 'T00:00:00.000Z').toISOString()
        : new Date().toISOString();

      // Monta o payload conforme a documentação da API
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
        imageUrl: imageUrl,
        ...(data.trailerUrl &&
          data.trailerUrl.trim().length > 0 && {
            trailerUrl: data.trailerUrl.trim(),
          }),
        ...(data.tagline &&
          data.tagline.trim().length > 0 && {
            tagline: data.tagline.trim(),
          }),
      };

      console.log('Payload enviado para atualização:', payload);

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
      {/* Botão Voltar */}
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

      {/* Modal de edição de filme */}
      <MovieFormModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleEditSubmit}
        initialValues={{
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
        }}
        title='Editar Filme'
        submitLabel='Salvar Alterações'
        isLoading={isLoading}
      />

      {/* Seção 1: Hero com detalhes do Filme */}
      <MovieHero
        title={movie.title}
        originalTitle={movie.title}
        tagline={movie.tagline}
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
