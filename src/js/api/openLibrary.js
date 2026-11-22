import { solicitarJSON } from './http.js';

const OPEN_LIBRARY_URL = 'https://openlibrary.org';
const LIMIT = 30;

function requireDocs(payload, endpoint) {
  if (!payload || !Array.isArray(payload.docs)) {
    throw new TypeError(`La respuesta de Open Library no contiene resultados válidos (${endpoint}).`);
  }
  return payload.docs;
}

export async function buscarAutores(nombre) {
  const query = new URLSearchParams({ q: nombre, limit: String(LIMIT) });
  const endpoint = `${OPEN_LIBRARY_URL}/search/authors.json?${query}`;
  try {
    return requireDocs(await solicitarJSON(endpoint), endpoint);
  } catch (error) {
    throw new Error(`No se pudo buscar autores en Open Library: ${error.message}`);
  }
}

export async function buscarObras(filtros) {
  const parts = [];
  if (filtros.autor) parts.push(`author:"${filtros.autor.replace(/["\\]/g, ' ')}"`);
  if (filtros.genero) parts.push(`subject:"${filtros.genero.replace(/["\\]/g, ' ')}"`);
  if (filtros.desde !== null && filtros.hasta !== null) {
    parts.push(`first_publish_year:[${filtros.desde} TO ${filtros.hasta}]`);
  } else if (filtros.desde !== null) {
    parts.push(`first_publish_year:[${filtros.desde} TO *]`);
  } else if (filtros.hasta !== null) {
    parts.push(`first_publish_year:[* TO ${filtros.hasta}]`);
  }

  const query = new URLSearchParams({
    q: parts.join(' AND '),
    language: filtros.idioma === 'es' ? 'spa' : filtros.idioma,
    limit: String(LIMIT),
  });
  const endpoint = `${OPEN_LIBRARY_URL}/search.json?${query}`;
  try {
    return requireDocs(await solicitarJSON(endpoint), endpoint);
  } catch (error) {
    throw new Error(`No se pudieron buscar obras en Open Library: ${error.message}`);
  }
}

export async function obtenerObrasAutor(claveAutor) {
  if (typeof claveAutor !== 'string' || claveAutor.trim() === '') {
    throw new TypeError('La clave del autor no tiene un formato válido.');
  }

  const claveCompleta = claveAutor.startsWith('/authors/')
    ? claveAutor
    : `/authors/${claveAutor}`;
  if (!/^\/authors\/[^/]+$/.test(claveCompleta)) {
    throw new TypeError('La clave del autor no tiene un formato válido.');
  }

  const claveCodificada = claveCompleta.split('/').map(encodeURIComponent).join('/');
  const query = new URLSearchParams({ limit: String(LIMIT) });
  const endpoint = `${OPEN_LIBRARY_URL}${claveCodificada}/works.json?${query}`;
  try {
    const payload = await solicitarJSON(endpoint);
    if (!payload || !Array.isArray(payload.entries)) {
      throw new TypeError('La respuesta no contiene una lista de obras válida.');
    }
    return payload.entries;
  } catch (error) {
    throw new Error(`No se pudieron cargar las obras del autor: ${error.message}`);
  }
}
