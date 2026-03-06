import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Lazy Todo',
    short_name: 'Lazy Todo',
    description: '미루는 나를 이해하는 앱',
    start_url: '/',
    display: 'standalone',
    background_color: '#eaefef',
    theme_color: '#E8956D',
    orientation: 'portrait',
    icons: [
      {
        src: '/images/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/images/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
