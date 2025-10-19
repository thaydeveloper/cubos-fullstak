/**
 * Configurações da API do TMDB
 */
export const TMDB_CONFIG = {
  API_KEY: '83ea147b2c26bb1eaddc401dd773722a',
  BASE_URL: 'https://api.themoviedb.org/3',
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',
  LANGUAGE: 'pt-BR',
  MAX_PAGES: 500, // Limite de páginas da API do TMDB
} as const;

/**
 * Tamanhos de imagem disponíveis no TMDB
 */
export const IMAGE_SIZES = {
  poster: ['w200', 'w500', 'w780', 'original'] as const,
  backdrop: ['w780', 'w1280', 'original'] as const,
} as const;

/**
 * Placeholder para imagens não disponíveis
 */
export const IMAGE_PLACEHOLDER = '/placeholder-movie.jpg';
