import { pool, query } from '../config/db.js';
import { buildQuoteCode } from '../utils/quoteCode.js';

export async function listQuotes() {
  const { rows } = await query(
    `SELECT q.id, q.lead_id, q.code, q.project_type, q.sections_count,
            q.estimated_min, q.estimated_max, q.estimated_weeks_min,
            q.estimated_weeks_max, q.status, q.notes, q.created_at, q.updated_at,
            l.full_name AS lead_name, l.email AS lead_email, l.phone AS lead_phone,
            l.company_name AS lead_company, l.message AS lead_message
     FROM quotes q
     LEFT JOIN leads l ON l.id = q.lead_id
     ORDER BY q.created_at DESC`
  );

  return rows;
}

export async function updateQuoteStatus(id, status) {
  const { rows } = await query(
    `UPDATE quotes
     SET status = $1, updated_at = NOW()
     WHERE id = $2
     RETURNING id, lead_id, code, project_type, sections_count, estimated_min,
               estimated_max, estimated_weeks_min, estimated_weeks_max, status,
               notes, created_at, updated_at`,
    [status, id]
  );

  return rows[0] ?? null;
}

export async function createQuote(data, existingClient = null) {
  const {
    lead_id,
    project_type,
    sections_count,
    estimated_min,
    estimated_max,
    estimated_weeks_min,
    estimated_weeks_max,
    status,
    notes,
  } = data;

  // Si nos pasan un cliente ya abierto, reutilizamos su transacción; en caso
  // contrario abrimos una propia para mantener el comportamiento original.
  const client = existingClient ?? (await pool.connect());
  const ownsTransaction = !existingClient;

  try {
    if (ownsTransaction) {
      await client.query('BEGIN');
    }

    // Reserva el id desde la secuencia para poder construir el código en un solo paso.
    const sequence = await client.query(
      "SELECT nextval(pg_get_serial_sequence('quotes', 'id')) AS id"
    );
    const quoteId = Number(sequence.rows[0].id);

    const code = buildQuoteCode(quoteId);

    const { rows } = await client.query(
      `INSERT INTO quotes
         (id, lead_id, code, project_type, sections_count, estimated_min, estimated_max,
          estimated_weeks_min, estimated_weeks_max, status, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING id, lead_id, code, project_type, sections_count, estimated_min,
                 estimated_max, estimated_weeks_min, estimated_weeks_max, status,
                 notes, created_at, updated_at`,
      [
        quoteId,
        lead_id,
        code,
        project_type,
        sections_count,
        estimated_min,
        estimated_max,
        estimated_weeks_min,
        estimated_weeks_max,
        status,
        notes,
      ]
    );

    if (ownsTransaction) {
      await client.query('COMMIT');
    }

    return rows[0];
  } catch (error) {
    if (ownsTransaction) {
      await client.query('ROLLBACK');
    }
    throw error;
  } finally {
    if (ownsTransaction) {
      client.release();
    }
  }
}