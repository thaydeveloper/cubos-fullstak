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
  private apiKey = '83ea147b2c26bb1eaddc401dd773722a';
  private baseUrl = 'https://api.themoviedb.org/3';
  private baseImageUrl = 'https://image.tmdb.org/t/p';

  /**
   * Busca filmes populares (paginado)
   */
  async getPopularMovies(page: number = 1): Promise<MoviesResponse> {
    try {
      const response = await fetch(
        `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=pt-BR&page=${page}`,
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
        `${this.baseUrl}/search/movie?api_key=${this.apiKey}&language=pt-BR&query=${encodeURIComponent(query)}&page=${page}`,
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
        `${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}&language=pt-BR`,
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
        `${this.baseUrl}/movie/now_playing?api_key=${this.apiKey}&language=pt-BR&page=${page}`,
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
        `${this.baseUrl}/movie/top_rated?api_key=${this.apiKey}&language=pt-BR&page=${page}`,
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
        `${this.baseUrl}/movie/upcoming?api_key=${this.apiKey}&language=pt-BR&page=${page}`,
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
   * Gera URL completa para imagem
   */
  getImageUrl(
    path: string,
    size: 'w200' | 'w500' | 'w780' | 'w1280' | 'original' = 'w500',
  ): string {
    if (!path) return '/placeholder-movie.jpg'; // Placeholder caso não tenha imagem
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
