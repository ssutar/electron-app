import Database, { type Database as DatabaseType } from 'better-sqlite3';

const dbOptions = { verbose: console.log };

const db: DatabaseType = new Database('./register.db', dbOptions);
db.pragma('journal_mode = WAL');

export { db };
