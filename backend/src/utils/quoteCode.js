/**
 * Genera un código legible y único para una cotización a partir de la fecha
 * de creación y su id en base de datos. Ejemplo: COT-20261006-0007.
 */
export function buildQuoteCode(id, date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const sequence = String(id).padStart(4, '0');

  return `COT-${year}${month}${day}-${sequence}`;
}