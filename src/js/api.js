export { solicitarJSON } from './api/http.js';
export { buscarAutores, buscarObras, obtenerObrasAutor } from './api/openLibrary.js';
export { obtenerResumenAutor } from './api/wikipedia.js';
export {
  getFavoritos,
  agregarFavorito,
  eliminarFavorito,
  getNotas,
  guardarNota,
  actualizarNota,
  eliminarNota,
} from './api/privateApi.js';

export function normalizarAutorOpenLibrary(autor) {
  if (autor === null || typeof autor !== 'object'
    || typeof autor.name !== 'string' || autor.name.trim().length === 0) {
    return null;
  }

  return {
    key: typeof autor.key === 'string' ? autor.key : '',
    name: autor.name.trim(),
    top_work: typeof autor.top_work === 'string' ? autor.top_work : '',
    work_count: Number.isInteger(autor.work_count) ? autor.work_count : null,
    fuenteExterna: 'Open Library',
  };
}

export function normalizarObraOpenLibrary(obra) {
  if (obra === null || typeof obra !== 'object'
    || typeof obra.title !== 'string' || obra.title.trim().length === 0) {
    return null;
  }

  let autores = [];
  if (Array.isArray(obra.author_name)) {
    autores = obra.author_name.filter(
      (nombre) => typeof nombre === 'string' && nombre.trim().length > 0,
    );
  } else if (Array.isArray(obra.authors)) {
    obra.authors.forEach((autor) => {
      if (autor && typeof autor.name === 'string' && autor.name.trim().length > 0) {
        autores.push(autor.name);
      }
    });
  }

  const obraNormalizada = {
    ...obra,
    title: obra.title.trim(),
    author_name: autores,
    first_publish_year: Number.isInteger(obra.first_publish_year) ? obra.first_publish_year : null,
  };

  return obraNormalizada;
}
