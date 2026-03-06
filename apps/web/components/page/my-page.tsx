'use client';

import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

import { reviewService } from '@/services/review';
import { todoService } from '@/services/todo';
import { useDb } from '@/hooks/use-db';
import { useSync } from '@/hooks/use-sync';
import { useToast } from '@/hooks/use-toast';
import { Alert, Skeleton } from '@/components/ui';
import { MenuItem, ResetAction, WithdrawAction } from '@/components/my';

function MyPageSkeleton() {
  return (
    <div className="p-4 flex flex-col gap-6">
      <Skeleton className="h-[72px]" />
      <div className="bg-card p-4 rounded-2xl space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-16 rounded-lg" />
          <Skeleton className="h-5 w-40 rounded-lg" />
        </div>
        <div className="h-px bg-secondary" />
        <Skeleton className="h-[46px]" />
      </div>
      <div className="bg-card p-4 rounded-2xl space-y-3">
        <Skeleton className="h-[46px]" />
        <Skeleton className="h-[46px]" />
      </div>
    </div>
  );
}

export default function MyPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const db = useDb();
  const { sync, syncStatus, isOnline } = useSync();
  const toast = useToast();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.replace('/login');
    toast.show('다음에 또 봐요 🌙');
  };

  const handleSync = async () => {
    await sync();
    toast.show(
      syncStatus !== 'error'
        ? '동기화 완료!'
        : '동기화에 실패했어요. 잠시 후 다시 시도해주세요.',
    );
  };

  const handleReset = async () => {
    await todoService.resetTodos(db);
    await reviewService.resetReviews(db);
    toast.show('깨끗하게 비워졌어요 🧹');
  };

  const handleWithdraw = async () => {
    const res = await fetch('/api/auth/withdraw', { method: 'DELETE' });
    if (!res.ok) return;

    await todoService.resetTodos(db);
    await reviewService.resetReviews(db);
    await signOut({ redirect: false });
    router.replace('/login');

    toast.show('그동안 함께해줘서 고마워요 🐢');
  };

  if (status === 'loading') {
    return <MyPageSkeleton />;
  }

  return (
    <div className="p-4 flex flex-col gap-4 overflow-y-auto h-full">
      {status === 'unauthenticated' ? (
        <Alert
          title="기록을 어디서든 불러오고 싶다면"
          content="로그인하면 어느 기기에서든 내 기록을 불러올 수 있어요 ✏️"
        />
      ) : (
        <Alert
          title="오늘도 기록이 차곡차곡 쌓이고 있어요 📚"
          content="기록이 안전하게 서버에 보관되고 있어요."
        />
      )}

      {/* 계정 카드 */}
      <div className="bg-card rounded-2xl shrink-0 overflow-hidden">
        <div className="px-4 pt-4 pb-2">
          <p className="font-medium">계정</p>
        </div>

        {status === 'unauthenticated' ? (
          <>
            <MenuItem
              label="로그인하기"
              description="내 기록을 불러올 수 있어요."
              href="/login"
              disabled={!isOnline}
            />
            <MenuItem
              label="회원가입하기"
              description="새 보관함을 만들 수 있어요."
              href="/signup"
              disabled={!isOnline}
            />
          </>
        ) : (
          <>
            <MenuItem label="로그인 계정" description={session?.user?.email} />
            <MenuItem
              label="로그아웃"
              description="로그아웃 후에도 기록은 기기에 남아있어요."
              onClick={handleSignOut}
              disabled={!isOnline}
            />
          </>
        )}
      </div>

      {/* 데이터 관리 */}
      <div className="bg-card rounded-2xl shrink-0 overflow-hidden">
        <div className="px-4 pt-4 pb-2">
          <p className="font-medium">데이터 관리</p>
        </div>

        {status === 'authenticated' && (
          <MenuItem
            label="즉시 동기화"
            description={
              syncStatus === 'syncing'
                ? '동기화 중...'
                : syncStatus === 'success'
                  ? '동기화 완료!'
                  : syncStatus === 'error'
                    ? '동기화 실패'
                    : '변경된 내용을 서버에 즉시 반영해요.'
            }
            onClick={handleSync}
            disabled={!isOnline}
          />
        )}
        <ResetAction onReset={handleReset} />
      </div>

      {/* 기타 기능들 */}
      {status === 'authenticated' && (
        <div className="bg-card rounded-2xl shrink-0 overflow-hidden">
          <WithdrawAction onWithdraw={handleWithdraw} disabled={!isOnline} />
        </div>
      )}
    </div>
  );
}
