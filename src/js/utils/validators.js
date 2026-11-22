export const IDIOMAS_PERMITIDOS = ['es', 'en', 'fr'];
export const ANIO_MINIMO = 1800;

function leerTexto(filtros, nombre) {
  if (!filtros || typeof filtros[nombre] !== 'string') {
    return '';
  }
  return filtros[nombre].trim();
}

export function validarFiltros(filtros, categoria) {
  const normalizados = {
    autor: leerTexto(filtros, 'autor'),
    genero: leerTexto(filtros, 'genero'),
    idioma: leerTexto(filtros, 'idioma'),
    desdeTexto: leerTexto(filtros, 'desde'),
    hastaTexto: leerTexto(filtros, 'hasta'),
  };
  const errores = [];
  const anioMaximo = new Date().getFullYear();

  if (!['autores', 'obras'].includes(categoria)) {
    errores.push('Selecciona una categoría válida.');
  }
  if (normalizados.autor.length > 100) {
    errores.push('El autor no puede superar los 100 caracteres.');
  }
  if (normalizados.genero.length > 80) {
    errores.push('El género no puede superar los 80 caracteres.');
  }
  if (!IDIOMAS_PERMITIDOS.includes(normalizados.idioma)) {
    errores.push('Selecciona un idioma válido.');
  }

  let desde = null;
  let hasta = null;
  if (normalizados.desdeTexto !== '') {
    desde = Number(normalizados.desdeTexto);
  }
  if (normalizados.hastaTexto !== '') {
    hasta = Number(normalizados.hastaTexto);
  }

  const anios = [
    { nombre: 'inicial', valor: desde },
    { nombre: 'final', valor: hasta },
  ];

  for (const anio of anios) {
    if (anio.valor !== null
      && (!Number.isInteger(anio.valor)
        || anio.valor < ANIO_MINIMO
        || anio.valor > anioMaximo)) {
      errores.push(
        `El año ${anio.nombre} debe estar entre ${ANIO_MINIMO} y ${anioMaximo}.`,
      );
    }
  }

  if (desde !== null && hasta !== null && desde > hasta) {
    errores.push('El año inicial no puede ser posterior al año final.');
  }
  if (categoria === 'autores' && normalizados.autor === '') {
    errores.push('Escribe un autor para buscar.');
  }
  if (categoria === 'obras'
    && normalizados.autor === ''
    && normalizados.genero === ''
    && desde === null
    && hasta === null) {
    errores.push('Indica un autor, un género o al menos un año para buscar obras.');
  }

  return {
    valido: errores.length === 0,
    filtros: {
      autor: normalizados.autor,
      genero: normalizados.genero,
      idioma: normalizados.idioma,
      desde,
      hasta,
    },
    errores,
  };
}
