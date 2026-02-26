import type { getDb } from '@/db/local';

export type DbInstance = Awaited<ReturnType<typeof getDb>>;
