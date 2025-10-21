import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL ||
  'https://bernarda-unscratching-unalleviatingly.ngrok-free.dev/api';

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RefreshPayload {
  refreshToken: string;
}

export interface FieldError {
  field?: string;
  message: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: {
      id: string;
      name: string;
      email: string;
      createdAt: string;
    };
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  };
  errors?: FieldError[];
}

export const authService = {
  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const { data } = await axios.post(`${API_BASE_URL}/auth/register`, payload);
    return data;
  },

  async login(payload: LoginPayload): Promise<AuthResponse> {
    const { data } = await axios.post(`${API_BASE_URL}/auth/login`, payload);
    return data;
  },

  async refresh(payload: RefreshPayload): Promise<AuthResponse> {
    const { data } = await axios.post(`${API_BASE_URL}/auth/refresh`, payload);
    return data;
  },
};
