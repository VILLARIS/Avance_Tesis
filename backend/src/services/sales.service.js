import { query } from '../config/db.js';

export async function listSales() {
  const { rows } = await query(
    `SELECT s.id, s.quote_id, s.lead_id, s.service_name, s.amount, s.sold_at,
            s.created_at,
            l.full_name AS lead_name,
            q.code AS quote_code
     FROM sales s
     LEFT JOIN leads l ON l.id = s.lead_id
     LEFT JOIN quotes q ON q.id = s.quote_id
     ORDER BY s.sold_at DESC`
  );

  return rows;
}