# Plan de pruebas

## Ejecución

```powershell
npm test
```

Las pruebas utilizan Node Test Runner y no requieren servidor web.

## Cobertura actual

1. Integridad del catálogo local.
2. Completitud de perfiles y obras.
3. URLs válidas de fuentes bibliográficas.
4. Normalización de autores y obras externas.
5. Rechazo de registros externos incompletos.
6. Búsqueda local sin distinguir mayúsculas ni tildes.
7. Filtrado de obras por autor, género y rango cronológico.
8. Validación de filtros válidos e inválidos.
9. Rechazo de idiomas y categorías fuera del contrato.

## Pruebas manuales

### Navegación

- Cambiar entre autores y obras.
- Usar navegación con teclado en las pestañas.
- Limpiar filtros.

### APIs

- Buscar con Open Library desactivado y activado.
- Comprobar el comportamiento sin conexión.
- Comprobar el resumen de Wikipedia.
- Verificar respuestas HTTP con error, desconexión y mensajes mostrados al usuario.

### Biblioteca

- Guardar una obra.
- Intentar guardar la misma obra otra vez.
- Eliminar un favorito.
- Crear una nota.
- Editar una nota.
- Eliminar una nota.
- Reiniciar json-server y comprobar que los datos persisten.

## Criterio de aceptación

Las pruebas pasan si no existen fallos, la compilación de Vite termina correctamente y las operaciones REST locales devuelven resultados coherentes.
