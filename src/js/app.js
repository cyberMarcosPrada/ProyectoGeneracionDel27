import { AUTORES_27, FUENTES_BIBLIOGRAFICAS } from '../data/autores27.js';
import {
  buscarAutores,
  buscarObras,
  obtenerObrasAutor,
  obtenerResumenAutor,
  getFavoritos,
  agregarFavorito,
  eliminarFavorito,
  getNotas,
  guardarNota,
  actualizarNota,
  eliminarNota,
  normalizarAutorOpenLibrary,
  normalizarObraOpenLibrary,
} from './api.js';
import { validarFiltros as validarFiltrosUtil } from './utils/validators.js';

export const validarFiltros = validarFiltrosUtil;

/* =============================================================
   2. Gestión de Estado Global
   ============================================================= */
const CATEGORIAS_VALIDAS = ['autores', 'obras'];
const FILTROS_VALIDOS = ['autor', 'genero', 'idioma', 'rangoCronologico'];
const SUSCRIPTORES = [];

const filtrosIniciales = {
  autor: '',
  genero: '',
  idioma: 'es',
  rangoCronologico: { desde: '', hasta: '' },
};

const estado = {
  categoriaActiva: 'autores',
  filtrosActivos: filtrosIniciales,
  resultados: [],
  favoritos: [],
  notas: [],
  autorSeleccionado: null,
};

export function obtenerEstado() {
  return estado;
}

export function suscribirse(suscriptor) {
  if (typeof suscriptor !== 'function') {
    throw new TypeError('El suscriptor debe ser una función.');
  }
  SUSCRIPTORES.push(suscriptor);
  return function cancelarSuscripcion() {
    const indice = SUSCRIPTORES.indexOf(suscriptor);
    if (indice !== -1) {
      SUSCRIPTORES.splice(indice, 1);
    }
  };
}

function notificar(propiedadesModificadas) {
  SUSCRIPTORES.forEach((suscriptor) => suscriptor(estado, propiedadesModificadas));
}

function actualizarEstado(cambios) {
  for (const propiedad in cambios) {
    estado[propiedad] = cambios[propiedad];
  }
  notificar(Object.keys(cambios));
}

export function actualizarCategoria(categoria) {
  if (!CATEGORIAS_VALIDAS.includes(categoria)) {
    throw new RangeError('La categoría debe ser "autores" u "obras".');
  }
  actualizarEstado({ categoriaActiva: categoria });
}

export function actualizarFiltros(cambiosFiltros) {
  if (!cambiosFiltros || typeof cambiosFiltros !== 'object' || Array.isArray(cambiosFiltros)) {
    throw new TypeError('Los filtros deben proporcionarse como un objeto.');
  }
  const clavesDesconocidas = Object.keys(cambiosFiltros)
    .filter((clave) => !FILTROS_VALIDOS.includes(clave));
  if (clavesDesconocidas.length > 0) {
    throw new RangeError(`Filtro(s) no válido(s): ${clavesDesconocidas.join(', ')}.`);
  }

  const filtrosActualizados = {
    ...estado.filtrosActivos,
    ...cambiosFiltros,
  };
  if (Object.prototype.hasOwnProperty.call(cambiosFiltros, 'rangoCronologico')) {
    const rango = cambiosFiltros.rangoCronologico;
    if (!rango || typeof rango !== 'object' || Array.isArray(rango)) {
      throw new TypeError('El rango cronológico debe ser un objeto.');
    }
    filtrosActualizados.rangoCronologico = {
      ...estado.filtrosActivos.rangoCronologico,
      ...rango,
    };
  }

  actualizarEstado({ filtrosActivos: filtrosActualizados });
}

export function actualizarResultados(resultados) {
  if (!Array.isArray(resultados)) {
    throw new TypeError('Los resultados deben proporcionarse como un array.');
  }
  actualizarEstado({ resultados });
}

export function actualizarAutorSeleccionado(autor) {
  if (autor !== null && (typeof autor !== 'object' || Array.isArray(autor))) {
    throw new TypeError('El autor seleccionado debe ser un objeto o null.');
  }
  actualizarEstado({ autorSeleccionado: autor });
}

export function actualizarFavoritos(favoritos) {
  if (!Array.isArray(favoritos)) {
    throw new TypeError('Los favoritos deben proporcionarse como un array.');
  }
  actualizarEstado({ favoritos });
}

export function actualizarNotas(notas) {
  if (!Array.isArray(notas)) {
    throw new TypeError('Las notas deben proporcionarse como un array.');
  }
  actualizarEstado({ notas });
}

export function limpiarFiltros() {
  actualizarEstado({ filtrosActivos: filtrosIniciales });
}

/* =============================================================
   3. Controladores
   ============================================================= */
function normalizar(texto) {
  if (texto === null || texto === undefined) {
    texto = '';
  }
  return String(texto)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('es');
}

function buscarAutoresLocales(filtros) {
  const autor = normalizar(filtros.autor);
  const tema = normalizar(filtros.genero);
  return AUTORES_27.filter((registro) => {
    const textoAutor = normalizar(`${registro.nombre} ${registro.perfil}`);
    const textoTema = normalizar(`${registro.etiquetas.join(' ')} ${registro.obras.map((obra) => `${obra.titulo} ${obra.genero} ${obra.descripcion}`).join(' ')}`);
    const coincideAutor = !autor || textoAutor.includes(autor);
    const coincideTema = !tema || textoTema.includes(tema);
    return coincideAutor && coincideTema;
  });
}

export async function buscarAutoresController(filtros, incluirCatalogos = false) {
  if (!filtros || !filtros.autor) {
    throw new TypeError('El nombre del autor es obligatorio para la búsqueda.');
  }

  const autoresLocales = buscarAutoresLocales(filtros);
  let autores = [...autoresLocales];
  let advertencia = '';
  if (incluirCatalogos) {
    try {
      const externos = await buscarAutores(filtros.autor);
      const nombresLocales = autoresLocales.map((autor) => normalizar(autor.nombre));
      const autoresExternos = externos
        .map(normalizarAutorOpenLibrary)
        .filter((autor) => autor && !nombresLocales.includes(normalizar(autor.name)));
      autores = [...autores, ...autoresExternos];
    } catch (error) {
      advertencia = error instanceof Error ? error.message : String(error);
    }
  }

  actualizarCategoria('autores');
  actualizarAutorSeleccionado(null);
  actualizarResultados(autores);
  return { resultados: autores, advertencia };
}

export async function cargarObrasDeAutor(autor) {
  if (!autor || (!autor.key && !autor.id)) {
    throw new TypeError('El autor seleccionado no tiene una clave válida.');
  }

  const registroLocal = AUTORES_27.find((registro) => registro.id === autor.id);
  let obras;
  if (registroLocal) {
    obras = registroLocal.obras.map((obra, indice) => ({
      ...obra,
      id: `${registroLocal.id}-${indice}`,
      autor: registroLocal.nombre,
      autorId: registroLocal.id,
    }));
    actualizarAutorSeleccionado(registroLocal);
  } else {
    const nombreAutor = autor.nombre || autor.name;
    obras = (await obtenerObrasAutor(autor.key))
      .map((obra) => ({
        ...obra,
        autor: nombreAutor,
        fuenteExterna: 'Open Library',
      }));
    actualizarAutorSeleccionado({
      nombre: nombreAutor,
      key: autor.key,
      perfil: 'Registro recuperado de Open Library. Amplía la información en el catálogo bibliográfico.',
      obras: [],
      fuentes: ['Open Library'],
    });
  }
  actualizarCategoria('obras');
  actualizarResultados(obras);
  return obras;
}

export async function enriquecerPerfilAutor(autor) {
  const registroLocal = autor
    ? AUTORES_27.find((registro) => registro.id === autor.id)
    : null;
  const perfilBase = registroLocal
    ? registroLocal.perfil
    : (autor && autor.perfil ? autor.perfil : '');
  const nombre = registroLocal
    ? registroLocal.nombre
    : (autor ? (autor.nombre || autor.name) : '');
  if (!nombre) {
    throw new TypeError('No se puede ampliar un perfil sin nombre.');
  }

  try {
    const resumen = await obtenerResumenAutor(nombre);
    const seleccionado = {
      ...(registroLocal || autor),
      perfilWikipedia: resumen.extract,
      urlWikipedia: resumen.content_urls
        && resumen.content_urls.desktop
        && resumen.content_urls.desktop.page
        ? resumen.content_urls.desktop.page
        : '',
    };
    actualizarAutorSeleccionado(seleccionado);
    return { perfil: resumen.extract, advertencia: '' };
  } catch (error) {
    return {
      perfil: perfilBase,
      advertencia: error instanceof Error ? error.message : String(error),
    };
  }
}

function buscarObrasLocales(filtros) {
  const autor = normalizar(filtros.autor);
  const tema = normalizar(filtros.genero);
  const todasLasObras = [];
  AUTORES_27.forEach((registro) => {
    registro.obras.forEach((obra, indice) => {
      todasLasObras.push({
        ...obra,
        id: `${registro.id}-${indice}`,
        autor: registro.nombre,
        autorId: registro.id,
      });
    });
  });

  return todasLasObras.filter((obra) => {
    const textoAutor = normalizar(obra.autor);
    const textoObra = normalizar(`${obra.titulo} ${obra.genero} ${obra.descripcion}`);
    const coincideAutor = !autor || textoAutor.includes(autor);
    const coincideTema = !tema || textoObra.includes(tema);
    const coincideDesde = filtros.desde === null || obra.año >= filtros.desde;
    const coincideHasta = filtros.hasta === null || obra.año <= filtros.hasta;
    return coincideAutor && coincideTema && coincideDesde && coincideHasta;
  });
}

export async function buscarObrasController(filtros, incluirCatalogos = false) {
  let obras = buscarObrasLocales(filtros);
  let advertencia = '';
  if (incluirCatalogos) {
    try {
      const externas = await buscarObras(filtros);
      const clavesLocales = obras.map((obra) => normalizar(`${obra.titulo}|${obra.autor}`));
      const externasUnicas = externas
        .map(normalizarObraOpenLibrary)
        .filter(Boolean)
        .filter((obra) => !clavesLocales.includes(normalizar(
          `${obra.title}|${obra.author_name[0] || ''}`,
        )))
        .map((obra) => ({ ...obra, fuenteExterna: 'Open Library' }));
      obras = [...obras, ...externasUnicas];
    } catch (error) {
      advertencia = error instanceof Error ? error.message : String(error);
    }
  }

  actualizarCategoria('obras');
  actualizarResultados(obras);
  return { resultados: obras, advertencia };
}

function normalizarFavorito(favorito) {
  const registro = favorito || {};
  return {
    ...registro,
    titulo: registro.titulo || registro.title || 'Obra sin título',
    autor: registro.autor || registro.author || 'Autoría no indicada',
    categoria: registro.categoria || registro.genre || 'Obra',
    obraId: registro.obraId || registro.workId || registro.key || '',
  };
}

export async function cargarBibliotecaController() {
  const favoritosRecibidos = await getFavoritos();
  const notasRecibidas = await getNotas();
  if (!Array.isArray(favoritosRecibidos) || !Array.isArray(notasRecibidas)) {
    throw new TypeError('La API local devolvió una biblioteca con un formato inesperado.');
  }

  const favoritos = favoritosRecibidos.map(normalizarFavorito);
  actualizarFavoritos(favoritos);
  actualizarNotas(notasRecibidas);
  return { favoritos, notas: notasRecibidas };
}

export async function agregarFavoritoController(obra) {
  if (!obra || !obra.titulo || !obra.autor) {
    throw new TypeError('La obra debe tener título y autoría para guardarse.');
  }

  const favoritosActuales = await getFavoritos();
  if (!Array.isArray(favoritosActuales)) {
    throw new TypeError('No se pudo validar la lista actual de favoritos.');
  }
  const yaGuardada = favoritosActuales.some((favorito) => {
    const idObra = favorito.obraId || favorito.workId || favorito.key || '';
    const titulo = favorito.titulo || favorito.title || '';
    return String(idObra) === String(obra.obraId)
      && String(titulo).toLocaleLowerCase('es') === obra.titulo.toLocaleLowerCase('es');
  });
  if (yaGuardada) {
    throw new Error('Esta obra ya está guardada en tu biblioteca.');
  }

  await agregarFavorito({
    ...obra,
    fechaAgregado: new Date().toISOString().slice(0, 10),
  });
  const { favoritos } = await cargarBibliotecaController();
  return favoritos.find((favorito) => favorito.titulo === obra.titulo && favorito.autor === obra.autor);
}

export async function eliminarFavoritoController(id) {
  if (id === undefined || id === null || id === '') {
    throw new TypeError('El favorito no tiene un identificador válido.');
  }
  await eliminarFavorito(id);
  await cargarBibliotecaController();
}

export async function guardarNotaController(obraId, texto, notaId = null) {
  const contenido = typeof texto === 'string' ? texto.trim() : '';
  if (!obraId || contenido.length === 0 || contenido.length > 1000) {
    throw new TypeError('Selecciona una obra y escribe una nota de hasta 1000 caracteres.');
  }

  const favoritos = await getFavoritos();
  if (!Array.isArray(favoritos)) {
    throw new TypeError('No se pudo comprobar la obra seleccionada.');
  }
  const favorito = favoritos.find((item) => String(item.id) === String(obraId));
  if (!favorito) {
    throw new Error('La obra seleccionada ya no está en la biblioteca.');
  }

  if (notaId !== null && notaId !== undefined && notaId !== '') {
    await actualizarNota(notaId, {
      obraId: favorito.id,
      tituloObra: favorito.titulo || favorito.title || 'Obra sin título',
      textoNota: contenido,
      fecha: new Date().toISOString().slice(0, 10),
    });
  } else {
    await guardarNota({
      obraId: favorito.id,
      tituloObra: favorito.titulo || favorito.title || 'Obra sin título',
      textoNota: contenido,
      fecha: new Date().toISOString().slice(0, 10),
    });
  }
  await cargarBibliotecaController();
}

export async function eliminarNotaController(notaId) {
  if (notaId === undefined || notaId === null || notaId === '') {
    throw new TypeError('La nota no tiene un identificador válido.');
  }
  await eliminarNota(notaId);
  await cargarBibliotecaController();
}

/* =============================================================
   4. Renderizado y UI
   ============================================================= */
export function obtenerElemento(selector, raiz = document) {
  const elemento = raiz.querySelector(selector);
  if (!elemento) {
    throw new Error(`No se encontró el elemento requerido: ${selector}`);
  }
  return elemento;
}

export function crearElemento(etiqueta, { clase = '', texto = '' } = {}) {
  const elemento = document.createElement(etiqueta);
  if (clase) {
    elemento.className = clase;
  }
  if (texto) {
    elemento.textContent = texto;
  }
  return elemento;
}

export function renderizarEstadoVacio(contenedor, mensaje) {
  const etiqueta = contenedor.tagName === 'UL' ? 'li' : 'p';
  const estadoEl = crearElemento(etiqueta, { clase: 'empty-state', texto: mensaje });
  contenedor.replaceChildren(estadoEl);
}

export function mostrarFeedback(elemento, mensaje, tipo = 'info') {
  elemento.textContent = mensaje;
  elemento.dataset.type = tipo;
  elemento.hidden = mensaje.length === 0;
  elemento.setAttribute('role', tipo === 'error' ? 'alert' : 'status');
}

export function establecerCarga(formulario, indicador, cargando) {
  formulario.setAttribute('aria-busy', String(cargando));
  formulario.querySelectorAll('button[type="submit"]').forEach((boton) => {
    boton.disabled = cargando;
  });
  indicador.hidden = !cargando;
}

export function actualizarPestanaActiva(categoria, pestanas) {
  pestanas.forEach((pestana) => {
    const activa = pestana.dataset.category === categoria;
    pestana.setAttribute('aria-selected', String(activa));
    pestana.tabIndex = activa ? 0 : -1;
    pestana.classList.toggle('is-active', activa);
  });

  const pestanaActiva = pestanas.find((pestana) => pestana.dataset.category === categoria);
  const panel = document.querySelector('[role="tabpanel"]');
  if (pestanaActiva && panel) {
    panel.setAttribute('aria-labelledby', pestanaActiva.id);
  }
}

function crearTarjetaAutor(autor) {
  const tarjeta = crearElemento('article', { clase: 'result-card' });
  const nombre = autor.nombre || autor.name || 'Autoría sin identificar';
  const obrasLocales = Array.isArray(autor.obras) ? autor.obras : [];
  const titulo = crearElemento('h3', { texto: nombre });
  const periodo = Number.isInteger(autor.nacimiento)
    ? `${autor.nacimiento}–${autor.fallecimiento || 'actualidad'}`
    : 'Catálogo externo';
  const metadatos = crearElemento('p', { clase: 'card-meta', texto: periodo });
  const descripcion = crearElemento('p', {
    texto: autor.perfil || (autor.top_work
        ? `Obra destacada: ${autor.top_work}`
        : `${autor.work_count || 'Varias'} obras registradas en Open Library.`),
  });
  const etiquetas = crearElemento('p', {
    texto: Array.isArray(autor.etiquetas) ? autor.etiquetas.join(' · ') : '',
  });
  const acciones = crearElemento('div', { clase: 'card-actions' });
  const boton = crearElemento('button', {
    clase: 'button',
    texto: autor.id ? 'Ver perfil y obras' : 'Consultar obras',
  });
  boton.type = 'button';
  boton.dataset.action = 'author-detail';
  boton.dataset.authorName = nombre;
  boton.dataset.authorId = autor.id || '';
  boton.dataset.authorKey = autor.key || '';
  boton.disabled = !autor.id && !autor.key;
  acciones.append(boton);
  if (obrasLocales.length > 0) {
    const obras = crearElemento('p', {
      clase: 'card-meta',
      texto: `${obrasLocales.length} referencias de obras`,
    });
    tarjeta.append(titulo, metadatos, descripcion, etiquetas, obras, acciones);
  } else {
    tarjeta.append(titulo, metadatos, descripcion, acciones);
  }
  return tarjeta;
}

export function renderizarAutores(contenedor, autores) {
  if (!Array.isArray(autores) || autores.length === 0) {
    renderizarEstadoVacio(contenedor, 'No se encontraron autores con esos criterios. Prueba otro nombre o tema.');
    return;
  }
  const fragmento = document.createDocumentFragment();
  autores.forEach((autor) => fragmento.append(crearTarjetaAutor(autor || {})));
  contenedor.replaceChildren(fragmento);
}

export function renderizarPerfilAutor(contenedor, autor) {
  if (!autor) {
    contenedor.replaceChildren();
    contenedor.hidden = true;
    return;
  }

  const perfil = crearElemento('div');
  perfil.append(
    crearElemento('p', { clase: 'eyebrow', texto: 'Ficha de autoría' }),
    crearElemento('h3', { texto: autor.nombre || autor.name || 'Autoría sin identificar' }),
    crearElemento('p', {
      clase: 'card-meta',
      texto: [autor.lugar, autor.nacimiento && `${autor.nacimiento}–${autor.fallecimiento || 'actualidad'}`]
        .filter(Boolean)
        .join(' · ') || 'Registro de catálogo externo',
    }),
    crearElemento('p', { texto: autor.perfil || 'No hay una biografía local disponible.' }),
  );

  if (autor.perfilWikipedia) {
    perfil.append(crearElemento('p', {
      texto: `Resumen de Wikipedia: ${autor.perfilWikipedia}`,
    }));
    if (autor.urlWikipedia) {
      const enlace = crearElemento('a', { texto: 'Consultar artículo en Wikipedia' });
      enlace.href = autor.urlWikipedia;
      enlace.target = '_blank';
      enlace.rel = 'noopener noreferrer';
      perfil.append(enlace);
    }
  }

  if (Array.isArray(autor.fuentes) && autor.fuentes.length > 0) {
    const lista = crearElemento('ul', { clase: 'source-chips' });
    autor.fuentes.forEach((fuente) => lista.append(crearElemento('li', { texto: fuente })));
    perfil.append(
      crearElemento('h4', { texto: 'Fuentes para ampliar' }),
      lista,
    );
  }

  contenedor.replaceChildren(perfil);
  contenedor.hidden = false;
}

function crearTarjetaObra(obra) {
  const tarjeta = crearElemento('article', { clase: 'result-card' });
  const titulo = obra.titulo || obra.title || obra.title_suggest || 'Obra sin título';
  let autoresExternos = [];
  if (Array.isArray(obra.author_name)) {
    autoresExternos = obra.author_name;
  } else if (Array.isArray(obra.authors)) {
    obra.authors.forEach((autorExterno) => {
      if (autorExterno && autorExterno.name) {
        autoresExternos.push(autorExterno.name);
      }
    });
  }
  const autor = obra.autor || (autoresExternos.length > 0
    ? autoresExternos.join(', ')
    : 'Autoría no indicada');
  const año = obra.año || obra.first_publish_year;
  const genero = obra.genero || 'Obra';
  const descripcion = obra.descripcion
    || 'Consulta el catálogo bibliográfico para localizar ediciones y datos completos.';
  tarjeta.append(
    crearElemento('p', { clase: 'card-meta', texto: `${genero}${año ? ` · ${año}` : ''}` }),
    crearElemento('h3', { texto: titulo }),
    crearElemento('p', { texto: `Autoría: ${autor}` }),
    crearElemento('p', { texto: descripcion }),
  );

  const acciones = crearElemento('div', { clase: 'card-actions' });
  const boton = crearElemento('button', { clase: 'button', texto: 'Guardar en mi biblioteca' });
  boton.type = 'button';
  boton.dataset.action = 'favorite-add';
  boton.dataset.workId = obra.id || obra.key || '';
  boton.dataset.title = titulo;
  boton.dataset.author = autor;
  boton.dataset.genre = genero;
  boton.dataset.year = año || '';
  boton.dataset.description = descripcion;
  acciones.append(boton);
  tarjeta.append(acciones);
  return tarjeta;
}

export function renderizarObras(contenedor, obras) {
  if (!Array.isArray(obras) || obras.length === 0) {
    renderizarEstadoVacio(contenedor, 'No se encontraron obras. Amplía el rango de años o cambia los filtros.');
    return;
  }
  const fragmento = document.createDocumentFragment();
  obras.forEach((obra) => fragmento.append(crearTarjetaObra(obra || {})));
  contenedor.replaceChildren(fragmento);
}

function textoHelper(elemento, clase, contenido) {
  return crearElemento(elemento, { clase, texto: contenido || '' });
}

export function renderizarBiblioteca(favoritos, notas, contenedores) {
  const listaFavoritos = contenedores.favoritos;
  const listaNotas = contenedores.notas;
  const selectorObra = contenedores.selectorObra;
  const opciones = [crearElemento('option', { texto: 'Selecciona una obra guardada' })];
  opciones[0].value = '';

  if (!Array.isArray(favoritos) || favoritos.length === 0) {
    renderizarEstadoVacio(listaFavoritos, 'Tu biblioteca está vacía. Guarda una obra desde los resultados.');
  } else {
    const fragmento = document.createDocumentFragment();
    favoritos.forEach((favorito) => {
      const item = crearElemento('li', { clase: 'library-item' });
      const contenido = crearElemento('div');
      contenido.append(
        textoHelper('h4', '', favorito.titulo || 'Obra sin título'),
        textoHelper('p', '', `${favorito.autor || 'Autoría no indicada'} · ${favorito.categoria || 'Obra'}`),
      );
      const eliminar = crearElemento('button', { clase: 'icon-button', texto: 'Quitar' });
      eliminar.type = 'button';
      eliminar.dataset.action = 'favorite-delete';
      eliminar.dataset.id = favorito.id || '';
      eliminar.setAttribute('aria-label', `Quitar ${favorito.titulo || 'obra'} de la biblioteca`);
      item.append(contenido, eliminar);
      fragmento.append(item);

      const opcion = crearElemento('option', {
        texto: `${favorito.titulo || 'Obra sin título'} — ${favorito.autor || 'Autoría desconocida'}`,
      });
      opcion.value = String(favorito.id || '');
      opciones.push(opcion);
    });
    listaFavoritos.replaceChildren(fragmento);
  }

  selectorObra.replaceChildren(...opciones);

  if (!Array.isArray(notas) || notas.length === 0) {
    renderizarEstadoVacio(listaNotas, 'Todavía no hay notas. Añade una reflexión o pregunta de lectura.');
  } else {
    const fragmento = document.createDocumentFragment();
    notas.forEach((nota) => {
      const item = crearElemento('li', { clase: 'library-item' });
      const contenido = crearElemento('div');
      contenido.append(
        textoHelper('h4', '', nota.tituloObra || 'Nota de lectura'),
        textoHelper('p', '', nota.textoNota || ''),
        textoHelper('p', '', nota.fecha || ''),
      );
      const acciones = crearElemento('div', { clase: 'card-actions' });
      const editar = crearElemento('button', { clase: 'button-secondary', texto: 'Editar' });
      editar.type = 'button';
      editar.dataset.action = 'note-edit';
      editar.dataset.id = nota.id || '';
      editar.dataset.workId = nota.obraId || '';
      editar.dataset.text = nota.textoNota || '';
      const eliminar = crearElemento('button', { clase: 'icon-button', texto: 'Eliminar' });
      eliminar.type = 'button';
      eliminar.dataset.action = 'note-delete';
      eliminar.dataset.id = nota.id || '';
      acciones.append(editar, eliminar);
      item.append(contenido, acciones);
      fragmento.append(item);
    });
    listaNotas.replaceChildren(fragmento);
  }
}

export function renderizarBibliografia(contenedor, fuentes) {
  const fragmento = document.createDocumentFragment();
  fuentes.forEach((fuente) => {
    const tarjeta = crearElemento('article', { clase: 'bibliography-card' });
    tarjeta.append(
      crearElemento('p', { clase: 'card-meta', texto: fuente.tipo }),
      crearElemento('h3', { texto: fuente.nombre }),
      crearElemento('p', { texto: fuente.descripcion }),
    );
    const enlace = crearElemento('a', { texto: 'Visitar recurso' });
    enlace.href = fuente.url;
    enlace.target = '_blank';
    enlace.rel = 'noopener noreferrer';
    tarjeta.append(enlace);
    fragmento.append(tarjeta);
  });
  contenedor.replaceChildren(fragmento);
}

export function leerFiltrosFormulario(formulario) {
  if (!(formulario instanceof HTMLFormElement)) {
    throw new TypeError('Se esperaba un formulario de búsqueda válido.');
  }
  const datos = new FormData(formulario);
  return {
    filtros: {
      autor: datos.get('autor'),
      genero: datos.get('genero'),
      idioma: datos.get('idioma'),
      desde: datos.get('desde'),
      hasta: datos.get('hasta'),
    },
    incluirCatalogos: datos.get('externos') === 'on',
  };
}

/* =============================================================
   5. Inicialización de la Aplicación en el Navegador
   ============================================================= */
async function inicializarAplicacion() {
  const ui = {
    formulario: obtenerElemento('#search-form'),
    resultados: obtenerElemento('#search-results'),
    estado: obtenerElemento('#feedback'),
    pestanas: [...document.querySelectorAll('[data-category]')],
    perfil: obtenerElemento('#author-profile'),
    tituloResultados: obtenerElemento('#results-title'),
    cuentaResultados: obtenerElemento('#results-count'),
    indicadorCarga: obtenerElemento('#loading-indicator'),
    catalogosExternos: obtenerElemento('#include-external'),
    limpiar: obtenerElemento('#clear-filters'),
    camposAnio: [
      obtenerElemento('#year-from'),
      obtenerElemento('#year-to'),
    ],
    bibliografia: obtenerElemento('#bibliography-list'),
    bibliotecaEstado: obtenerElemento('#library-status'),
    favoritos: obtenerElemento('#favorites-list'),
    notas: obtenerElemento('#notes-list'),
    selectorObra: obtenerElemento('#note-work'),
    formularioNotas: obtenerElemento('#note-form'),
  };

  const renderizarBibliotecaEstado = (est) => renderizarBiblioteca(
    est.favoritos,
    est.notas,
    {
      favoritos: ui.favoritos,
      notas: ui.notas,
      selectorObra: ui.selectorObra,
    },
  );

  const renderizarEstadoCompleto = (est) => {
    actualizarPestanaActiva(est.categoriaActiva, ui.pestanas);

    ui.camposAnio.forEach((campo) => {
      campo.disabled = est.categoriaActiva === 'autores';
    });

    ui.tituloResultados.textContent = est.categoriaActiva === 'autores'
      ? 'Autores y autoras'
      : est.autorSeleccionado
        ? `Obras de ${est.autorSeleccionado.nombre || est.autorSeleccionado.name}`
        : 'Obras del archivo';

    if (est.categoriaActiva === 'autores') {
      renderizarAutores(ui.resultados, est.resultados);
    } else {
      renderizarObras(ui.resultados, est.resultados);
    }

    ui.cuentaResultados.textContent = `${est.resultados.length} ${
      est.resultados.length === 1 ? 'registro' : 'registros'
    }`;

    renderizarPerfilAutor(ui.perfil, est.autorSeleccionado);
  };

  const cancelarSuscripcion = suscribirse((est, propiedades) => {
    if (propiedades.some((p) => ['categoriaActiva', 'resultados', 'autorSeleccionado'].includes(p))) {
      renderizarEstadoCompleto(est);
    }
    if (propiedades.some((p) => ['favoritos', 'notas'].includes(p))) {
      renderizarBibliotecaEstado(est);
    }
  });

  window.addEventListener('pagehide', cancelarSuscripcion, { once: true });

  renderizarBibliografia(ui.bibliografia, FUENTES_BIBLIOGRAFICAS);
  actualizarResultados(AUTORES_27);

  // Cambiar entre autores y obras
  ui.pestanas.forEach((pestana) => {
    pestana.addEventListener('click', () => {
      try {
        actualizarCategoria(pestana.dataset.category);
        actualizarAutorSeleccionado(null);
        actualizarResultados(
          pestana.dataset.category === 'autores' ? AUTORES_27 : []
        );
        mostrarFeedback(ui.estado, '');
      } catch (error) {
        mostrarFeedback(ui.estado, error.message, 'error');
      }
    });
  });

  // Navegación accesible con teclado
  ui.pestanas.forEach((pestana, indice) => {
    pestana.addEventListener('keydown', (evento) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(evento.key)) {
        return;
      }
      evento.preventDefault();
      const destino = evento.key === 'Home'
        ? 0
        : evento.key === 'End'
          ? ui.pestanas.length - 1
          : (indice + (evento.key === 'ArrowRight' ? 1 : ui.pestanas.length - 1)) % ui.pestanas.length;

      ui.pestanas[destino].focus();
      ui.pestanas[destino].click();
    });
  });

  // Buscar autores u obras
  ui.formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    const { filtros: datos, incluirCatalogos } = leerFiltrosFormulario(ui.formulario);
    const validacion = validarFiltros({ ...datos }, obtenerEstado().categoriaActiva);

    if (!validacion.valido) {
      mostrarFeedback(ui.estado, validacion.errores.join(' '), 'error');
      return;
    }

    const { filtros } = validacion;
    const filtrosEstado = {
      autor: filtros.autor,
      genero: filtros.genero,
      idioma: filtros.idioma,
      rangoCronologico: {
        desde: filtros.desde || '',
        hasta: filtros.hasta || '',
      },
    };

    try {
      actualizarFiltros(filtrosEstado);
      mostrarFeedback(ui.estado, 'Buscando…');
      establecerCarga(ui.formulario, ui.indicadorCarga, true);

      let resultado;
      if (obtenerEstado().categoriaActiva === 'autores') {
        resultado = await buscarAutoresController(filtros, incluirCatalogos);
      } else {
        resultado = await buscarObrasController(filtros, incluirCatalogos);
      }

      if (resultado.advertencia) {
        mostrarFeedback(
          ui.estado,
          `Se muestran los resultados del archivo local. ${resultado.advertencia}`,
          'error'
        );
      } else {
        mostrarFeedback(
          ui.estado,
          `Búsqueda completada: ${resultado.resultados.length} resultados.`,
          'success'
        );
      }
    } catch (error) {
      mostrarFeedback(
        ui.estado,
        error.message || 'No se pudo completar la búsqueda.',
        'error'
      );
    } finally {
      establecerCarga(ui.formulario, ui.indicadorCarga, false);
    }
  });

  // Limpiar filtros
  ui.limpiar.addEventListener('click', async () => {
    try {
      ui.formulario.reset();
      limpiarFiltros();
      actualizarAutorSeleccionado(null);

      if (obtenerEstado().categoriaActiva === 'autores') {
        actualizarCategoria('autores');
        actualizarResultados(AUTORES_27);
      } else {
        await buscarObrasController({
          autor: '',
          genero: '',
          idioma: 'es',
          desde: null,
          hasta: null,
        }, false);
      }

      mostrarFeedback(ui.estado, 'Filtros limpiados correctamente.', 'success');
    } catch (error) {
      mostrarFeedback(ui.estado, error.message || 'No se pudieron limpiar los filtros.', 'error');
    }
  });

  // Acciones sobre tarjetas de resultados
  ui.resultados.addEventListener('click', async (evento) => {
    const boton = evento.target.closest('button[data-action]');
    if (!boton || !ui.resultados.contains(boton)) {
      return;
    }

    if (boton.dataset.action === 'author-detail') {
      try {
        const autor = {
          id: boton.dataset.authorId,
          key: boton.dataset.authorKey,
          nombre: boton.dataset.authorName,
        };
        mostrarFeedback(ui.estado, `Cargando obras de ${autor.nombre}…`);
        await cargarObrasDeAutor(autor);
        const perfil = await enriquecerPerfilAutor(autor);
        renderizarEstadoCompleto(obtenerEstado());
        mostrarFeedback(
          ui.estado,
          perfil.advertencia
            ? `Obras cargadas. El resumen complementario no está disponible: ${perfil.advertencia}`
            : 'Perfil y obras cargados.',
          perfil.advertencia ? 'info' : 'success'
        );
      } catch (error) {
        mostrarFeedback(
          ui.estado,
          error.message || 'No se pudieron cargar las obras del autor.',
          'error'
        );
      }
      return;
    }

    if (boton.dataset.action === 'favorite-add') {
      try {
        await agregarFavoritoController({
          obraId: boton.dataset.workId,
          titulo: boton.dataset.title,
          autor: boton.dataset.author,
          categoria: boton.dataset.genre,
          año: boton.dataset.year,
          descripcion: boton.dataset.description,
        });
        mostrarFeedback(ui.estado, 'Obra guardada en Mi biblioteca del 27.', 'success');
      } catch (error) {
        mostrarFeedback(ui.estado, error.message || 'No se pudo guardar la obra.', 'error');
      }
    }
  });

  // Eliminar favorito
  ui.favoritos.addEventListener('click', async (evento) => {
    const boton = evento.target.closest('button[data-action="favorite-delete"]');
    if (!boton || !ui.favoritos.contains(boton)) {
      return;
    }

    try {
      await eliminarFavoritoController(boton.dataset.id);
      ui.bibliotecaEstado.textContent = 'Biblioteca sincronizada.';
      mostrarFeedback(ui.estado, 'Obra eliminada de la biblioteca.', 'success');
    } catch (error) {
      mostrarFeedback(ui.estado, error.message || 'No se pudo eliminar la obra.', 'error');
    }
  });

  // Editar o eliminar notas
  ui.notas.addEventListener('click', async (evento) => {
    const boton = evento.target.closest('button[data-action]');
    if (!boton || !ui.notas.contains(boton)) {
      return;
    }

    if (boton.dataset.action === 'note-edit') {
      ui.formularioNotas.dataset.editId = boton.dataset.id;
      ui.formularioNotas.elements.obra.value = String(boton.dataset.workId);
      ui.formularioNotas.elements.texto.value = boton.dataset.text;
      ui.formularioNotas.querySelector('button[type="submit"]').textContent = 'Actualizar nota';
      ui.formularioNotas.scrollIntoView({ behavior: 'smooth', block: 'center' });
      ui.formularioNotas.elements.texto.focus();
      return;
    }

    if (boton.dataset.action === 'note-delete') {
      try {
        await eliminarNotaController(boton.dataset.id);
        delete ui.formularioNotas.dataset.editId;
        ui.formularioNotas.reset();
        ui.formularioNotas.querySelector('button[type="submit"]').textContent = 'Guardar nota';
        ui.bibliotecaEstado.textContent = 'Biblioteca sincronizada.';
        mostrarFeedback(ui.estado, 'Nota eliminada.', 'success');
      } catch (error) {
        mostrarFeedback(ui.estado, error.message || 'No se pudo eliminar la nota.', 'error');
      }
    }
  });

  // Guardar nota
  ui.formularioNotas.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    const datos = new FormData(ui.formularioNotas);

    try {
      await guardarNotaController(
        datos.get('obra'),
        datos.get('texto'),
        ui.formularioNotas.dataset.editId || null,
      );
      ui.formularioNotas.reset();
      delete ui.formularioNotas.dataset.editId;
      ui.formularioNotas.querySelector('button[type="submit"]').textContent = 'Guardar nota';
      ui.bibliotecaEstado.textContent = 'Biblioteca sincronizada.';
      mostrarFeedback(ui.estado, 'Nota de lectura guardada.', 'success');
    } catch (error) {
      mostrarFeedback(ui.estado, error.message || 'No se pudo guardar la nota.', 'error');
    }
  });

  // Conexión inicial con json-server
  try {
    await cargarBibliotecaController();
    ui.bibliotecaEstado.textContent = 'Biblioteca conectada y sincronizada.';
  } catch (error) {
    ui.bibliotecaEstado.textContent =
      'No se pudo conectar con json-server. Inicia la API local para guardar favoritos y notas.';
    mostrarFeedback(
      ui.estado,
      error.message || 'La API local de la biblioteca no está disponible.',
      'error'
    );
  }

  renderizarEstadoCompleto(obtenerEstado());
  renderizarBibliotecaEstado(obtenerEstado());
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener(
      'DOMContentLoaded',
      () => {
        inicializarAplicacion().catch(
          (error) => console.error('No se pudo iniciar el archivo.', error)
        );
      },
      { once: true }
    );
  } else {
    inicializarAplicacion().catch(
      (error) => console.error('No se pudo iniciar el archivo.', error)
    );
  }
}
