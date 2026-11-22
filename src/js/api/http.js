export async function solicitarJSON(url, options = {}) {
  let response;

  try {
    response = await fetch(url, options);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (url.indexOf('http://localhost:3000/') === 0) {
      throw new Error(
        `No se pudo conectar con la biblioteca local. Ejecuta "npm run api" en otra terminal. (${message})`,
      );
    }
    throw new Error(`Error de red al solicitar ${url}: ${message}`);
  }

  if (!response.ok) {
    throw new Error(
      `Error HTTP ${response.status} al solicitar ${url}`
        + `${response.statusText ? `: ${response.statusText}` : ''}`,
    );
  }

  if (response.status === 204) {
    return null;
  }

  try {
    return await response.json();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`La respuesta de ${url} no contiene JSON válido: ${message}`);
  }
}
