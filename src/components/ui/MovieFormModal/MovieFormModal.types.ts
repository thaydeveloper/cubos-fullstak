export interface MovieFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: MovieFormData, file?: File | null) => void;
  isLoading?: boolean;
  initialValues?: Partial<MovieFormData>;
  title?: string;
  submitLabel?: string;
}

export interface MovieFormData {
  title: string;
  tagline?: string;
  description: string;
  duration: string; // minutos
  releaseDate: string; // yyyy-mm-dd
  genre: string;
  director: string;
  cast: string; // separado por vírgulas
  rating: string; // 0-10
  imageUrl?: string; // URL da imagem (opcional quando houver arquivo)
  trailerUrl?: string; // URL do trailer (opcional)
}
