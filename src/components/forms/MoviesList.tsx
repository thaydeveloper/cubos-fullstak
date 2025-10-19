import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MovieCard } from '../ui/MovieCard';
import type { Movie } from '../../services';
import { tmdbService } from '../../services';

interface MoviesListProps {
  movies: Movie[];
  isLoading: boolean;
}

export const MoviesList: React.FC<MoviesListProps> = ({ movies, isLoading }) => {
  const navigate = useNavigate();
  const hasMovies = movies.length > 0;

  if (isLoading) {
    return (
      <div className='flex items-center justify-center py-20'>
        <div className='w-12 h-12 border-4 border-[var(--color-purple-950)] border-t-transparent rounded-full animate-spin' />
      </div>
    );
  }

  if (!hasMovies) {
    return (
      <div className='flex flex-col items-center justify-center py-20'>
        <p className='text-[var(--color-input-text)] text-lg mb-2'>Nenhum filme encontrado</p>
        <p className='text-[var(--color-mauve-dark-extra-3)] text-sm'>
          Tente buscar por outro termo
        </p>
      </div>
    );
  }

  return (
    /* Grid de Filmes */
    <div
      className='grid w-full 
      gap-3 grid-cols-2 auto-rows-fr
      md:gap-4 md:grid-cols-3
      lg:gap-4 lg:grid-cols-5 lg:grid-rows-2 lg:auto-rows-auto'
    >
      {movies.slice(0, 10).map(movie => (
        <div key={movie.id} className='w-full aspect-[2/3] max-h-[330px]'>
          <MovieCard
            id={movie.id}
            title={movie.title}
            poster={tmdbService.getPosterUrl(movie.poster_path, 'w500')}
            voteAverage={movie.vote_average}
            genreIds={movie.genre_ids}
            isWatching={movie.isWatching}
            progress={movie.progress}
            onClick={() => navigate(`/movies/${movie.id}`)}
          />
        </div>
      ))}
    </div>
  );
};
