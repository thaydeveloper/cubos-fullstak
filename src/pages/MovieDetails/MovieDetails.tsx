import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tmdbService } from '../../services';
import { MovieHero } from '../../components/MovieHero';
import { MovieTrailer } from '../../components/MovieTrailer';

interface MovieDetail {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  tagline?: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  runtime: number;
  budget: number;
  revenue: number;
  vote_average: number;
  vote_count: number;
  genres: Array<{ id: number; name: string }>;
  videos?: {
    results: Array<{
      key: string;
      site: string;
      type: string;
    }>;
  };
  release_dates?: {
    results: Array<{
      iso_3166_1: string;
      release_dates: Array<{
        certification: string;
        type: number;
      }>;
    }>;
  };
}

export const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;

      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=83ea147b2c26bb1eaddc401dd773722a&language=pt-BR&append_to_response=videos,release_dates`,
        );
        const data = await response.json();
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
    console.log('Editar filme:', id);
  };

  const handleDelete = () => {
    console.log('Deletar filme:', id);
    // Implementar lógica de deleção
    navigate('/movies');
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

  const percentage = Math.round((movie.vote_average / 10) * 100);
  const trailerVideo = movie.videos?.results.find(
    video => video.site === 'YouTube' && video.type === 'Trailer',
  );

  // Buscar certificação brasileira (BR)
  const brRelease = movie.release_dates?.results.find(r => r.iso_3166_1 === 'BR');
  const certification = brRelease?.release_dates.find(rd => rd.certification)?.certification;

  return (
    <div
      className='w-full min-h-screen pb-8  bg-cover bg-center bg-no-repeat'
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.6) 20%, #000000 100%), url('/src/assets/images/background-hero.png')`,
      }}
    >
      {/* Seção 1: Hero com detalhes do Filme */}
      <MovieHero
        title={movie.title}
        originalTitle={movie.original_title}
        tagline={movie.tagline}
        posterUrl={tmdbService.getPosterUrl(movie.poster_path, 'w500')}
        backdropUrl={tmdbService.getBackdropUrl(movie.backdrop_path, 'original')}
        overview={movie.overview}
        genres={movie.genres}
        votes={movie.vote_count}
        percentage={percentage}
        releaseDate={new Date(movie.release_date).toLocaleDateString('pt-BR')}
        runtime={movie.runtime}
        budget={movie.budget || 0}
        revenue={movie.revenue || 0}
        certification={certification}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Seção 2: Trailer */}
      {trailerVideo && <MovieTrailer videoKey={trailerVideo.key} />}
    </div>
  );
};
