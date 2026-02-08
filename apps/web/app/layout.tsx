import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Lazy Todo',
  description: 'Lazy Todo',
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
