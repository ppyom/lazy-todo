import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { eq } from 'drizzle-orm';

import { serverDb } from '@/db/server';
import { user } from '@/db/server/schema';

/**
 * DELETE /api/auth/withdraw
 * 회원탈퇴 - 유저 삭제 (todo, review cascade 삭제)
 */
export async function DELETE(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    if (!token?.id) {
      return NextResponse.json(
        { success: false, error: '인증이 필요합니다.' },
        { status: 401 },
      );
    }

    await serverDb.delete(user).where(eq(user.id, token.id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ 회원탈퇴 실패:', error);
    return NextResponse.json(
      { success: false, error: '회원탈퇴에 실패했습니다.' },
      { status: 500 },
    );
  }
}
