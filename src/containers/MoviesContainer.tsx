import React, { useState, useEffect, useCallback } from 'react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { FilterModal } from '../components/ui/FilterModal';
import type { MovieFilters } from '../components/ui/FilterModal';
import { MovieFormModal, type MovieFormData } from '../components/ui/MovieFormModal';
import { MoviesList } from '../components/forms/MoviesList';
import { Pagination } from '../components/ui/Pagination';
import {
  moviesService,
  type MoviePayload,
  type BackendMovie,
  type MoviesQuery,
} from '../services/movies.service';
import { uploadService } from '../services/upload.service';
import { GENRES } from '../constants';
import SearchIcon from '../assets/icons/Search.svg';

export const MoviesContainer: React.FC = () => {
  const [movies, setMovies] = useState<BackendMovie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddMovie, setShowAddMovie] = useState(false);
  const [activeFilters, setActiveFilters] = useState<MovieFilters | null>(null);

  // Constrói os parâmetros de consulta do backend a partir do estado local
  const buildQuery = useCallback((): MoviesQuery => {
    const params: MoviesQuery = { page: currentPage, limit: 10 };
    if (searchQuery) params.title = searchQuery;
    if (activeFilters) {
      const { genre, yearFrom, yearTo, ratingMin } = activeFilters;
      if (genre && typeof genre === 'number') {
        const g = GENRES.find(x => x.id === genre);
        if (g?.name) params.genre = g.name.toLowerCase();
      }
      if (ratingMin) {
        const minRating = Number(ratingMin);
        if (!Number.isNaN(minRating)) params.minRating = minRating;
      }
      // Converter anos para intervalos ISO
      const yFrom = yearFrom ? Number(yearFrom) : undefined;
      const yTo = yearTo ? Number(yearTo) : undefined;
      if (yFrom && !Number.isNaN(yFrom)) {
        params.startDate = `${yFrom}-01-01T00:00:00.000Z`;
      }
      if (yTo && !Number.isNaN(yTo)) {
        params.endDate = `${yTo}-12-31T23:59:59.999Z`;
      }
    }
    return params;
  }, [activeFilters, currentPage, searchQuery]);

  // Carrega filmes do backend ao montar e quando página/busca/filtros mudarem
  const loadMovies = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = buildQuery();
      const page = await moviesService.list(params);
      setMovies(page.items);
      const totalPages = page.limit > 0 ? Math.max(1, Math.ceil(page.total / page.limit)) : 1;
      setTotalPages(totalPages);
    } catch (error) {
      console.error('Erro ao carregar filmes:', error);
      setMovies([]);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  }, [buildQuery]);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  const handleAddMovie = () => {
    setShowAddMovie(true);
  };

  const handleSubmitMovie = async (data: MovieFormData, file?: File | null) => {
    try {
      setIsLoading(true);
      // Se houver arquivo, faz upload; senão usa a URL informada (já validada no modal)
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

      // Converte a data para ISO format (YYYY-MM-DDTHH:mm:ss.sssZ)
      const releaseDateISO = data.releaseDate
        ? new Date(data.releaseDate + 'T00:00:00.000Z').toISOString()
        : new Date().toISOString();

      const payload: MoviePayload = {
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
        (payload as MoviePayload).trailerUrl = data.trailerUrl.trim();
      }

      try {
        await moviesService.create(payload);
      } catch (createErr) {
        console.error('Erro ao criar filme:', createErr);
        throw new Error(
          `Falha ao criar filme: ${createErr instanceof Error ? createErr.message : 'Erro desconhecido'}`,
        );
      }

      // Recarrega lista para refletir o novo item
      await loadMovies();
      alert('Filme adicionado com sucesso!');
      setShowAddMovie(false);
    } catch (err) {
      console.error('Erro geral ao adicionar filme:', err);
      alert(
        `Falha ao adicionar filme: ${err instanceof Error ? err.message : 'Erro desconhecido'}`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset para primeira página ao buscar
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleApplyFilters = (filters: MovieFilters) => {
    setActiveFilters(filters);
    setCurrentPage(1); // Reset para primeira página ao aplicar filtros
    setSearchQuery(''); // Limpa busca quando aplica filtros
  };

  return (
    <div className='flex flex-col w-full min-h-screen py-0 sm:py-0'>
      {/* Modal de Filtros */}
      <FilterModal
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        onApplyFilters={handleApplyFilters}
      />

      {/* Modal de Adicionar/Editar Filme */}
      <MovieFormModal
        isOpen={showAddMovie}
        onClose={() => setShowAddMovie(false)}
        onSubmit={handleSubmitMovie}
        isLoading={isLoading}
        title='Adicionar Filme'
        submitLabel='Adicionar Filme'
      />

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
            style={{ width: '98px', minWidth: '98px' }}
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
          style={{ width: '98px', minWidth: '98px' }}
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
