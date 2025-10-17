// User types
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

// Movie types
export interface Movie {
  id: string;
  title: string;
  originalTitle: string;
  description: string;
  releaseDate: string;
  duration: number; // in minutes
  budget: number;
  revenue?: number;
  genres: string[];
  director: string;
  cast: string[];
  posterUrl?: string;
  backdropUrl?: string;
  rating?: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface MovieForm {
  title: string;
  originalTitle: string;
  description: string;
  releaseDate: string;
  duration: number;
  budget: number;
  revenue?: number;
  genres: string[];
  director: string;
  cast: string[];
  posterUrl?: string;
  backdropUrl?: string;
}

// Filter types
export interface MovieFilters {
  search?: string;
  genre?: string;
  minDuration?: number;
  maxDuration?: number;
  startDate?: string;
  endDate?: string;
  sortBy?: 'title' | 'releaseDate' | 'duration' | 'rating';
  sortOrder?: 'asc' | 'desc';
}

// Pagination types
export interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationData;
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Theme types
export type Theme = 'light' | 'dark';

// Component props types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}
