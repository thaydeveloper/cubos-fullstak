import axios from 'axios';
import { useAuthStore } from '../store/authStore';

// Usa a URL do backend definida no .env; se ausente, cai no mesmo fallback usado em auth.service.ts
const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL ||
  'https://bernarda-unscratching-unalleviatingly.ngrok-free.dev/api';

export const http = axios.create({
  baseURL: API_BASE_URL,
  // Evita a página de aviso do ngrok nas chamadas XHR
  headers: { 'ngrok-skip-browser-warning': 'true' },
});

// Inicializa Authorization a partir do store (para requests feitas antes do primeiro interceptor rodar)
try {
  const tokenInit = useAuthStore.getState().accessToken;
  if (tokenInit) {
    http.defaults.headers.common.Authorization = `Bearer ${tokenInit}`;
  }
} catch {
  /* ignore */
}

// Mantém o header Authorization sincronizado quando o token muda no store
try {
  let lastToken: string | null | undefined = useAuthStore.getState().accessToken;
  useAuthStore.subscribe(state => {
    const token: string | null = state.accessToken;
    if (token !== lastToken) {
      if (token) {
        http.defaults.headers.common.Authorization = `Bearer ${token}`;
      } else {
        delete (http.defaults.headers.common as Record<string, unknown>).Authorization;
      }
      lastToken = token;
    }
  });
} catch {
  /* ignore */
}

http.interceptors.request.use(config => {
  // Lê o token diretamente do localStorage (string simples)
  const token = localStorage.getItem('accessToken');

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Garante o header do ngrok mesmo se sobrescrito posteriormente
  config.headers = config.headers || {};
  if (!('ngrok-skip-browser-warning' in config.headers)) {
    (config.headers as Record<string, string>)['ngrok-skip-browser-warning'] = 'true';
  }

  // Para hosts ngrok, também adiciona o parâmetro de query para evitar a página de aviso
  const base = API_BASE_URL;
  if (base.includes('ngrok-free.dev')) {
    const currentParams = (config.params ?? {}) as Record<string, unknown>;
    if (!('ngrok-skip-browser-warning' in currentParams)) {
      config.params = { ...currentParams, 'ngrok-skip-browser-warning': 'true' };
    }
  }

  return config;
});

// Interceptor de resposta: tenta refresh automático em 401/403 e repete a requisição
let isRefreshing = false;
let pendingQueue: Array<(token: string | null) => void> = [];

const processQueue = (token: string | null) => {
  pendingQueue.forEach(cb => cb(token));
  pendingQueue = [];
};

http.interceptors.response.use(
  response => response,
  async error => {
    const originalConfig = error?.config as { _retry?: boolean; headers?: Record<string, string> };
    const status = error?.response?.status as number | undefined;

    if ((status === 401 || status === 403) && !originalConfig?._retry) {
      originalConfig._retry = true;

      if (isRefreshing) {
        // Espera o refresh em andamento e reexecuta depois
        const token = await new Promise<string | null>(resolve => {
          pendingQueue.push(resolve);
        });
        if (token)
          originalConfig.headers = {
            ...(originalConfig.headers || {}),
            Authorization: `Bearer ${token}`,
          };
        return http(originalConfig);
      }

      isRefreshing = true;
      try {
        // Usa o store para executar o refresh e pegar o novo token
        const store = useAuthStore.getState();
        await store.refresh();
        const newToken = useAuthStore.getState().accessToken || null;
        processQueue(newToken);
        isRefreshing = false;

        if (newToken) {
          originalConfig.headers = {
            ...(originalConfig.headers || {}),
            Authorization: `Bearer ${newToken}`,
          };
        }
        return http(originalConfig);
      } catch (refreshErr) {
        processQueue(null);
        isRefreshing = false;
        // Faz logout para limpar credenciais inválidas
        try {
          useAuthStore.getState().logout();
        } catch {
          /* ignore */
        }
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  },
);
