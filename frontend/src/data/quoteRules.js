/**
 * Reglas TEMPORALES de precios y tiempos del cotizador.
 *
 * IMPORTANTE: estos valores son SIMULADOS y sirven solo para desarrollo.
 * No representan las tarifas reales de la empresa.
 *
 * Este archivo centraliza la configuración para poder modificar los precios
 * sin tocar los componentes ni la lógica de cálculo.
 */

export const CURRENCY_SYMBOL = "S/";

export const BASE_PRICES = {
  landing: 900,
  corporate: 1500,
  ecommerce: 2600,
  system: 3500,
  other: 1200,
};

export const SECTION_PRICES = {
  "1-3": 0,
  "4-6": 300,
  "7-10": 700,
  "10+": 1200,
};

export const INTEGRATION_PRICES = {
  whatsapp: 100,
  contact_form: 150,
  payment_gateway: 600,
  bookings: 500,
  admin_panel: 900,
  none: 0,
};

export const DESIGN_PRICES = {
  ready: 0,
  brand: 250,
  full: 700,
};

/**
 * Recargo por urgencia (se aplica como multiplicador sobre el subtotal).
 */
export const URGENCY_RATES = {
  asap: 0.2,
  "2-4w": 0.1,
  "1-2m": 0,
  none: 0,
};

/**
 * Factores para construir el rango referencial a partir del total estimado.
 */
export const RANGE_FACTORS = {
  min: 0.9,
  max: 1.15,
};

/**
 * Múltiplo al que se redondean los montos del rango (sin decimales).
 */
export const ROUND_TO = 50;

/**
 * Tiempo base estimado (en semanas) según el tipo de proyecto.
 */
export const TIME_RANGES = {
  landing: { min: 1, max: 2 },
  corporate: { min: 2, max: 3 },
  ecommerce: { min: 4, max: 6 },
  system: { min: 6, max: 10 },
  other: { min: 2, max: 4 },
};

/**
 * Semanas extra según la cantidad de secciones seleccionada.
 */
export const SECTION_TIME_EXTRA = {
  "7-10": { min: 1, max: 1 },
  "10+": { min: 2, max: 2 },
};

/**
 * Semanas extra por integraciones que alargan el desarrollo.
 */
export const INTEGRATION_TIME_EXTRA = {
  admin_panel: { min: 1, max: 2 },
};