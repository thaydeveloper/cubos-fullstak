export interface MovieFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: MovieFormData) => void;
  isLoading?: boolean;
  initialValues?: Partial<MovieFormData>;
  title?: string;
  submitLabel?: string;
}

export interface MovieFormData {
  title: string;
  originalTitle: string;
  description: string;
  situation: string;
  releaseDate: string;
  budget: string;
  revenue: string;
  originalLanguage: string;
}
