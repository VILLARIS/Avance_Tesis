import { pool } from '../config/db.js';
import * as leadsService from './leads.service.js';
import * as quotesService from './quotes.service.js';

/**
 * Crea un lead y su cotización asociada dentro de una única transacción.
 *
 * Si cualquiera de las dos inserciones falla, se revierte todo para evitar
 * leads huérfanos (sin cotización) o cotizaciones sin lead.
 */
export async function createQuoteRequest({ lead, quote }) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const createdLead = await leadsService.createLead(lead, client);

    const createdQuote = await quotesService.createQuote(
      { ...quote, lead_id: createdLead.id },
      client
    );

    await client.query('COMMIT');

    return { lead: createdLead, quote: createdQuote };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}