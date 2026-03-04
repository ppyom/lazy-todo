// apps/web/types/wa-sqlite.d.ts
declare module 'wa-sqlite/src/examples/IDBBatchAtomicVFS.js' {
  export class IDBBatchAtomicVFS {
    constructor(
      name: string,
      options?: { durability?: 'default' | 'strict' | 'relaxed' },
    );
  }
}
