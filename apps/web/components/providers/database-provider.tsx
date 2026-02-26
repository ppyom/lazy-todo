'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { getDb, runMigrations } from '@/db/local';

type DbInstance = Awaited<ReturnType<typeof getDb>>;

const DatabaseContext = createContext<DbInstance | null>(null);

export default function DatabaseProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [db, setDb] = useState<DbInstance | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await runMigrations(); // 1. 테이블 생성
        const instance = await getDb(); // 2. DB 인스턴스 획득
        setDb(instance);
        setIsReady(true);
      } catch (e) {
        console.error('DB 초기화 실패:', e);
      }
    };
    init();
  }, []);

  if (!isReady || !db) return null;

  return (
    <DatabaseContext.Provider value={db}>{children}</DatabaseContext.Provider>
  );
}

export const useDb = () => {
  const context = useContext(DatabaseContext);
  if (!context) throw new Error('useDb must be used within a DatabaseProvider');
  return context;
};
