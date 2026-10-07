import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { pool } from '../../src/config/db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const seedsDir = path.join(__dirname, '..', 'seeds');

async function run() {
  const files = (await readdir(seedsDir))
    .filter((file) => file.endsWith('.sql'))
    .sort();

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    console.log(
      'AVISO: db:seed reinicia la tabla "sales" y la reemplaza con ventas SIMULADAS ' +
        '(datos ficticios para pruebas, no ventas reales).'
    );

    await client.query('TRUNCATE TABLE sales RESTART IDENTITY');

    for (const file of files) {
      const sql = await readFile(path.join(seedsDir, file), 'utf8');
      await client.query(sql);
      console.log(`✔ Seed aplicado: ${file}`);
    }

    await client.query('COMMIT');
    console.log('Seed completado correctamente.');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

run().catch((error) => {
  console.error('Error ejecutando seeds:', error.message);
  process.exitCode = 1;
});