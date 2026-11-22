import { solicitarJSON } from './http.js';

const PRIVATE_API_URL = 'http://localhost:3000';

export function getFavoritos() {
  return solicitarJSON(`${PRIVATE_API_URL}/favoritos`);
}

export function agregarFavorito(obra) {
  return solicitarJSON(`${PRIVATE_API_URL}/favoritos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obra),
  });
}

export function eliminarFavorito(id) {
  return solicitarJSON(`${PRIVATE_API_URL}/favoritos/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
}

export function getNotas() {
  return solicitarJSON(`${PRIVATE_API_URL}/notas`);
}

export function guardarNota(nota) {
  return solicitarJSON(`${PRIVATE_API_URL}/notas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nota),
  });
}

export function actualizarNota(id, cambios) {
  return solicitarJSON(`${PRIVATE_API_URL}/notas/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cambios),
  });
}

export function eliminarNota(id) {
  return solicitarJSON(`${PRIVATE_API_URL}/notas/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
}
