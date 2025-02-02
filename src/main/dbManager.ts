import Database, { type Database as DatabaseType } from 'better-sqlite3';
import { join } from 'path';

const dbOptions = { verbose: console.log };
const dbPath =
  process.env.NODE_ENV === 'development'
    ? './db/register.db'
    : join(process.resourcesPath, './register.db');

const db: DatabaseType = new Database(dbPath, dbOptions);
db.pragma('journal_mode = WAL');

export { db };
