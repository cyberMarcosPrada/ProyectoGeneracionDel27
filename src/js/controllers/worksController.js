import { buscarObras } from '../api/openLibrary.js';
import { AUTORES_27 } from '../../data/autores27.js';
import { actualizarCategoria, actualizarResultados } from './state.js';
import { normalizarObraOpenLibrary } from '../utils/models.js';

function normalizar(texto) {
    return String(texto ?? '')
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .toLowerCase();
}

function buscarObrasLocales(filtros) {
    const autor = normalizar(filtros.autor);
    const genero = normalizar(filtros.genero);

    const obras = AUTORES_27.flatMap(registro =>
        registro.obras.map((obra, indice) => ({
            ...obra,
            id: `${registro.id}-${indice}`,
            autor: registro.nombre,
            autorId: registro.id
        }))
    );

    return obras.filter(obra => {
        const nombreAutor = normalizar(obra.autor);
        const textoObra = normalizar(
            `${obra.titulo} ${obra.genero} ${obra.descripcion}`
        );
        return (
            (!autor || nombreAutor.includes(autor)) &&
            (!genero || textoObra.includes(genero)) &&
            (filtros.desde === null || obra.año >= filtros.desde) &&
            (filtros.hasta === null || obra.año <= filtros.hasta)
        );
    });
}

export async function buscarObrasController(filtros, incluirCatalogos = false) {
    let obras = buscarObrasLocales(filtros);
    let advertencia = '';

    if (incluirCatalogos) {
        try {
            const externas = await buscarObras(filtros);
            const titulosLocales = obras.map(obra =>
                normalizar(`${obra.titulo}|${obra.autor}`)
            );
            const obrasExternas = externas
                .map(normalizarObraOpenLibrary)
                .filter(obra => obra !== null)
                .filter(obra => {
                    const clave = normalizar(
                        `${obra.title}|${obra.author_name?.[0] ?? ''}`
                    );
                    return !titulosLocales.includes(clave);
                })
                .map(obra => ({
                    ...obra,
                    fuenteExterna: 'Open Library'
                }));

            obras = [...obras, ...obrasExternas];

        } catch (error) {
            advertencia = error.message;
        }
    }
    actualizarCategoria('obras');
    actualizarResultados(obras);
    return {
        resultados: obras,
        advertencia
    };
}
