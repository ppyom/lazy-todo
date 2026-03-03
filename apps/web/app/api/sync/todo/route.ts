import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { eq, sql } from 'drizzle-orm';

import { serverDb } from '@/db/server';
import { todo } from '@/db/server/schema';
import type { Todo } from '@/types/todo';

/**
 * POST /api/sync/todo
 * 로컬에서 서버로 Push
 * body: { items: Todo[] }
 */
export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    if (!token?.id) {
      return NextResponse.json(
        { success: false, error: '인증이 필요합니다.' },
        { status: 401 },
      );
    }
    const { items }: { items: Todo[] } = await req.json();

    if (!items?.length) {
      return NextResponse.json({ success: true, count: 0 });
    }

    await serverDb
      .insert(todo)
      .values(
        items.map((item) => ({
          id: item.id,
          userId: token.id,
          content: item.content,
          status: item.status,
          deferCount: item.deferCount,
          deferReason: item.deferReason,
          createdAt: new Date(item.createdAt),
          updatedAt: new Date(item.updatedAt),
          deletedAt: item.deletedAt ? new Date(item.deletedAt) : null,
        })),
      )
      .onConflictDoUpdate({
        target: todo.id,
        // Conflict Resolution: updated_at 기준 최신 데이터 우선
        set: {
          content: sql`excluded.content`,
          status: sql`excluded.status`,
          deferCount: sql`excluded.defer_count`,
          deferReason: sql`excluded.defer_reason`,
          updatedAt: sql`excluded.updated_at`,
          deletedAt: sql`excluded.deleted_at`,
        },
        setWhere: sql`excluded.updated_at > ${todo.updatedAt}`,
      });

    return NextResponse.json({ success: true, count: items.length });
  } catch (error) {
    console.error('❌ Todo Push 실패:', error);
    return NextResponse.json(
      { success: false, error: 'Push 실패' },
      { status: 500 },
    );
  }
}

/**
 * GET /api/sync/todo
 * 서버에서 로컬로 Pull
 */
export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    if (!token?.id) {
      return NextResponse.json(
        { success: false, error: '인증이 필요합니다.' },
        { status: 401 },
      );
    }

    // 해당 유저 데이터만 Pull
    const items = await serverDb
      .select()
      .from(todo)
      .where(eq(todo.userId, token.id));

    return NextResponse.json({ success: true, items });
  } catch (error) {
    console.error('❌ Todo Pull 실패:', error);
    return NextResponse.json(
      { success: false, error: 'Pull 실패' },
      { status: 500 },
    );
  }
}
