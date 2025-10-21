import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MovieCard } from '../ui/MovieCard';

type BackendMovieListItem = {
  id: string;
  title: string;
  imageUrl?: string;
  rating?: number;
  genre?: string;
};

interface MoviesListProps {
  movies: Array<BackendMovieListItem>;
  isLoading: boolean;
}

export const MoviesList: React.FC<MoviesListProps> = ({ movies, isLoading }) => {
  const navigate = useNavigate();
  const safeMovies = (Array.isArray(movies) ? movies : []).slice(0, 10);
  const hasMovies = safeMovies.length > 0;

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
      style={{ gridAutoFlow: 'row' }}
    >
      {safeMovies.map(item => {
        const id = item.id;
        const title = item.title;
        const poster = item.imageUrl || '/src/assets/images/background-hero.png';
        const rating = item.rating;
        const genreText = item.genre || '';

        return (
          <div key={id} className='w-full aspect-[2/3] max-h-[330px]'>
            <MovieCard
              id={id}
              title={title}
              poster={poster}
              rating={rating}
              genreText={genreText}
              onClick={() => navigate(`/movies/${id}`)}
            />
          </div>
        );
      })}
    </div>
  );
};
