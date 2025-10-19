import { TMDB_CONFIG, IMAGE_PLACEHOLDER } from '../constants';

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  isWatching?: boolean;
  progress?: number;
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

class TMDBService {
  private apiKey = TMDB_CONFIG.API_KEY;
  private baseUrl = TMDB_CONFIG.BASE_URL;
  private baseImageUrl = TMDB_CONFIG.IMAGE_BASE_URL;

  /**
   * Busca filmes populares (paginado)
   */
  async getPopularMovies(page: number = 1): Promise<MoviesResponse> {
    try {
      const response = await fetch(
        `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=${TMDB_CONFIG.LANGUAGE}&page=${page}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar filmes populares:', error);
      throw error;
    }
  }

  /**
   * Busca filmes por query
   */
  async searchMovies(query: string, page: number = 1): Promise<MoviesResponse> {
    try {
      const response = await fetch(
        `${this.baseUrl}/search/movie?api_key=${this.apiKey}&language=${TMDB_CONFIG.LANGUAGE}&query=${encodeURIComponent(query)}&page=${page}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
      throw error;
    }
  }

  /**
   * Busca detalhes de um filme
   */
  async getMovieDetails(movieId: number): Promise<Movie | null> {
    try {
      const response = await fetch(
        `${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}&language=${TMDB_CONFIG.LANGUAGE}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar detalhes do filme:', error);
      return null;
    }
  }

  /**
   * Busca filmes em cartaz
   */
  async getNowPlayingMovies(page: number = 1): Promise<MoviesResponse> {
    try {
      const response = await fetch(
        `${this.baseUrl}/movie/now_playing?api_key=${this.apiKey}&language=${TMDB_CONFIG.LANGUAGE}&page=${page}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar filmes em cartaz:', error);
      throw error;
    }
  }

  /**
   * Busca top rated movies
   */
  async getTopRatedMovies(page: number = 1): Promise<MoviesResponse> {
    try {
      const response = await fetch(
        `${this.baseUrl}/movie/top_rated?api_key=${this.apiKey}&language=${TMDB_CONFIG.LANGUAGE}&page=${page}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar filmes top rated:', error);
      throw error;
    }
  }

  /**
   * Busca filmes próximos
   */
  async getUpcomingMovies(page: number = 1): Promise<MoviesResponse> {
    try {
      const response = await fetch(
        `${this.baseUrl}/movie/upcoming?api_key=${this.apiKey}&language=${TMDB_CONFIG.LANGUAGE}&page=${page}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar filmes próximos:', error);
      throw error;
    }
  }

  /**
   * Busca filmes com filtros usando discover endpoint
   */
  async discoverMovies(
    page: number = 1,
    filters?: {
      genre?: string | number;
      yearFrom?: string;
      yearTo?: string;
      ratingMin?: string;
      sortBy?: string;
    },
  ): Promise<MoviesResponse> {
    try {
      const params = new URLSearchParams({
        api_key: this.apiKey,
        language: TMDB_CONFIG.LANGUAGE,
        page: page.toString(),
        sort_by: filters?.sortBy || 'popularity.desc',
      });

      // Gênero
      if (filters?.genre) {
        params.append('with_genres', filters.genre.toString());
      }

      // Ano de lançamento (range)
      if (filters?.yearFrom) {
        params.append('primary_release_date.gte', `${filters.yearFrom}-01-01`);
      }
      if (filters?.yearTo) {
        params.append('primary_release_date.lte', `${filters.yearTo}-12-31`);
      }

      // Avaliação mínima
      if (filters?.ratingMin) {
        params.append('vote_average.gte', filters.ratingMin);
        // Filtrar apenas filmes com votos suficientes para evitar resultados ruins
        params.append('vote_count.gte', '50');
      }

      const response = await fetch(`${this.baseUrl}/discover/movie?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar filmes com filtros:', error);
      throw error;
    }
  }

  /**
   * Gera URL completa para imagem
   */
  getImageUrl(
    path: string,
    size: 'w200' | 'w500' | 'w780' | 'w1280' | 'original' = 'w500',
  ): string {
    if (!path) return IMAGE_PLACEHOLDER; // Placeholder caso não tenha imagem
    return `${this.baseImageUrl}/${size}${path}`;
  }

  /**
   * Gera URL de poster
   */
  getPosterUrl(path: string, size: 'w200' | 'w500' | 'w780' | 'original' = 'w500'): string {
    return this.getImageUrl(path, size);
  }

  /**
   * Gera URL de backdrop
   */
  getBackdropUrl(path: string, size: 'w780' | 'w1280' | 'original' = 'w1280'): string {
    return this.getImageUrl(path, size);
  }
}

export const tmdbService = new TMDBService();
