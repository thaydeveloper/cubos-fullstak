/**
 * Opções de ordenação para filtros de filmes
 */
export const SORT_OPTIONS = [
  { value: 'popularity.desc', label: 'Popularidade (Maior)' },
  { value: 'popularity.asc', label: 'Popularidade (Menor)' },
  { value: 'vote_average.desc', label: 'Avaliação (Maior)' },
  { value: 'vote_average.asc', label: 'Avaliação (Menor)' },
  { value: 'release_date.desc', label: 'Lançamento (Mais recente)' },
  { value: 'release_date.asc', label: 'Lançamento (Mais antigo)' },
] as const;

/**
 * Valores padrão para filtros
 */
export const DEFAULT_FILTERS = {
  genre: '',
  yearFrom: '',
  yearTo: '',
  ratingMin: '',
  sortBy: 'popularity.desc',
} as const;
