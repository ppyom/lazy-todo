import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';

import { cn } from '@/lib/utils/cn';
import AuthProvider from '@/components/providers/auth-provider';
import DatabaseProvider from '@/components/providers/database-provider';
import { TodoListProvider } from '@/components/providers/todo-list-provider';
import TodoRecoveryProvider from '@/components/providers/todo-recovery-provider';

import './globals.css';

export const metadata: Metadata = {
  title: 'Lazy Todo',
  description: 'Lazy Todo',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#ffffff',
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
            <TodoListProvider>
              <TodoRecoveryProvider>{children}</TodoRecoveryProvider>
            </TodoListProvider>
          </DatabaseProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
