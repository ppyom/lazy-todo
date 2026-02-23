import { createClient } from '@libsql/client/web';
import { drizzle } from 'drizzle-orm/libsql';

import * as schema from './schema';

const client = createClient({
  url: 'file:lazy-todo.db',
});

export const db = drizzle(client, { schema });
