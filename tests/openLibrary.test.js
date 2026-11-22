import test from 'node:test';
import assert from 'node:assert/strict';
import { obtenerObrasAutor } from '../src/js/api/openLibrary.js';

test('obtiene obras usando la clave corta que devuelve Open Library', async () => {
  const fetchOriginal = globalThis.fetch;
  let urlSolicitada = '';
  globalThis.fetch = async (url) => {
    urlSolicitada = String(url);
    return new Response(JSON.stringify({ entries: [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  };

  try {
    const obras = await obtenerObrasAutor('OL5974226A');

    assert.deepEqual(obras, []);
    assert.match(urlSolicitada, /openlibrary\.org\/authors\/OL5974226A\/works\.json/);
  } finally {
    globalThis.fetch = fetchOriginal;
  }
});

test('rechaza claves que no identifican una ruta de autor', async () => {
  await assert.rejects(obtenerObrasAutor('/works/OL1W'), /formato válido/);
});
