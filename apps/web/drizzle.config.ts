import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './db/local/schema',
  out: './db/local/migrations',
  dialect: 'sqlite',
});
