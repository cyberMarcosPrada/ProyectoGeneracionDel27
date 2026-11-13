import { customFetch } from './http.js';
const API_URL = 'https://openlibrary.org';
const LIMITE_RESULTADOS = 30;

function comprobarResultados(datos) {
    if (!Array.isArray(datos?.docs)) {
        throw new Error('Los resultados no son válidos.');
    }

    return datos.docs;
}

export async function buscarAutores(nombre) {
    const parametros = new URLSearchParams({
        q: nombre,
        limit: LIMITE_RESULTADOS
    });

    const url = `${API_URL}/search/authors.json?${parametros}`;

    try {
        const datos = await customFetch(url);
        return comprobarResultados(datos);
    } catch (error) {
        throw new Error('Error al buscar autores: ' + error.message);
    }
}

export async function buscarObras(filtros) {
    const condiciones = [];

    if (filtros.autor) {
        condiciones.push(`author:"${filtros.autor}"`);
    }

    if (filtros.genero) {
        condiciones.push(`subject:"${filtros.genero}"`);
    }

    if (filtros.desde !== null && filtros.hasta !== null) {
        condiciones.push(`first_publish_year:[${filtros.desde} TO ${filtros.hasta}]`);
    } else if (filtros.desde !== null) {
        condiciones.push(`first_publish_year:[${filtros.desde} TO *]`);
    } else if (filtros.hasta !== null) {
        condiciones.push(`first_publish_year:[* TO ${filtros.hasta}]`);
    }

    const parametros = new URLSearchParams({
        q: condiciones.join(' AND '),
        language: filtros.idioma === 'es' ? 'spa' : filtros.idioma,
        limit: LIMITE_RESULTADOS
    });

    const url = `${API_URL}/search.json?${parametros}`;

    try {
        const datos = await customFetch(url);
        return comprobarResultados(datos);
    } catch (error) {
        throw new Error('Error al buscar obras: ' + error.message);
    }
}

export async function obtenerObrasAutor(claveAutor) {
    const url = `${API_URL}${claveAutor}/works.json?limit=${LIMITE_RESULTADOS}`;

    try {
        const datos = await customFetch(url);

        if (!Array.isArray(datos?.entries)) {
            throw new Error('La lista de obras no es válida.');
        }

        return datos.entries;
    } catch (error) {
        throw new Error('Error al obtener las obras del autor: ' + error.message);
    }
}
