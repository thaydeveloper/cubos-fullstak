import { http } from './http';
import type { AxiosRequestConfig } from 'axios';

export interface UploadResponse {
  success: boolean;
  message: string;
  data: {
    imageUrl: string;
  };
}

export const uploadService = {
  async uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('image', file);

    // Lê o token diretamente do localStorage (string simples)
    const token = localStorage.getItem('accessToken');

    if (!token) {
      throw new Error('Usuário não autenticado. Faça login novamente.');
    }

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await http.post('/upload/image', formData, config);

    // Extrai a URL da estrutura: { data: { imageUrl: "..." } }
    const { data } = response;
    const url =
      (data as { data?: { imageUrl?: string } })?.data?.imageUrl ||
      (data as { imageUrl?: string })?.imageUrl ||
      (data as { url?: string })?.url ||
      '';

    if (!url) {
      console.error(
        'Estrutura da resposta não reconhecida. Response completo:',
        JSON.stringify(response, null, 2),
      );
      throw new Error('URL de imagem não retornada pelo backend');
    }
    return url;
  },
};
