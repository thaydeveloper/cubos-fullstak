export interface MovieCardProps {
  id: string | number;
  title: string;
  poster: string;
  rating?: number;
  voteAverage?: number;
  genreIds?: number[];
  // Para itens do backend: o gênero já vem como texto
  genreText?: string;
  isWatching?: boolean;
  progress?: number;
  onClick?: () => void;
}
