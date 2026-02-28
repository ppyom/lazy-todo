'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

import { Alert, Button, Input } from '@/components/ui';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('이메일 또는 비밀번호가 올바르지 않습니다.');
        return;
      }

      router.replace('/');
    } catch {
      setError('로그인에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnterKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <div className="px-4 py-8 flex flex-col gap-6">
      <Alert
        title="다시 만나서 반가워요 👋"
        content="내 기록이 기다리고 있어요"
      />

      <div className="space-y-3">
        <Input
          className="w-full"
          type="email"
          placeholder="이메일"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          onKeyDown={handleEnterKeyDown}
        />
        <Input
          className="w-full"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          onKeyDown={handleEnterKeyDown}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>

      <div className="space-y-3">
        <Button
          className="w-full"
          variant="accent"
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? '로그인 중...' : '로그인'}
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          아직 계정이 없으신가요?{' '}
          <Link
            href="/signup"
            className="text-foreground font-medium underline"
          >
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
