# Archivo Histórico y Literario de la Generación del 27

Aplicación web académica para consultar autores, obras y fuentes bibliográficas de la Generación del 27. Permite buscar en un catálogo local, ampliar resultados con APIs públicas y guardar obras y notas personales mediante una API local.

## Funcionalidades

- Catálogo local de 14 autores y más de 70 obras.
- Búsqueda de autores y obras por autor, tema y rango cronológico.
- Integración opcional con Open Library.
- Resúmenes biográficos obtenidos de Wikipedia.
- Biblioteca personal con favoritos y notas.
- Operaciones CRUD sobre favoritos y notas mediante `json-server`.
- Interfaz adaptable y accesible.

## Requisitos

- Node.js 18 o posterior.
- npm.

## Instalación

```powershell
npm install
```

## Ejecución

Terminal 1: API local

```powershell
npm run api
```

Terminal 2: aplicación web

```powershell
npm run dev
```

Abrir `http://127.0.0.1:5173`.

## Scripts

- `npm run dev`: inicia Vite.
- `npm start`: inicia Vite con el mismo servidor de desarrollo.
- `npm run build`: genera la compilación en `dist/`.
- `npm run api`: inicia JSON Server en `http://localhost:3000`.
- `npm test`: ejecuta las pruebas con Node Test Runner.

## Estructura

```text
src/
  css/       Estilos generales y componentes visuales
  data/      Catálogo local de autores y bibliografía
  js/
    api/     Clientes de Open Library, Wikipedia y json-server
    utils/   Validaciones reutilizables
    app.js   Estado, controladores, renderizado e inicialización
tests/       Pruebas automáticas
docs/        Documentación técnica y de usuario
db.json      Persistencia local de favoritos y notas
index.html   Entrada de la aplicación
```

## APIs

- Open Library: `https://openlibrary.org`
- Wikipedia REST API: `https://es.wikipedia.org`
- API privada: `http://localhost:3000`

## Documentación

- [Arquitectura](docs/arquitectura.md)
- [Contratos](docs/contratos.md)
- [Manual de usuario](docs/manual-usuario.md)
- [Plan de pruebas](docs/plan-pruebas.md)
