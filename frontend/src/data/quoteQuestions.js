/**
 * Configuración de las preguntas del cotizador guiado.
 *
 * Cada paso define:
 * - id:     clave usada en el estado del cotizador (answers).
 * - step:   número de paso (1..N).
 * - question: texto que muestra el asistente.
 * - type:   'single' (una opción), 'multiple' (varias) o 'text' (entrada libre).
 * - options: opciones disponibles. `label` se muestra en la interfaz y
 *            `userLabel` se usa para el mensaje del usuario en el chat.
 */

export const PROJECT_TYPE_OPTIONS = [
  { value: "landing", label: "Landing page", userLabel: "Necesito una landing page" },
  { value: "corporate", label: "Web corporativa", userLabel: "Necesito una web corporativa" },
  { value: "ecommerce", label: "Tienda online", userLabel: "Necesito una tienda online" },
  { value: "system", label: "Sistema web", userLabel: "Necesito un sistema web" },
  { value: "other", label: "Otro", userLabel: "Necesito otro tipo de sitio web" },
];

export const SECTION_OPTIONS = [
  { value: "1-3", label: "1 - 3", userLabel: "Entre 1 y 3 secciones" },
  { value: "4-6", label: "4 - 6", userLabel: "Entre 4 y 6 secciones" },
  { value: "7-10", label: "7 - 10", userLabel: "Entre 7 y 10 secciones" },
  { value: "10+", label: "Más de 10", userLabel: "Más de 10 secciones" },
];

export const INTEGRATION_OPTIONS = [
  { value: "whatsapp", label: "WhatsApp", userLabel: "WhatsApp" },
  { value: "contact_form", label: "Formulario de contacto", userLabel: "Formulario de contacto" },
  { value: "payment_gateway", label: "Pasarela de pagos", userLabel: "Pasarela de pagos" },
  { value: "bookings", label: "Reservas / citas", userLabel: "Reservas / citas" },
  { value: "admin_panel", label: "Panel administrativo", userLabel: "Panel administrativo" },
  { value: "none", label: "Ninguna", userLabel: "Ninguna integración adicional" },
];

export const DESIGN_OPTIONS = [
  { value: "ready", label: "Sí, ya tengo diseño", userLabel: "Ya tengo el diseño listo" },
  { value: "brand", label: "Tengo logo y colores", userLabel: "Tengo logo y colores" },
  { value: "full", label: "Necesito diseño completo", userLabel: "Necesito diseño completo" },
];

export const DEADLINE_OPTIONS = [
  { value: "asap", label: "Lo antes posible", userLabel: "Lo necesito lo antes posible" },
  { value: "2-4w", label: "2 - 4 semanas", userLabel: "En 2 a 4 semanas" },
  { value: "1-2m", label: "1 - 2 meses", userLabel: "En 1 a 2 meses" },
  { value: "none", label: "Sin fecha definida", userLabel: "Sin fecha definida" },
];

export const QUOTE_STEPS = [
  {
    id: "projectType",
    step: 1,
    question: "¿Qué tipo de sitio web necesitas?",
    type: "single",
    options: PROJECT_TYPE_OPTIONS,
  },
  {
    id: "sections",
    step: 2,
    question: "¿Cuántas secciones o páginas estimas que necesitas?",
    type: "single",
    options: SECTION_OPTIONS,
  },
  {
    id: "integrations",
    step: 3,
    question: "¿Qué funcionalidades o integraciones necesitas?",
    type: "multiple",
    options: INTEGRATION_OPTIONS,
  },
  {
    id: "designStatus",
    step: 4,
    question: "¿Ya cuentas con diseño o identidad visual?",
    type: "single",
    options: DESIGN_OPTIONS,
  },
  {
    id: "deadline",
    step: 5,
    question: "¿Cuándo te gustaría tener listo el proyecto?",
    type: "single",
    options: DEADLINE_OPTIONS,
  },
  {
    id: "additionalDetails",
    step: 6,
    question: "¿Quieres añadir algún detalle adicional?",
    type: "text",
    options: [],
  },
];

export const TOTAL_STEPS = QUOTE_STEPS.length;

export const GREETING_MESSAGE =
  "Hola, soy tu asistente de cotización. Comencemos con algunos datos sobre tu proyecto.";

export function getStepById(stepId) {
  return QUOTE_STEPS.find((step) => step.id === stepId) ?? null;
}

export function getOptionByValue(stepId, value) {
  const step = getStepById(stepId);
  if (!step || !step.options || value == null) return null;
  return step.options.find((option) => option.value === value) ?? null;
}

/**
 * Texto del mensaje del usuario en el chat para una respuesta concreta.
 */
export function getAnswerText(step, answer) {
  if (answer == null) return null;

  if (step.type === "multiple") {
    const values = Array.isArray(answer) ? answer : [answer];
    if (values.length === 0) return null;
    return values
      .map((value) => getOptionByValue(step.id, value)?.userLabel ?? value)
      .join(", ");
  }

  if (step.type === "text") {
    const text = String(answer).trim();
    return text.length > 0 ? text : "Omitido";
  }

  return getOptionByValue(step.id, answer)?.userLabel ?? null;
}

/**
 * Texto que se muestra en el resumen preliminar para una respuesta concreta.
 */
export function getSummaryLabel(step, answer) {
  if (answer == null) return null;

  if (step.type === "multiple") {
    const values = Array.isArray(answer) ? answer : [answer];
    if (values.length === 0) return null;
    return values
      .map((value) => getOptionByValue(step.id, value)?.label ?? value)
      .join(" + ");
  }

  if (step.type === "text") {
    const text = String(answer).trim();
    return text.length > 0 ? text : "Omitido";
  }

  return getOptionByValue(step.id, answer)?.label ?? null;
}