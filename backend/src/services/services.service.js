import { query } from '../config/db.js';

export async function listActiveServices() {
  const { rows } = await query(
    `SELECT id, name, description, base_price, is_active, created_at, updated_at
     FROM services
     WHERE is_active = TRUE
     ORDER BY id ASC`
  );

  return rows;
}