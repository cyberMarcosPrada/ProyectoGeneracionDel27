# Manual de usuario

## Buscar autores

1. Selecciona la pestaña **Autores**.
2. Elige un autor o escribe parte de su nombre.
3. Opcionalmente, selecciona un género o tema.
4. Pulsa **Buscar en el archivo**.
5. Activa **Ampliar con Open Library** para combinar resultados externos.

## Consultar obras

1. Selecciona la pestaña **Obras**.
2. Indica autor, género y/o rango de años.
3. Pulsa **Buscar en el archivo**.
4. El rango inicial no puede ser posterior al rango final.

## Consultar el perfil de un autor

Pulsa **Ver perfil y obras** en una ficha local. La aplicación mostrará las obras locales y, cuando esté disponible, un resumen complementario de Wikipedia.

## Guardar una obra

1. Inicia la API local con `npm run api`.
2. Busca una obra.
3. Pulsa **Guardar en mi biblioteca**.
4. La obra aparecerá en el panel **Mi biblioteca del 27**.

No se permiten favoritos duplicados.

## Añadir una nota

1. Selecciona una obra guardada.
2. Escribe una nota de hasta 1000 caracteres.
3. Pulsa **Guardar nota**.

Para modificar una nota, pulsa **Editar**, cambia el texto y selecciona **Actualizar nota**. Para eliminarla, pulsa **Eliminar**.

## Limpiar filtros

Pulsa **Limpiar filtros** para restaurar los campos y volver al catálogo local correspondiente.

## Solución de problemas

- Si la biblioteca no se conecta, verifica que JSON Server esté activo en el puerto 3000.
- Para iniciarlo, ejecuta `npm run api` en una terminal y déjala abierta; en otra, ejecuta `npm run dev`.
- Si Open Library o Wikipedia no responden, los resultados locales siguen estando disponibles.
- Si no aparecen estilos, verifica que Vite sirva `index.html` desde el puerto configurado.
