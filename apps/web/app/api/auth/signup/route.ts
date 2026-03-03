import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { v4 as uuid } from 'uuid';

import { serverDb } from '@/db/server';
import { user } from '@/db/server/schema';

/**
 * POST /api/auth/signup
 * 이메일/비밀번호 기반 회원가입
 * body: { email: string, password: string }
 */
export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: '이메일과 비밀번호를 입력해주세요.' },
        { status: 400 },
      );
    }

    // 이메일 중복 확인
    const [existing] = await serverDb
      .select()
      .from(user)
      .where(eq(user.email, email));

    if (existing) {
      return NextResponse.json(
        { success: false, error: '이미 사용중인 이메일입니다.' },
        { status: 409 },
      );
    }

    // 비밀번호 해시
    const hashedPassword = await bcrypt.hash(password, 12);

    // 유저 생성
    await serverDb.insert(user).values({
      id: uuid(),
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ 회원가입 실패:', error);
    return NextResponse.json(
      { success: false, error: '회원가입에 실패했습니다.' },
      { status: 500 },
    );
  }
}
