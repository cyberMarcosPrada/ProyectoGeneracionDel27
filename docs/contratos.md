# Contratos de datos

## Autor local

```text
{
  id: string,
  nombre: string,
  nacimiento: number,
  fallecimiento: number,
  lugar: string,
  perfil: string,
  etiquetas: string[],
  obras: ObraLocal[],
  fuentes: string[]
}
```

## Obra local

```text
{
  titulo: string,
  año: number,
  genero: string,
  descripcion: string
}
```

## Favorito

```text
{
  id: number,
  obraId: string,
  titulo: string,
  autor: string,
  categoria: string,
  año: number | string,
  descripcion: string,
  fechaAgregado: string
}
```

## Nota

```text
{
  id: number,
  obraId: number,
  tituloObra: string,
  textoNota: string,
  fecha: string
}
```

## Endpoints

- `GET /favoritos`
- `POST /favoritos`
- `DELETE /favoritos/:id`
- `GET /notas`
- `POST /notas`
- `PATCH /notas/:id`
- `DELETE /notas/:id`

## Respuestas y errores

Las llamadas usan `fetch` con comprobación de `response.ok`. Los errores HTTP indican el código y la URL solicitada. Los fallos de red tienen el prefijo `Error de red`. Las respuestas que no contienen JSON válido generan un error descriptivo.

Las operaciones locales deben mostrar feedback mediante `feedback`, sin guardar datos parciales si falta el recurso relacionado.
