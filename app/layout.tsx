import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import '../src/cabin.css';

export const metadata: Metadata = {
  title: 'Velumbra',
  description: 'Velumbra: prólogo interativo de um jogo de tarô e horror em pixel art.',
  icons: { icon: '/brand/velumbra-icon.png' },
};

export const viewport: Viewport = { themeColor: '#100d0d' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preload" as="image" href="/art/cabin-pixel.png" />
        <link rel="preload" as="image" href="/art/elder-pixel.png" />
        <link rel="preload" as="font" type="font/ttf" href="/fonts/velumbra.ttf" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
