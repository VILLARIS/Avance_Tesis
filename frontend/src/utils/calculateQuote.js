import {
  BASE_PRICES,
  DESIGN_PRICES,
  INTEGRATION_PRICES,
  INTEGRATION_TIME_EXTRA,
  RANGE_FACTORS,
  ROUND_TO,
  SECTION_PRICES,
  SECTION_TIME_EXTRA,
  TIME_RANGES,
  URGENCY_RATES,
} from "../data/quoteRules.js";

function roundToNearest(value, step = ROUND_TO) {
  if (!step || step <= 0) return Math.round(value);
  return Math.round(value / step) * step;
}

function calculateWeeks(projectType, sections, integrations) {
  const base = TIME_RANGES[projectType] ?? { min: 0, max: 0 };
  let min = base.min;
  let max = base.max;

  const sectionsExtra = SECTION_TIME_EXTRA[sections];
  if (sectionsExtra) {
    min += sectionsExtra.min;
    max += sectionsExtra.max;
  }

  integrations.forEach((key) => {
    const extra = INTEGRATION_TIME_EXTRA[key];
    if (extra) {
      min += extra.min;
      max += extra.max;
    }
  });

  return { min, max };
}

/**
 * Calcula la estimación de una cotización a partir de las respuestas.
 *
 * Respuesta esperada (parcial o completa):
 * {
 *   projectType: "corporate" | null,
 *   sections: "4-6" | null,
 *   integrations: ["whatsapp", "contact_form"],
 *   designStatus: "ready" | null,
 *   deadline: "1-2m" | null,
 * }
 *
 * Devuelve montos (sin formato) y el rango estimado en semanas. Cuando no hay
 * tipo de proyecto seleccionado, los montos dependientes son null para que la
 * interfaz pueda mostrar "Pendiente" en lugar de valores falsos.
 */
export function calculateQuote(answers = {}) {
  const {
    projectType = null,
    sections = null,
    integrations = [],
    designStatus = null,
    deadline = null,
  } = answers;

  const hasProject = Boolean(projectType);

  const basePrice = hasProject ? BASE_PRICES[projectType] ?? 0 : 0;
  const sectionsPrice = sections ? SECTION_PRICES[sections] ?? 0 : 0;
  const integrationsPrice = integrations.reduce(
    (total, key) => total + (INTEGRATION_PRICES[key] ?? 0),
    0
  );
  const designPrice = designStatus ? DESIGN_PRICES[designStatus] ?? 0 : 0;

  const subtotal = basePrice + sectionsPrice + integrationsPrice + designPrice;
  const urgencyRate = deadline ? URGENCY_RATES[deadline] ?? 0 : 0;
  const total = subtotal * (1 + urgencyRate);

  const estimatedMin = hasProject
    ? roundToNearest(total * RANGE_FACTORS.min)
    : null;
  const estimatedMax = hasProject
    ? roundToNearest(total * RANGE_FACTORS.max)
    : null;

  const weeks = hasProject
    ? calculateWeeks(projectType, sections, integrations)
    : null;

  return {
    hasProject,
    basePrice,
    sectionsPrice,
    integrationsPrice,
    designPrice,
    subtotal,
    urgencyRate,
    total,
    estimatedMin,
    estimatedMax,
    weeksMin: weeks ? weeks.min : null,
    weeksMax: weeks ? weeks.max : null,
  };
}