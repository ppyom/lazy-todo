import sqlite3InitModule, {
  type Database,
  type Sqlite3Static,
} from '@sqlite.org/sqlite-wasm';
import { drizzle } from 'drizzle-orm/sqlite-proxy';

import { migrations } from './migrations';
import * as schema from './schema';

let sqliteDb: Database | null = null;

/**
 * 1. SQLite 엔진 초기화 및 저장소 연결
 */
const initEngine = async (): Promise<Database> => {
  if (sqliteDb) return sqliteDb;

  const sqlite3: Sqlite3Static = await sqlite3InitModule();

  // OPFS(Origin Private File System) 사용
  if ('opfs' in sqlite3) {
    sqliteDb = new sqlite3.oo1.OpfsDb('/lazy_todo_v1.sqlite3', 'c');
    console.log('📦 SQLite Engine: OPFS Mode');
  } else {
    // OPFS 미지원 시 로컬스토리지 기반 (JsStorage)
    sqliteDb = new sqlite3.oo1.JsStorageDb('local');
    console.log('📦 SQLite Engine: LocalStorage Mode (Fallback)');
  }

  return sqliteDb;
};

/**
 * 2. Drizzle 인스턴스 (Proxy)
 * Drizzle의 모든 SQL 호출을 SQLite WASM 엔진으로 전달합니다.
 */
export const getDb = async () => {
  const client = await initEngine();

  return drizzle(
    async (sql, params, method) => {
      try {
        // 결과가 필요 없는 실행 (insert, update, delete)
        if (method === 'run') {
          client.exec({ sql, bind: params });
          return { rows: [] };
        }

        // 결과가 필요한 조회 (select)
        const rows: unknown[] = [];
        client.exec({
          sql,
          bind: params,
          rowMode: 'array',
          callback: (row) => {
            rows.push(row);
          },
        });

        return { rows };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : error;
        console.error('❌ SQLite Proxy Error:', errorMessage);
        throw error;
      }
    },
    { schema },
  );
};

/**
 * 3. 런타임 마이그레이션
 */
export const runMigrations = async () => {
  if (typeof window === 'undefined') return;

  const client = await initEngine();
  console.log('🏗️ 마이그레이션 체크 중...');

  try {
    for (const m of migrations) {
      const statements = m
        .split('--> statement-breakpoint')
        .map((s) => s.trim())
        .filter(Boolean);

      for (const statement of statements) {
        // 중복 생성 방지를 위한 처리
        const safeSql = statement.replace(
          /CREATE TABLE /gi,
          'CREATE TABLE IF NOT EXISTS ',
        );
        client.exec(safeSql);
      }
    }
    console.log('✅ 모든 마이그레이션 완료');
  } catch (error) {
    console.error('❌ 마이그레이션 실패:', error);
  }
};
