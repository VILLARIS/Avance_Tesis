import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { pool } from '../../src/config/db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const migrationsDir = path.join(__dirname, '..', 'migrations');

async function ensureMigrationsTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id         SERIAL PRIMARY KEY,
      name       TEXT NOT NULL UNIQUE,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

async function getAppliedMigrations() {
  const { rows } = await pool.query('SELECT name FROM schema_migrations');
  return new Set(rows.map((row) => row.name));
}

async function applyMigration(file) {
  const sql = await readFile(path.join(migrationsDir, file), 'utf8');
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    await client.query(sql);
    await client.query('INSERT INTO schema_migrations (name) VALUES ($1)', [file]);
    await client.query('COMMIT');
    console.log(`✔ Migración aplicada: ${file}`);
  } catch (error) {
    await client.query('ROLLBACK');
    throw new Error(`Falló la migración ${file}: ${error.message}`);
  } finally {
    client.release();
  }
}

async function run() {
  try {
    await ensureMigrationsTable();

    const applied = await getAppliedMigrations();
    const files = (await readdir(migrationsDir))
      .filter((file) => file.endsWith('.sql'))
      .sort();

    if (files.length === 0) {
      console.log('No hay archivos de migración.');
      return;
    }

    const pending = files.filter((file) => !applied.has(file));

    for (const file of files) {
      if (applied.has(file)) {
        console.log(`- Omitida (ya aplicada): ${file}`);
      }
    }

    for (const file of pending) {
      await applyMigration(file);
    }

    console.log(
      pending.length === 0
        ? 'No hay migraciones pendientes.'
        : `Migraciones aplicadas: ${pending.length}.`
    );
  } finally {
    await pool.end();
  }
}

run().catch((error) => {
  console.error('Error ejecutando migraciones:', error.message);
  process.exitCode = 1;
});