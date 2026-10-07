const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";

/**
 * Realiza una petición a la API y devuelve el JSON de la respuesta.
 * Lanza un error con mensaje claro si la respuesta no es correcta.
 */
export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const isJson = response.headers
    .get("content-type")
    ?.includes("application/json");

  const body = isJson ? await response.json() : null;

  if (!response.ok) {
    const message =
      body?.error || `Error ${response.status} al consultar ${path}`;
    throw new Error(message);
  }

  return body;
}

/**
 * Comprueba el estado de la API y de la conexión a la base de datos.
 * GET /api/health
 */
export function getHealth() {
  return apiRequest("/health");
}

export { API_BASE_URL };