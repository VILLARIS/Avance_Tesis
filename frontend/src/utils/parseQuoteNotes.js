/**
 * La tabla `quotes` guarda las respuestas del cotizador serializadas en `notes`
 * con un formato legible por líneas: "Etiqueta: valor". Este helper lo
 * interpreta de forma segura para mostrarlo en el panel administrativo.
 *
 * Ejemplo:
 *   Tipo de web: Sistema web
 *   Secciones: 4 - 6
 *   Integraciones: Pasarela de pagos, Panel administrativo
 *   Diseño: Necesito diseño completo
 *   Plazo: Lo antes posible
 *   Detalle adicional: ...
 */

const FIELD_ALIASES = {
  "tipo de web": "projectType",
  tipo: "projectType",
  secciones: "sections",
  integraciones: "integrations",
  diseno: "design",
  "diseño": "design",
  plazo: "deadline",
  "detalle adicional": "additionalDetails",
  detalle: "additionalDetails",
};

const EMPTY_NOTES = {
  projectType: null,
  sections: null,
  integrations: null,
  design: null,
  deadline: null,
  additionalDetails: null,
};

export function parseQuoteNotes(notes) {
  const result = { ...EMPTY_NOTES };

  if (typeof notes !== "string" || notes.trim() === "") {
    return result;
  }

  for (const rawLine of notes.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) continue;

    const separator = line.indexOf(":");
    if (separator === -1) continue;

    const key = line.slice(0, separator).trim().toLowerCase();
    const value = line.slice(separator + 1).trim();
    const field = FIELD_ALIASES[key];

    if (field && !result[field] && value) {
      result[field] = value;
    }
  }

  return result;
}