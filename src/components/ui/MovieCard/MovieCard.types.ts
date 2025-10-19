export interface MovieCardProps {
  id: number;
  title: string;
  poster: string;
  rating?: number;
  isWatching?: boolean;
  progress?: number;
  onClick?: () => void;
}
