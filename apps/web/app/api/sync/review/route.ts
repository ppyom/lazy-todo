import { NextRequest, NextResponse } from 'next/server';
import { sql } from 'drizzle-orm';

import { serverDb } from '@/db/server';
import { review } from '@/db/server/schema';
import type { Review } from '@/types/review';

/**
 * POST /api/sync/review
 * 로컬에서 서버로 Push
 * body: { items: Review[] }
 */
export async function POST(req: NextRequest) {
  try {
    const { items }: { items: Review[] } = await req.json();

    if (!items?.length) {
      return NextResponse.json({ success: true, count: 0 });
    }

    await serverDb
      .insert(review)
      .values(
        items.map((item) => ({
          id: item.id,
          emoji: item.emoji,
          comment: item.comment,
          createdAt: new Date(item.createdAt),
          updatedAt: new Date(item.updatedAt),
          deletedAt: item.deletedAt ? new Date(item.deletedAt) : null,
        })),
      )
      .onConflictDoUpdate({
        target: review.id,
        // Conflict Resolution: updated_at 기준 최신 데이터 우선
        set: {
          emoji: sql`excluded.emoji`,
          comment: sql`excluded.comment`,
          updatedAt: sql`excluded.updated_at`,
          deletedAt: sql`excluded.deleted_at`,
        },
        setWhere: sql`excluded.updated_at > ${review.updatedAt}`,
      });

    return NextResponse.json({ success: true, count: items.length });
  } catch (error) {
    console.error('❌ Review Push 실패:', error);
    return NextResponse.json(
      { success: false, error: 'Push 실패' },
      { status: 500 },
    );
  }
}

/**
 * GET /api/sync/review
 * 서버에서 로컬로 Pull
 */
export async function GET() {
  try {
    const items = await serverDb.select().from(review);

    return NextResponse.json({ success: true, items });
  } catch (error) {
    console.error('❌ Review Pull 실패:', error);
    return NextResponse.json(
      { success: false, error: 'Pull 실패' },
      { status: 500 },
    );
  }
}
