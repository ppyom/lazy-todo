import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';

import { serverDb } from '@/db/server';
import { user } from '@/db/server/schema';

export const authConfig: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: '이메일', type: 'email' },
        password: { label: '비밀번호', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const [found] = await serverDb
          .select()
          .from(user)
          .where(eq(user.email, credentials.email));

        if (!found) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          found.password,
        );
        if (!isValid) return null;

        return { id: found.id, email: found.email };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    session({ session, token }) {
      if (token.id) session.user.id = token.id;
      return session;
    },
  },
};
