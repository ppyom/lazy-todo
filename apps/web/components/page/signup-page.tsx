'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

import { Alert, Button, Input } from '@/components/ui';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !password || !passwordConfirm) {
      setError('모든 항목을 입력해주세요.');
      return;
    }

    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      // 회원가입 완료 후 자동 로그인
      await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      router.replace('/');
    } catch {
      setError('회원가입에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnterKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSignup();
  };

  return (
    <div className="px-4 py-8 flex flex-col gap-6">
      <Alert
        title="Lazy Todo 시작하기 🐢"
        content="내 기록을 어디서든 안전하게 보관해드려요"
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
        <Input
          className="w-full"
          type="password"
          placeholder="비밀번호 확인"
          value={passwordConfirm}
          onChange={({ target }) => setPasswordConfirm(target.value)}
          onKeyDown={handleEnterKeyDown}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>

      <div className="space-y-3">
        <Button
          className="w-full"
          variant="accent"
          onClick={handleSignup}
          disabled={isLoading}
        >
          {isLoading ? '가입 중...' : '회원가입'}
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          이미 계정이 있으신가요?{' '}
          <Link href="/login" className="text-foreground font-medium underline">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
