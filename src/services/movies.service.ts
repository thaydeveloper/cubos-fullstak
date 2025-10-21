import { http } from './http';

// Cache simples com TTL para getById
interface CacheEntry {
  data: BackendMovie;
  timestamp: number;
}

const movieCache = new Map<string, CacheEntry>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos

export interface MoviePayload {
  title: string;
  description: string;
  duration: number;
  releaseDate: string; // ISO string
  genre: string;
  director: string;
  cast: string[];
  rating: number;
  imageUrl: string; // URL após upload
  trailerUrl?: string; // URL do trailer (opcional)
  tagline?: string;
}

export interface BackendMovie extends MoviePayload {
  id: string;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
}

export interface MoviesQuery {
  page?: number;
  limit?: number;
  title?: string;
  genre?: string; // ex: 'ação'
  director?: string;
  minDuration?: number;
  maxDuration?: number;
  minRating?: number;
  startDate?: string; // ISO
  endDate?: string; // ISO
}

export interface MoviesPage {
  items: BackendMovie[];
  total: number;
  page: number;
  limit: number;
}

function extractArrayCandidates(input: unknown): BackendMovie[] {
  type UnknownRecord = Record<string, unknown>;
  const tryExtract = (obj: UnknownRecord): BackendMovie[] => {
    const candidates = [
      obj?.data,
      obj?.items,
      obj?.movies,
      obj?.results,
      obj?.content,
      obj?.list,
      obj?.records,
      obj?.rows,
      obj?.docs,
      obj?.payload,
      obj?.value,
      obj?.Data,
      obj?.Items,
      obj?.Movies,
      obj?.Results,
    ];
    for (const c of candidates) if (Array.isArray(c)) return c as BackendMovie[];
    // aninhado em obj.data.*
    const nested = (obj?.data ?? obj?.Data) as unknown;
    if (nested && typeof nested === 'object') return tryExtract(nested as UnknownRecord);
    // fallback: primeira propriedade que seja array
    if (obj && typeof obj === 'object') {
      for (const key of Object.keys(obj)) {
        const v = obj[key];
        if (Array.isArray(v)) return v as BackendMovie[];
      }
    }
    return [];
  };
  if (Array.isArray(input)) return input as BackendMovie[];
  if (input && typeof input === 'object') return tryExtract(input as Record<string, unknown>);
  return [];
}

export const moviesService = {
  async list(params: MoviesQuery = {}): Promise<MoviesPage> {
    const res = await http.get('/movies', { params });
    const { data, headers } = res as {
      data: unknown;
      headers?: Record<string, string>;
    };

    const items = data && typeof data === 'object' ? extractArrayCandidates(data) : [];

    const pick = (obj: unknown, paths: string[]): unknown => {
      for (const p of paths) {
        const parts = p.split('.');
        let cur: unknown = obj;
        for (const part of parts) {
          if (cur && typeof cur === 'object' && part in (cur as Record<string, unknown>))
            cur = (cur as Record<string, unknown>)[part];
          else {
            cur = undefined;
            break;
          }
        }
        if (cur !== undefined && cur !== null) return cur;
      }
      return undefined;
    };

    const toNumber = (v: unknown, fallback: number): number => {
      const n = typeof v === 'string' ? Number(v) : (v as number);
      return Number.isFinite(n as number) ? (n as number) : fallback;
    };

    // Total pode vir por header ou por diversas chaves de meta
    const hdrTotal = headers?.['x-total-count'] ?? headers?.['X-Total-Count'];
    const metaTotal = pick(data, [
      'total',
      'count',
      'totalCount',
      'totalElements',
      'Total',
      'TotalCount',
      'pagination.total',
      'pagination.totalItems',
      'meta.total',
      'meta.totalItems',
      'pageInfo.total',
    ]);
    const total = toNumber(hdrTotal ?? metaTotal, items.length);

    // Página atual
    const metaPage = pick(data, [
      'page',
      'currentPage',
      'Pagination.page',
      'pagination.page',
      'meta.page',
      'meta.currentPage',
      'pageInfo.page',
    ]);
    const page = toNumber(metaPage, params.page ?? 1);

    // Limite (itens por página)
    const metaLimit = pick(data, [
      'limit',
      'perPage',
      'pageSize',
      'pagination.limit',
      'pagination.perPage',
      'meta.limit',
      'meta.perPage',
      'pageInfo.pageSize',
    ]);
    const limit = toNumber(metaLimit, params.limit ?? items.length);

    return { items, total, page, limit };
  },

  async getById(id: string): Promise<BackendMovie> {
    // Verifica cache
    const cached = movieCache.get(id);
    const now = Date.now();

    if (cached && now - cached.timestamp < CACHE_TTL) {
      return cached.data;
    }

    // Busca da API
    const { data } = await http.get(`/movies/${id}`);
    const movie = data?.data || data;

    // Armazena no cache
    movieCache.set(id, { data: movie, timestamp: now });

    return movie;
  },

  async create(payload: MoviePayload): Promise<BackendMovie> {
    // O interceptor já adiciona o token automaticamente
    const { data } = await http.post('/movies', payload);
    return data?.data || data;
  },

  async update(id: string, payload: Partial<MoviePayload>): Promise<BackendMovie> {
    // O interceptor já adiciona o token automaticamente
    const { data } = await http.put(`/movies/${id}`, payload);
    const movie = data?.data || data;

    // Invalida cache ao atualizar
    movieCache.delete(id);

    return movie;
  },

  async remove(id: string): Promise<void> {
    // O interceptor já adiciona o token automaticamente
    await http.delete(`/movies/${id}`);

    // Invalida cache ao deletar
    movieCache.delete(id);
  },
};
