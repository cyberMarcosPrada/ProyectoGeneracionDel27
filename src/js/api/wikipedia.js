import { solicitarJSON } from './http.js';

const WIKIPEDIA_URL = 'https://es.wikipedia.org/api/rest_v1/page/summary/';

export async function obtenerResumenAutor(titulo) {
  if (typeof titulo !== 'string' || titulo.trim().length === 0) {
    throw new TypeError('El título del autor es obligatorio.');
  }
  const url = `${WIKIPEDIA_URL}${encodeURIComponent(titulo.trim().replace(/ /g, '_'))}`;
  try {
    const resumen = await solicitarJSON(url);
    if (!resumen || typeof resumen.extract !== 'string' || resumen.extract.length === 0) {
      throw new TypeError('La respuesta de Wikipedia no contiene un resumen utilizable.');
    }
    return resumen;
  } catch (error) {
    throw new Error(`No se pudo obtener el resumen biográfico de Wikipedia: ${error.message}`);
  }
}
