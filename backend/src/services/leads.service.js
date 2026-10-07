import { query } from '../config/db.js';

export async function listLeads() {
  const { rows } = await query(
    `SELECT id, full_name, company_name, email, phone, message, source, status,
            created_at, updated_at
     FROM leads
     ORDER BY created_at DESC`
  );

  return rows;
}

export async function findLeadById(id) {
  const { rows } = await query('SELECT id FROM leads WHERE id = $1', [id]);
  return rows[0] ?? null;
}

export async function createLead(data) {
  const { full_name, company_name, email, phone, message, source } = data;

  const { rows } = await query(
    `INSERT INTO leads (full_name, company_name, email, phone, message, source)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, full_name, company_name, email, phone, message, source, status,
               created_at, updated_at`,
    [full_name, company_name, email, phone, message, source]
  );

  return rows[0];
}