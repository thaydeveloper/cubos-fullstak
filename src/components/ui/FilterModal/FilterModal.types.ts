export interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: MovieFilters) => void;
}

export interface MovieFilters {
  genre?: number | '';
  yearFrom?: string;
  yearTo?: string;
  ratingMin?: string;
  sortBy?: string;
}
