import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService, type RegisterPayload, type LoginPayload } from '../services/auth.service';

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}

interface AuthActions {
  login: (credentials: LoginPayload) => Promise<void>;
  register: (credentials: RegisterPayload) => Promise<void>;
  refresh: () => Promise<void>;
  logout: () => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

type AuthStore = AuthState & AuthActions;

// Helper para extrair mensagem de erro com segurança
function extractErrorMessage(err: unknown): string {
  if (typeof err === 'string') return err;
  if (err && typeof err === 'object') {
    const anyErr = err as { message?: string; response?: { data?: { message?: string } } };
    return anyErr?.response?.data?.message || anyErr?.message || 'Ocorreu um erro inesperado';
  }
  return 'Ocorreu um erro inesperado';
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      accessToken: null,
      refreshToken: null,

      login: async (credentials: LoginPayload) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.login(credentials);
          if (response.success && response.data) {
            // Salva tokens diretamente no localStorage como strings simples
            const accessToken = response.data.tokens.accessToken;
            const refreshToken = response.data.tokens.refreshToken;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            set({
              user: response.data.user,
              isAuthenticated: true,
              accessToken: accessToken,
              refreshToken: refreshToken,
              isLoading: false,
              error: null,
            });
          } else {
            set({
              error: response.message || 'Erro ao fazer login',
              isLoading: false,
            });
          }
        } catch (err: unknown) {
          set({
            error: extractErrorMessage(err) || 'Erro ao fazer login',
            isLoading: false,
          });
        }
      },

      register: async (credentials: RegisterPayload) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.register(credentials);
          if (response.success && response.data) {
            // Salva tokens diretamente no localStorage
            const accessToken = response.data.tokens.accessToken;
            const refreshToken = response.data.tokens.refreshToken;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            set({
              user: response.data.user,
              isAuthenticated: true,
              accessToken: accessToken,
              refreshToken: refreshToken,
              isLoading: false,
              error: null,
            });
          } else {
            set({
              error: response.message || 'Erro ao fazer cadastro',
              isLoading: false,
            });
          }
        } catch (err: unknown) {
          set({
            error: extractErrorMessage(err) || 'Erro ao fazer cadastro',
            isLoading: false,
          });
        }
      },

      refresh: async () => {
        const refreshToken = localStorage.getItem('refreshToken') || get().refreshToken;
        if (!refreshToken) return;
        set({ isLoading: true, error: null });
        try {
          const response = await authService.refresh({ refreshToken });
          if (response.success && response.data) {
            // Atualiza tokens no localStorage
            const newAccessToken = response.data.tokens.accessToken;
            const newRefreshToken = response.data.tokens.refreshToken;

            localStorage.setItem('accessToken', newAccessToken);
            localStorage.setItem('refreshToken', newRefreshToken);

            set({
              user: response.data.user,
              isAuthenticated: true,
              accessToken: newAccessToken,
              refreshToken: newRefreshToken,
              isLoading: false,
              error: null,
            });
          } else {
            set({
              error: response.message || 'Erro ao atualizar token',
              isLoading: false,
            });
          }
        } catch (err: unknown) {
          set({
            error: extractErrorMessage(err) || 'Erro ao atualizar token',
            isLoading: false,
          });
        }
      },

      logout: () => {
        // Remove tokens do localStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        set({
          user: null,
          isAuthenticated: false,
          accessToken: null,
          refreshToken: null,
          error: null,
        });
      },

      clearError: () => {
        set({ error: null });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'auth-storage',
      // Persiste TUDO exceto loading e error
      partialize: (state: AuthStore) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
      // Força sync com localStorage
      version: 1,
    },
  ),
);
