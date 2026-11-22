# Arquitectura del proyecto

## Visión general

La aplicación utiliza HTML, CSS y JavaScript sin framework. Vite sirve la página durante el desarrollo y crea la carpeta `dist` al compilar. El catálogo local, las peticiones a servicios y la interfaz están separados en archivos para que cada parte tenga una responsabilidad clara.

## Flujo principal

1. `index.html` carga la aplicación desde `src/js/app.js`.
2. `app.js` obtiene los elementos del DOM y registra manejadores para clics y envíos de formularios.
3. Los filtros se validan antes de iniciar una búsqueda.
4. El controlador local filtra `AUTORES_27` o los catálogos de obras.
5. Si se solicita, se consulta Open Library y se añaden registros externos normalizados.
6. Los resultados se almacenan en el estado global y se renderizan.
7. Los favoritos y las notas se sincronizan con JSON Server.

## Carpetas

- `src/data/`: catálogo local y fuentes bibliográficas.
- `src/js/api/`: clientes HTTP de las APIs públicas y privada.
- `src/js/api/http.js`: función común para usar `fetch`, comprobar errores HTTP y leer respuestas JSON.
- `src/js/utils/`: validaciones y normalizaciones reutilizables.
- `src/js/app.js`: estado, controladores, renderizado e inicialización.
- `src/css/`: presentación y componentes responsivos.
- `tests/`: pruebas automáticas.
- `docs/`: arquitectura, contratos, manual y pruebas.

## Estado

El estado contiene:

- categoría activa;
- filtros activos;
- resultados;
- favoritos;
- notas;
- autor seleccionado.

El estado es un objeto normal de JavaScript. Cuando cambian la pestaña, los resultados, el perfil o la biblioteca, las funciones de actualización avisan a la interfaz para que vuelva a mostrar esos datos.

## Relación con los apuntes de DWEC

- **Arrays y objetos:** el catálogo es un array de objetos; las búsquedas utilizan métodos como `filter`, `map` y `forEach`.
- **DOM:** `app.js` encuentra elementos con selectores y crea tarjetas con `createElement` y `textContent`.
- **Eventos y formularios:** `addEventListener` responde a clics, teclas y envíos; `FormData` lee los campos.
- **AJAX y REST:** `solicitarJSON` usa `fetch` y `async`/`await`. `privateApi.js` muestra `GET`, `POST`, `PATCH` y `DELETE`.
- **JSON Server:** `db.json` sirve como base de datos de ejemplo para favoritos y notas.

## Persistencia

`db.json` contiene las colecciones `favoritos` y `notas`. JSON Server expone operaciones REST para leer, crear, actualizar y eliminar.

## Dependencias

- Vite para desarrollo y compilación.
- JSON Server para persistencia local.
- Open Library y Wikipedia como servicios externos opcionales.
