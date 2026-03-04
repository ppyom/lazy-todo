import * as fs from 'fs';
import * as path from 'path';

const migrationsDir = path.resolve('./db/local/migrations');
const outputFile = path.join(migrationsDir, 'index.ts');

const sqlFiles = fs
  .readdirSync(migrationsDir)
  .filter((f) => f.endsWith('.sql'))
  .sort();

const lines: string[] = [
  '// ⚠️ 자동 생성 파일 - 직접 수정하지 마세요',
  '// yarn db:generate 로 재생성',
  '',
];

sqlFiles.forEach((file, idx) => {
  const content = fs.readFileSync(path.join(migrationsDir, file), 'utf-8');
  const varName = `m${String(idx).padStart(4, '0')}`;
  lines.push(`const ${varName} = ${JSON.stringify(content)};`);
});

const varNames = sqlFiles.map((_, idx) => `m${String(idx).padStart(4, '0')}`);
lines.push('');
lines.push(`export const migrations = [${varNames.join(', ')}];`);

fs.writeFileSync(outputFile, lines.join('\n'));

console.log(`✅ ${sqlFiles.length}개 마이그레이션 → index.ts 생성 완료`);
