import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './db/server/schema',
  out: './db/server/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
