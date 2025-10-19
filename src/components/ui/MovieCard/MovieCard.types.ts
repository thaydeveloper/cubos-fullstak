export interface MovieCardProps {
  id: number;
  title: string;
  poster: string;
  rating?: number;
  voteAverage?: number;
  genreIds?: number[];
  isWatching?: boolean;
  progress?: number;
  onClick?: () => void;
}
