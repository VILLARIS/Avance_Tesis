const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3001/api";

const DEFAULT_TIMEOUT = 15000;

function buildRequestError(message, { status = null, details = null, isNetworkError = false } = {}) {
  const error = new Error(message);
  error.status = status;
  error.details = details;
  error.isNetworkError = isNetworkError;
  return error;
}

/**
 * Realiza una petición al backend y devuelve el JSON de la respuesta.
 *
 * En caso de error lanza un Error con información útil para la interfaz:
 * - status: código HTTP (null si fue un fallo de red)
 * - details: arreglo de mensajes de validación del backend (si existen)
 * - isNetworkError: true cuando no se pudo contactar al servidor
 *
 * Nunca expone stack traces ni detalles técnicos crudos.
 */
export async function apiRequest(path, options = {}) {
  const { timeout = DEFAULT_TIMEOUT, ...fetchOptions } = options;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...(fetchOptions.headers ?? {}),
      },
      ...fetchOptions,
      signal: fetchOptions.signal ?? controller.signal,
    });
  } catch {
    clearTimeout(timeoutId);
    throw buildRequestError("No pudimos conectar con el servidor.", {
      isNetworkError: true,
    });
  } finally {
    clearTimeout(timeoutId);
  }

  let payload;

  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    throw buildRequestError(
      payload?.error ?? `Error ${response.status} al procesar la solicitud.`,
      { status: response.status, details: payload?.details ?? null }
    );
  }

  return payload;
}

export function getHealth() {
  return apiRequest("/health");
}

export function createLead(data) {
  return apiRequest("/leads", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function createQuote(data) {
  return apiRequest("/quotes", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Crea de forma transaccional un lead y su cotización asociada.
 * Devuelve { data: { lead, quote } }.
 */
export function createQuoteRequest(data) {
  return apiRequest("/quote-requests", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export { API_BASE_URL };