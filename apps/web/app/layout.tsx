import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';

import { cn } from '@/lib/utils/cn';
import AuthProvider from '@/components/providers/auth-provider';
import DatabaseProvider from '@/components/providers/database-provider';
import ToastProvider from '@/components/providers/toast-provider';
import { TodoListProvider } from '@/components/providers/todo-list-provider';
import TodoRecoveryProvider from '@/components/providers/todo-recovery-provider';

import './globals.css';

export const metadata: Metadata = {
  title: 'Lazy Todo',
  description: '미루는 나를 이해하는 앱',
  icons: {
    icon: [
      { url: '/images/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/favicon.ico' },
    ],
    apple: '/images/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Lazy Todo',
    description: '미루는 나를 이해하는 앱',
    url: 'https://lazy-todo.ppyom.com',
    siteName: 'Lazy Todo',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: 'https://lazy-todo.ppyom.com/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Lazy Todo',
      },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#E8956D',
};

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="ko">
      <body
        className={cn(
          pretendard.variable,
          'h-dvh bg-gray-100 overscroll-none overflow-hidden',
        )}
      >
        <AuthProvider>
          <DatabaseProvider>
            <ToastProvider>
              <TodoListProvider>
                <TodoRecoveryProvider>{children}</TodoRecoveryProvider>
              </TodoListProvider>
            </ToastProvider>
          </DatabaseProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
