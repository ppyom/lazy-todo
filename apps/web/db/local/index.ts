import { drizzle } from 'drizzle-orm/sqlite-proxy';
import * as SQLite from 'wa-sqlite';
import SQLiteAsyncESMFactory from 'wa-sqlite/dist/wa-sqlite-async.mjs';
import { IDBBatchAtomicVFS } from 'wa-sqlite/src/examples/IDBBatchAtomicVFS.js';

import { migrations } from './migrations';
import * as schema from './schema';

const DB_NAME = 'lazy_todo_v1';
const VFS_NAME = 'lazy_todo_v1';

type Engine = { sqlite3: SQLiteAPI; db: number };

let engine: Engine | null = null;

let queryQueue: Promise<unknown> = Promise.resolve();

const enqueue = <T>(fn: () => Promise<T>): Promise<T> => {
  const result = queryQueue.then(fn);
  queryQueue = result.catch(() => {});
  return result;
};

const initEngine = async (): Promise<Engine> => {
  if (engine) return engine;

  const wasmModule = await SQLiteAsyncESMFactory();
  const sqlite3 = SQLite.Factory(wasmModule);
  const vfs = new IDBBatchAtomicVFS(VFS_NAME);
  sqlite3.vfs_register(vfs as Parameters<typeof sqlite3.vfs_register>[0]);
  const db = await sqlite3.open_v2(DB_NAME, undefined, VFS_NAME);
  engine = { sqlite3, db };
  console.log('📦 SQLite Engine: IDBBatchAtomicVFS Mode');
  return engine;
};

export const getDb = async () => {
  const eng = await initEngine();

  return drizzle(
    async (sql, params, method) => {
      return enqueue(async () => {
        try {
          const rows: unknown[] = [];
          for await (const stmt of eng.sqlite3.statements(eng.db, sql)) {
            if (params.length) {
              eng.sqlite3.bind_collection(
                stmt,
                params as SQLiteCompatibleType[],
              );
            }
            while ((await eng.sqlite3.step(stmt)) === SQLite.SQLITE_ROW) {
              rows.push(eng.sqlite3.row(stmt));
            }
          }
          return { rows: method === 'run' ? [] : rows };
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : error;
          console.error('❌ SQLite Proxy Error:', errorMessage);
          throw error;
        }
      });
    },
    { schema },
  );
};

export const runMigrations = async () => {
  if (typeof window === 'undefined') return;

  const eng = await initEngine();
  console.log('🏗️ 마이그레이션 체크 중...');

  try {
    for (const m of migrations) {
      const statements = m
        .split('--> statement-breakpoint')
        .map((s) => s.trim())
        .filter(Boolean);

      for (const statement of statements) {
        const safeSql = statement.replace(
          /CREATE TABLE /gi,
          'CREATE TABLE IF NOT EXISTS ',
        );

        await eng.sqlite3.exec(eng.db, safeSql);
      }
    }
    console.log('✅ 모든 마이그레이션 완료');
  } catch (error) {
    console.error('❌ 마이그레이션 실패:', error);
  }
};
