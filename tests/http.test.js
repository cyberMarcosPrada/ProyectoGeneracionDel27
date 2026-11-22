import test from 'node:test';
import assert from 'node:assert/strict';
import { solicitarJSON } from '../src/js/api/http.js';

test('solicitarJSON convierte la respuesta en un objeto JavaScript', async () => {
  const respuesta = await solicitarJSON(
    'data:application/json,%7B%22mensaje%22%3A%22hola%22%7D',
  );

  assert.deepEqual(respuesta, { mensaje: 'hola' });
});

test('solicitarJSON informa de un estado HTTP incorrecto', async () => {
  const fetchOriginal = globalThis.fetch;
  globalThis.fetch = async () => ({
    ok: false,
    status: 404,
    statusText: 'Not Found',
  });

  try {
    await assert.rejects(
      solicitarJSON('https://ejemplo.test/recurso'),
      /Error HTTP 404 al solicitar/,
    );
  } finally {
    globalThis.fetch = fetchOriginal;
  }
});

test('solicitarJSON explica cómo iniciar la API local cuando no está disponible', async () => {
  const fetchOriginal = globalThis.fetch;
  globalThis.fetch = async () => {
    throw new TypeError('Failed to fetch');
  };

  try {
    await assert.rejects(
      solicitarJSON('http://localhost:3000/favoritos'),
      /Ejecuta "npm run api"/,
    );
  } finally {
    globalThis.fetch = fetchOriginal;
  }
});

test('solicitarJSON informa cuando el servidor no devuelve JSON válido', async () => {
  await assert.rejects(
    solicitarJSON('data:text/plain,no-es-json'),
    /no contiene JSON válido/,
  );
});
