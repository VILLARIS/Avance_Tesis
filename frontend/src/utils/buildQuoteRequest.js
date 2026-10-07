import { getStepById, getSummaryLabel } from "../data/quoteQuestions.js";

const PROJECT_TYPE_SLUGS = {
  landing: "landing_page",
  corporate: "corporate_web",
  ecommerce: "ecommerce",
  system: "web_system",
  other: "other",
};

export const QUOTE_SOURCE = "web_quote";

export function getProjectTypeLabel(value) {
  return getSummaryLabel(getStepById("projectType"), value) ?? null;
}

export function getProjectTypeSlug(value) {
  return PROJECT_TYPE_SLUGS[value] ?? "other";
}

/**
 * Construye un resumen legible del proyecto para guardarlo en `notes`.
 * La tabla quotes no tiene columnas para integraciones, diseño, plazo, etc.,
 * así que se serializan aquí de forma estructurada y entendible.
 */
export function buildQuoteNotes(answers) {
  const lines = [
    `Tipo de web: ${getSummaryLabel(getStepById("projectType"), answers.projectType) ?? "No indicado"}`,
    `Secciones: ${getSummaryLabel(getStepById("sections"), answers.sections) ?? "No indicado"}`,
    `Integraciones: ${getSummaryLabel(getStepById("integrations"), answers.integrations) ?? "No indicado"}`,
    `Diseño: ${getSummaryLabel(getStepById("designStatus"), answers.designStatus) ?? "No indicado"}`,
    `Plazo: ${getSummaryLabel(getStepById("deadline"), answers.deadline) ?? "No indicado"}`,
    `Detalle adicional: ${answers.additionalDetails?.trim() || "No indicado"}`,
  ];

  return lines.join("\n");
}

/**
 * Payload para POST /api/quote-requests.
 *
 * Usa los valores YA calculados por calculateQuote (quote.estimatedMin/Max y
 * quote.weeksMin/Max) para no duplicar la lógica de precios.
 */
export function buildQuoteRequestPayload({ answers, quote, contact }) {
  return {
    lead: {
      full_name: contact.fullName.trim(),
      company_name: contact.companyName.trim() || null,
      email: contact.email.trim(),
      phone: contact.phone.trim() || null,
      message: contact.message.trim() || null,
      source: QUOTE_SOURCE,
    },
    quote: {
      project_type: getProjectTypeSlug(answers.projectType),
      // La interfaz usa rangos (4-6). No falseamos un valor exacto:
      // el rango queda guardado en notes.
      sections_count: null,
      estimated_min: quote.estimatedMin,
      estimated_max: quote.estimatedMax,
      estimated_weeks_min: quote.weeksMin,
      estimated_weeks_max: quote.weeksMax,
      status: "submitted",
      notes: buildQuoteNotes(answers),
    },
  };
}