import { crearElemento, renderizarEstadoVacio } from './dom.js';
function crearTarjetaObra(obra) {
    const tarjeta = crearElemento('article', { clase: 'result-card' });
    const titulo = obra.titulo || obra.title || obra.title_suggest || 'Obra sin título';

    let autor = obra.autor;

    if (!autor && Array.isArray(obra.author_name)) {
        autor = obra.author_name.join(', ');
    }
    if (!autor && Array.isArray(obra.authors)) {
        autor = obra.authors
            .map(item => item?.name)
            .filter(Boolean)
            .join(', ');
    }

    autor = autor || 'Autoría no indicada';
    const año = obra.año || obra.first_publish_year;
    const genero = obra.genero || 'Obra';

    const descripcion = obra.descripcion ||
        'Consulta el catálogo bibliográfico para localizar ediciones y datos completos.';

    tarjeta.append(
        crearElemento('p', {
            clase: 'card-meta',
            texto: año ? `${genero} · ${año}` : genero
        }),
        crearElemento('h3', { texto: titulo }),
        crearElemento('p', { texto: `Autoría: ${autor}` }),
        crearElemento('p', { texto: descripcion })
    );

    const acciones = crearElemento('div', { clase: 'card-actions' });
    const boton = crearElemento('button', {
        clase: 'button',
        texto: 'Guardar en mi biblioteca'
    });

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
        renderizarEstadoVacio(
            contenedor,
            'No se encontraron obras. Amplía el rango de años o cambia los filtros.'
        );
        return;
    }
    const fragmento = document.createDocumentFragment();

    obras.forEach(obra => {
        fragmento.append(crearTarjetaObra(obra || {}));
    });

    contenedor.replaceChildren(fragmento);
}
