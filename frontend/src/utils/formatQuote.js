import { CURRENCY_SYMBOL } from "../data/quoteRules.js";

export function formatCurrency(value) {
  if (value == null || Number.isNaN(value)) return null;
  return `${CURRENCY_SYMBOL} ${new Intl.NumberFormat("es-PE").format(value)}`;
}

export function formatPriceRange(min, max) {
  if (min == null || max == null) return null;
  return `${formatCurrency(min)} - ${formatCurrency(max)}`;
}

export function formatWeeks(min, max) {
  if (min == null || max == null) return null;

  if (min === max) {
    return min === 1 ? "1 semana" : `${min} semanas`;
  }

  return `${min} - ${max} semanas`;
}

export function formatTime(date = new Date()) {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}