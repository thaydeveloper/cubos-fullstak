import React, { useState, useEffect, useCallback } from 'react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { MoviesList } from '../components/forms/MoviesList';
import { Pagination } from '../components/ui/Pagination';
import { tmdbService, type Movie } from '../services';
import SearchIcon from '../assets/icons/Search.svg';

export const MoviesContainer: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Carrega filmes ao montar e quando página/busca mudar
  const loadMovies = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = searchQuery
        ? await tmdbService.searchMovies(searchQuery, currentPage)
        : await tmdbService.getPopularMovies(currentPage);

      console.log('API Response:', response); // Debug
      console.log('Movies count:', response.results.length); // Debug

      setMovies(response.results);
      // TMDB tem limite de 500 páginas
      setTotalPages(Math.min(response.total_pages, 500));
    } catch (error) {
      console.error('Erro ao carregar filmes:', error);
      setMovies([]);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, searchQuery]);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  const handleAddMovie = () => {
    // TODO: Implementar lógica de adicionar filme
    console.log('Add movie clicked');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset para primeira página ao buscar
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className='flex flex-col w-full min-h-screen py-0 sm:py-0'>
      {/* Header: Search + Filters + Add Movie */}
      <div className='w-full flex flex-col md:flex-row md:justify-end gap-2 sm:gap-2.5 px-4 my-6 flex-shrink-0 max-w-[1322px] mx-auto'>
        {/* Search Input */}
        <div className='w-full md:w-[444px]'>
          <Input
            type='text'
            placeholder='Pesquise por filmes'
            value={searchQuery}
            onChange={e => handleSearch(e.target.value)}
            rightIcon={
              <img
                src={SearchIcon}
                alt='Search'
                className='w-5 h-5'
                style={{
                  filter:
                    'invert(76%) sepia(5%) saturate(414%) hue-rotate(233deg) brightness(89%) contrast(88%)',
                }}
              />
            }
            className='h-[44px]'
          />
        </div>

        {/* Botões lado a lado no mobile */}
        <div className='flex md:hidden gap-2 w-full'>
          {/* Filters Button (Mobile) */}
          <Button
            variant='secondary'
            onClick={() => setShowFilters(!showFilters)}
            className='h-[44px] filter-button'
            style={{ width: '136px', minWidth: '136px' }}
          >
            Filtros
          </Button>

          {/* Add Movie Button (Mobile) */}
          <Button variant='primary' onClick={handleAddMovie} className='h-[44px] flex-1'>
            Adicionar Filme
          </Button>
        </div>

        {/* Filters Button (Desktop) */}
        <Button
          variant='secondary'
          onClick={() => setShowFilters(!showFilters)}
          className='hidden md:flex h-[44px] filter-button'
        >
          Filtros
        </Button>

        {/* Add Movie Button (Desktop) */}
        <Button variant='primary' onClick={handleAddMovie} className='hidden md:flex h-[44px]'>
          Adicionar Filme
        </Button>
      </div>

      {/* Wrapper para Container + Paginação */}
      <div className='flex flex-col items-center w-full max-w-[1322px] mx-auto gap-3 lg:gap-4 md:px-4 pb-4 lg:pb-6'>
        {/* Container com filmes - APENAS O GRID */}
        <div
          className='w-full px-2.5 md:px-3 lg:px-4 py-2.5 md:py-3 lg:py-3.5 md:rounded-[4px]'
          style={{
            backgroundColor: 'rgba(235, 234, 248, 0.08)',
            backdropFilter: 'blur(4px)',
          }}
        >
          <MoviesList movies={movies} isLoading={isLoading} />
        </div>

        {!isLoading && movies.length > 0 && (
          <div className='w-full flex justify-center'>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};
