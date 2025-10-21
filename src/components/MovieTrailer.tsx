import React from 'react';

interface MovieTrailerProps {
  url: string; // URL do trailer do backend
}

function toEmbedUrl(input: string): string | null {
  if (!input) return null;
  try {
    const url = new URL(input);
    const host = url.hostname.replace(/^www\./, '');

    // Already an embed URL
    if (host.includes('youtube.com') && url.pathname.startsWith('/embed/')) return url.toString();
    if (host.includes('player.vimeo.com') && url.pathname.startsWith('/video/'))
      return url.toString();

    // YouTube patterns
    if (host.includes('youtube.com')) {
      const v = url.searchParams.get('v');
      if (v) return `https://www.youtube.com/embed/${v}`;
      // shorts or other paths
      const parts = url.pathname.split('/').filter(Boolean);
      // e.g., /shorts/<id>
      if (parts[0] === 'shorts' && parts[1]) return `https://www.youtube.com/embed/${parts[1]}`;
    }
    if (host === 'youtu.be') {
      const id = url.pathname.replace('/', '');
      if (id) return `https://www.youtube.com/embed/${id}`;
    }

    // Vimeo
    if (host.includes('vimeo.com')) {
      const id = url.pathname.split('/').filter(Boolean)[0];
      if (id && /^\d+$/.test(id)) return `https://player.vimeo.com/video/${id}`;
    }

    // Fallback: if it's an http(s) URL but not recognized, return as-is
    return url.toString();
  } catch {
    // Not a valid URL
    return null;
  }
}

export const MovieTrailer: React.FC<MovieTrailerProps> = ({ url }) => {
  const src = toEmbedUrl(url);
  if (!src) return null;

  return (
    <div className='w-full max-w-[1302px] mx-auto px-4 lg:px-0'>
      <h2 className='text-white font-montserrat font-semibold text-2xl mb-4'>Trailer</h2>
      <div className='relative w-full' style={{ paddingBottom: '56.25%' }}>
        <iframe
          className='absolute inset-0 w-full h-full rounded-lg'
          src={src}
          title='Trailer player'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        />
      </div>
    </div>
  );
};
