/**
 * Configurações da API do Backend
 */
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
} as const;

/**
 * Placeholder para imagens não disponíveis
 */
export const IMAGE_PLACEHOLDER = '/placeholder-movie.jpg';
