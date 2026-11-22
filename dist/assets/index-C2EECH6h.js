(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const AUTORES_27 = [
  {
    id: "federico-garcia-lorca",
    nombre: "Federico García Lorca",
    nacimiento: 1898,
    fallecimiento: 1936,
    lugar: "Fuente Vaqueros, Granada",
    perfil: "Poeta y dramaturgo. Su obra enlaza la tradición popular, la experimentación de vanguardia y una intensa imaginería simbólica. La música, el deseo, la muerte y la injusticia atraviesan sus versos y su teatro.",
    etiquetas: ["poesía", "teatro", "romancero", "surrealismo"],
    obras: [
      { titulo: "Libro de poemas", año: 1921, genero: "Poesía", descripcion: "Primer libro publicado, de tono modernista y ecos de la infancia y la naturaleza." },
      { titulo: "Poema del cante jondo", año: 1931, genero: "Poesía", descripcion: "Recreación poética de los ritmos, símbolos y atmósferas del cante andaluz." },
      { titulo: "Romancero gitano", año: 1928, genero: "Poesía", descripcion: "Romances de gran musicalidad que convierten Andalucía en un territorio mítico." },
      { titulo: "Poeta en Nueva York", año: 1940, genero: "Poesía", descripcion: "Ciclo escrito tras su viaje a Nueva York; denuncia la deshumanización y la injusticia social." },
      { titulo: "Bodas de sangre", año: 1933, genero: "Teatro", descripcion: "Tragedia rural sobre el deseo, el destino y las normas sociales." },
      { titulo: "Yerma", año: 1934, genero: "Teatro", descripcion: "Drama de una mujer enfrentada a la frustración y a las convenciones de su entorno." },
      { titulo: "La casa de Bernarda Alba", año: 1936, genero: "Teatro", descripcion: "Drama sobre el poder, el encierro y la libertad de las mujeres." }
    ],
    fuentes: ["BNE", "Fundación Federico García Lorca", "Biblioteca Virtual Miguel de Cervantes"]
  },
  {
    id: "rafael-alberti",
    nombre: "Rafael Alberti",
    nacimiento: 1902,
    fallecimiento: 1999,
    lugar: "El Puerto de Santa María, Cádiz",
    perfil: "Poeta, dramaturgo y pintor. Su trayectoria pasa por la canción popular y la tradición clásica, la vanguardia, la poesía política y el largo exilio.",
    etiquetas: ["poesía", "teatro", "vanguardia", "exilio"],
    obras: [
      { titulo: "Marinero en tierra", año: 1925, genero: "Poesía", descripcion: "Premio Nacional de Literatura; evoca el mar y la infancia con formas populares." },
      { titulo: "La amante", año: 1926, genero: "Poesía", descripcion: "Canciones nacidas de un viaje por Castilla, con ritmo ligero y mirada viajera." },
      { titulo: "Cal y canto", año: 1929, genero: "Poesía", descripcion: "Libro de experimentación formal y referencias a la cultura moderna." },
      { titulo: "Sobre los ángeles", año: 1929, genero: "Poesía", descripcion: "Ciclo de tono visionario que expresa una profunda crisis personal." },
      { titulo: "El hombre deshabitado", año: 1931, genero: "Teatro", descripcion: "Auto sacramental de vanguardia sobre la identidad y la conciencia." },
      { titulo: "Entre el clavel y la espada", año: 1941, genero: "Poesía", descripcion: "Poesía del exilio que reúne memoria, compromiso y distancia." }
    ],
    fuentes: ["BNE", "Fundación Rafael Alberti", "Biblioteca Virtual Miguel de Cervantes"]
  },
  {
    id: "luis-cernuda",
    nombre: "Luis Cernuda",
    nacimiento: 1902,
    fallecimiento: 1963,
    lugar: "Sevilla",
    perfil: "Poeta y crítico. Reunió su obra poética bajo el título La realidad y el deseo; en ella explora el conflicto entre la aspiración íntima y los límites impuestos por el mundo.",
    etiquetas: ["poesía", "crítica", "exilio", "generación del 27"],
    obras: [
      { titulo: "Perfil del aire", año: 1927, genero: "Poesía", descripcion: "Primer libro, de sensibilidad contemplativa y depuración formal." },
      { titulo: "Los placeres prohibidos", año: 1931, genero: "Poesía", descripcion: "Poemas de afirmación del deseo y ruptura con las convenciones." },
      { titulo: "Donde habite el olvido", año: 1934, genero: "Poesía", descripcion: "Libro marcado por el desengaño amoroso y la búsqueda de olvido." },
      { titulo: "La realidad y el deseo", año: 1936, genero: "Poesía", descripcion: "Título que agrupa y da unidad a sus libros poéticos; recibió ampliaciones posteriores." },
      { titulo: "Las nubes", año: 1943, genero: "Poesía", descripcion: "Poesía escrita durante la guerra y el exilio, con reflexión histórica y elegíaca." },
      { titulo: "Ocnos", año: 1942, genero: "Prosa poética", descripcion: "Evocaciones en prosa de la infancia, Sevilla, la música y la memoria." }
    ],
    fuentes: ["BNE", "Biblioteca Virtual Miguel de Cervantes", "Residencia de Estudiantes"]
  },
  {
    id: "pedro-salinas",
    nombre: "Pedro Salinas",
    nacimiento: 1891,
    fallecimiento: 1951,
    lugar: "Madrid",
    perfil: "Poeta, profesor y ensayista. Su poesía amorosa, de lenguaje claro y gran precisión intelectual, dialoga con la modernidad sin abandonar la búsqueda de lo esencial.",
    etiquetas: ["poesía", "ensayo", "amor", "exilio"],
    obras: [
      { titulo: "Presagios", año: 1923, genero: "Poesía", descripcion: "Primer libro, atento a los objetos cotidianos y a su significado oculto." },
      { titulo: "Seguro azar", año: 1929, genero: "Poesía", descripcion: "Reúne la mirada moderna sobre la ciudad y la experiencia diaria." },
      { titulo: "La voz a ti debida", año: 1933, genero: "Poesía", descripcion: "Primer libro de la llamada trilogía amorosa, centrado en el descubrimiento del tú." },
      { titulo: "Razón de amor", año: 1936, genero: "Poesía", descripcion: "Continúa el diálogo amoroso desde la plenitud y la despedida." },
      { titulo: "Largo lamento", año: 1975, genero: "Poesía", descripcion: "Cierre elegíaco de la trilogía, escrito en 1936–1939 y publicado póstumamente en 1975." },
      { titulo: "El defensor", año: 1948, genero: "Ensayo", descripcion: "Reflexiones sobre la lectura, el lenguaje y la cultura." }
    ],
    fuentes: ["BNE", "Biblioteca Virtual Miguel de Cervantes", "Residencia de Estudiantes"]
  },
  {
    id: "jorge-guillen",
    nombre: "Jorge Guillén",
    nacimiento: 1893,
    fallecimiento: 1984,
    lugar: "Valladolid",
    perfil: "Poeta y profesor. Su poesía, rigurosa y concentrada, celebra la realidad y la plenitud; más tarde incorpora la historia, la memoria y la experiencia del exilio.",
    etiquetas: ["poesía", "exilio", "poesía pura"],
    obras: [
      { titulo: "Cántico", año: 1928, genero: "Poesía", descripcion: "Libro central de una poesía afirmativa, depurada y celebratoria, ampliado en sucesivas ediciones." },
      { titulo: "Clamor", año: 1957, genero: "Poesía", descripcion: "Ciclo que introduce el dolor, la historia y las amenazas del mundo contemporáneo." },
      { titulo: "Homenaje", año: 1967, genero: "Poesía", descripcion: "Diálogo poético con autores, artistas y figuras admiradas." },
      { titulo: "Y otros poemas", año: 1973, genero: "Poesía", descripcion: "Nueva etapa de escritura que prolonga su reflexión sobre el tiempo y la vida." },
      { titulo: "Final", año: 1981, genero: "Poesía", descripcion: "Último gran conjunto poético, atento a la experiencia y al paso del tiempo." }
    ],
    fuentes: ["BNE", "Biblioteca Virtual Miguel de Cervantes", "Fundación Jorge Guillén"]
  },
  {
    id: "vicente-aleixandre",
    nombre: "Vicente Aleixandre",
    nacimiento: 1898,
    fallecimiento: 1984,
    lugar: "Sevilla",
    perfil: "Poeta de intensa exploración de la materia, el amor y la solidaridad. Recibió el Premio Nobel de Literatura en 1977 y fue una figura de referencia para varias generaciones.",
    etiquetas: ["poesía", "surrealismo", "premio nobel"],
    obras: [
      { titulo: "Ámbito", año: 1928, genero: "Poesía", descripcion: "Primer libro, de expresión contenida y musicalidad clásica." },
      { titulo: "Espadas como labios", año: 1932, genero: "Poesía", descripcion: "Poesía visionaria que incorpora procedimientos surrealistas." },
      { titulo: "La destrucción o el amor", año: 1935, genero: "Poesía", descripcion: "Premio Nacional de Literatura; aborda el amor como fuerza cósmica." },
      { titulo: "Sombra del paraíso", año: 1944, genero: "Poesía", descripcion: "Evocación de un mundo originario perdido, escrita en la posguerra." },
      { titulo: "Historia del corazón", año: 1954, genero: "Poesía", descripcion: "Desplaza el centro hacia la vida humana y la solidaridad." },
      { titulo: "Poemas de la consumación", año: 1968, genero: "Poesía", descripcion: "Meditación sobre la vejez, la conciencia y la plenitud." }
    ],
    fuentes: ["BNE", "Fundación Nobel", "Biblioteca Virtual Miguel de Cervantes"]
  },
  {
    id: "damaso-alonso",
    nombre: "Dámaso Alonso",
    nacimiento: 1898,
    fallecimiento: 1990,
    lugar: "Madrid",
    perfil: "Poeta, filólogo y crítico. Su trabajo académico renovó los estudios sobre poesía española; Hijos de la ira convirtió la angustia de posguerra en una voz poética decisiva.",
    etiquetas: ["poesía", "filología", "crítica"],
    obras: [
      { titulo: "Poemas puros. Poemillas de la ciudad", año: 1921, genero: "Poesía", descripcion: "Poesía temprana que combina sencillez expresiva y observación urbana." },
      { titulo: "Hijos de la ira", año: 1944, genero: "Poesía", descripcion: "Libro de poesía desarraigada que interroga a Dios y a una realidad violenta." },
      { titulo: "Oscura noticia", año: 1944, genero: "Poesía", descripcion: "Conjunto que explora la incertidumbre, la fe y la experiencia humana." },
      { titulo: "Hombre y Dios", año: 1955, genero: "Poesía", descripcion: "Diálogo lírico sobre la existencia y la relación con lo trascendente." },
      { titulo: "La lengua poética de Góngora", año: 1935, genero: "Crítica", descripcion: "Estudio filológico fundamental para comprender la poesía gongorina." }
    ],
    fuentes: ["BNE", "Real Academia Española", "Biblioteca Virtual Miguel de Cervantes"]
  },
  {
    id: "gerardo-diego",
    nombre: "Gerardo Diego",
    nacimiento: 1896,
    fallecimiento: 1987,
    lugar: "Santander",
    perfil: "Poeta, antólogo y profesor. Alternó poesía de raíz tradicional con propuestas creacionistas y desempeñó un papel esencial en la difusión del grupo.",
    etiquetas: ["poesía", "creacionismo", "antología"],
    obras: [
      { titulo: "Imagen", año: 1922, genero: "Poesía", descripcion: "Conjunto de poesía de vanguardia vinculado al creacionismo." },
      { titulo: "Manual de espumas", año: 1924, genero: "Poesía", descripcion: "Experimentación visual y metafórica de gran libertad formal." },
      { titulo: "Versos humanos", año: 1925, genero: "Poesía", descripcion: "Línea de poesía tradicional, musical y cercana a las formas clásicas." },
      { titulo: "Fábula de Equis y Zeda", año: 1932, genero: "Poesía", descripcion: "Reescritura vanguardista de la tradición mitológica y culta." },
      { titulo: "Primera antología de sus versos", año: 1941, genero: "Antología", descripcion: "Selección personal que muestra la convivencia de sus distintas poéticas." }
    ],
    fuentes: ["BNE", "Fundación Gerardo Diego", "Biblioteca Virtual Miguel de Cervantes"]
  },
  {
    id: "manuel-altolaguirre",
    nombre: "Manuel Altolaguirre",
    nacimiento: 1905,
    fallecimiento: 1959,
    lugar: "Málaga",
    perfil: "Poeta, impresor y editor. Junto con Emilio Prados impulsó la revista y la imprenta Litoral, decisivas para la difusión de la poesía del grupo.",
    etiquetas: ["poesía", "edición", "exilio"],
    obras: [
      { titulo: "Las islas invitadas", año: 1926, genero: "Poesía", descripcion: "Libro de tono íntimo y musical, revisado en diferentes ediciones." },
      { titulo: "Ejemplo", año: 1927, genero: "Poesía", descripcion: "Poesía de expresión depurada, cercana a la canción y la imagen." },
      { titulo: "La lenta libertad", año: 1936, genero: "Poesía", descripcion: "Poemas escritos en una etapa de compromiso y cambio histórico." },
      { titulo: "Nube temporal", año: 1939, genero: "Poesía", descripcion: "Escritura marcada por la guerra y el desplazamiento." },
      { titulo: "Fin de un amor", año: 1949, genero: "Poesía", descripcion: "Libro de madurez sobre la pérdida y la memoria amorosa." }
    ],
    fuentes: ["BNE", "Biblioteca Virtual Miguel de Cervantes", "Centro Cultural Generación del 27"]
  },
  {
    id: "emilio-prados",
    nombre: "Emilio Prados",
    nacimiento: 1899,
    fallecimiento: 1962,
    lugar: "Málaga",
    perfil: "Poeta y editor. Su obra evoluciona desde la canción y la contemplación de la naturaleza hacia la poesía comprometida, la reflexión interior y el exilio mexicano.",
    etiquetas: ["poesía", "edición", "exilio"],
    obras: [
      { titulo: "Tiempo", año: 1925, genero: "Poesía", descripcion: "Libro temprano de sensibilidad musical y contemplativa." },
      { titulo: "Vuelta", año: 1927, genero: "Poesía", descripcion: "Poesía que explora el regreso a la memoria y a la experiencia interior." },
      { titulo: "La voz cautiva", año: 1939, genero: "Poesía", descripcion: "Escritura de guerra y prisión, de tono testimonial y solidario." },
      { titulo: "Jardín cerrado", año: 1940, genero: "Poesía", descripcion: "Ciclo del exilio que convierte el jardín en espacio de memoria y búsqueda." },
      { titulo: "Río natural", año: 1957, genero: "Poesía", descripcion: "Obra de madurez que reúne reflexión, naturaleza y experiencia del exilio." }
    ],
    fuentes: ["BNE", "Biblioteca Virtual Miguel de Cervantes", "Centro Cultural Generación del 27"]
  },
  {
    id: "ernestina-de-champourcin",
    nombre: "Ernestina de Champourcín",
    nacimiento: 1905,
    fallecimiento: 1999,
    lugar: "Vitoria-Gasteiz",
    perfil: "Poeta vinculada a la generación y al Lyceum Club Femenino. Su obra recorre la poesía amorosa, la experiencia del exilio y una intensa búsqueda espiritual.",
    etiquetas: ["poesía", "mujeres", "exilio"],
    obras: [
      { titulo: "En silencio", año: 1926, genero: "Poesía", descripcion: "Primer libro, de voz intimista y atención a la experiencia amorosa." },
      { titulo: "Ahora", año: 1928, genero: "Poesía", descripcion: "Poesía de juventud que afianza una voz propia y moderna." },
      { titulo: "La voz en el viento", año: 1931, genero: "Poesía", descripcion: "Libro de madurez anterior al exilio, de expresión sobria y musical." },
      { titulo: "Cárcel de los sentidos", año: 1964, genero: "Poesía", descripcion: "Obra del exilio mexicano que enlaza memoria, deseo y búsqueda espiritual." },
      { titulo: "Huyeron todas las islas", año: 1988, genero: "Poesía", descripcion: "Libro tardío que vuelve sobre el tiempo, la pérdida y la fe." }
    ],
    fuentes: ["BNE", "Biblioteca Virtual Miguel de Cervantes", "Residencia de Estudiantes"]
  },
  {
    id: "concha-mendez",
    nombre: "Concha Méndez",
    nacimiento: 1898,
    fallecimiento: 1986,
    lugar: "Madrid",
    perfil: "Poeta, dramaturga y editora. Participó activamente en la vida cultural de su tiempo; el exilio y la memoria ocupan un lugar central en su obra.",
    etiquetas: ["poesía", "teatro", "mujeres", "exilio"],
    obras: [
      { titulo: "Inquietudes", año: 1926, genero: "Poesía", descripcion: "Primer poemario, de voz moderna y deseo de autonomía." },
      { titulo: "Surtidor", año: 1928, genero: "Poesía", descripcion: "Poesía de vanguardia que incorpora imágenes de velocidad y modernidad." },
      { titulo: "Canciones de mar y tierra", año: 1930, genero: "Poesía", descripcion: "Libro de viajes, canciones y paisajes marinos." },
      { titulo: "El personaje presentido", año: 1931, genero: "Teatro", descripcion: "Obra teatral que forma parte de su producción dramática." },
      { titulo: "Entre el soñar y el vivir", año: 1981, genero: "Poesía", descripcion: "Escritura tardía que recupera experiencias y recuerdos del exilio." }
    ],
    fuentes: ["BNE", "Biblioteca Virtual Miguel de Cervantes", "Residencia de Estudiantes"]
  },
  {
    id: "josefina-de-la-torre",
    nombre: "Josefina de la Torre",
    nacimiento: 1907,
    fallecimiento: 2002,
    lugar: "Las Palmas de Gran Canaria",
    perfil: "Poeta, cantante y actriz. Su escritura se asocia a la poesía pura y a la modernidad insular; desarrolló también una extensa trayectoria en teatro y cine.",
    etiquetas: ["poesía", "teatro", "mujeres", "cine"],
    obras: [
      { titulo: "Versos y estampas", año: 1927, genero: "Poesía", descripcion: "Libro de poemas y prosas breves sobre la infancia y el paisaje insular." },
      { titulo: "Poemas de la isla", año: 1930, genero: "Poesía", descripcion: "Poesía de evocación atlántica y lenguaje depurado." },
      { titulo: "Marzo incompleto", año: 1968, genero: "Poesía", descripcion: "Libro de madurez sobre el tiempo, la ausencia y la experiencia vital." },
      { titulo: "Medida del tiempo", año: 1989, genero: "Poesía", descripcion: "Obra tardía que reúne una mirada retrospectiva sobre la vida." }
    ],
    fuentes: ["BNE", "Biblioteca Virtual Miguel de Cervantes", "Casa-Museo Tomás Morales"]
  },
  {
    id: "maruja-mallo",
    nombre: "Maruja Mallo",
    nacimiento: 1902,
    fallecimiento: 1995,
    lugar: "Viveiro, Lugo",
    perfil: "Pintora fundamental de la vanguardia española. Cercana a los círculos de la Generación del 27, participó en la renovación artística y cultural de la época y vivió largos años de exilio.",
    etiquetas: ["pintura", "vanguardia", "mujeres", "exilio"],
    obras: [
      { titulo: "La verbena", año: 1927, genero: "Pintura", descripcion: "Escena urbana y festiva que combina cultura popular, humor y elementos modernos." },
      { titulo: "Cloacas y campanarios", año: 1932, genero: "Pintura", descripcion: "Ciclo de imágenes inquietantes ligado a la estética surrealista." },
      { titulo: "Arquitecturas minerales y vegetales", año: 1937, genero: "Pintura", descripcion: "Investigación de formas naturales y estructuras geométricas." },
      { titulo: "Máscaras", año: 1942, genero: "Pintura", descripcion: "Serie de retratos y figuras que explora identidad, gesto y diversidad." }
    ],
    fuentes: ["Museo Reina Sofía", "BNE", "Museo de Belas Artes da Coruña"]
  }
];
const FUENTES_BIBLIOGRAFICAS = [
  {
    nombre: "Biblioteca Nacional de España (BNE)",
    tipo: "Catálogo bibliográfico",
    url: "https://catalogo.bne.es/",
    descripcion: "Catálogo para localizar ediciones, registros de autoridad y materiales conservados."
  },
  {
    nombre: "Biblioteca Virtual Miguel de Cervantes",
    tipo: "Biblioteca digital",
    url: "https://www.cervantesvirtual.com/",
    descripcion: "Portal de autores, textos, estudios y documentación sobre literatura en español."
  },
  {
    nombre: "Residencia de Estudiantes",
    tipo: "Archivo y contexto histórico",
    url: "https://www.residencia.csic.es/",
    descripcion: "Recursos sobre la Edad de Plata, sus redes culturales y protagonistas."
  },
  {
    nombre: "Centro Cultural Generación del 27",
    tipo: "Archivo y estudios",
    url: "https://www.malaga.es/centroculturalgeneraciondel27/",
    descripcion: "Institución dedicada a la difusión y el estudio de los autores del grupo."
  },
  {
    nombre: "Fundación Federico García Lorca",
    tipo: "Archivo de autor",
    url: "https://www.garcialorca.org/",
    descripcion: "Información y recursos documentales sobre la vida y la obra de Federico García Lorca."
  },
  {
    nombre: "Museo Nacional Centro de Arte Reina Sofía",
    tipo: "Colección artística",
    url: "https://www.museoreinasofia.es/",
    descripcion: "Colección, exposiciones y documentación sobre las vanguardias artísticas españolas."
  },
  {
    nombre: "Fundación Nobel: Vicente Aleixandre",
    tipo: "Biografía y premio",
    url: "https://www.nobelprize.org/prizes/literature/1977/aleixandre/biographical/",
    descripcion: "Biografía y documentación oficial del Premio Nobel de Literatura de 1977."
  }
];
async function solicitarJSON(url, options = {}) {
  let response;
  try {
    response = await fetch(url, options);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (url.indexOf("http://localhost:3000/") === 0) {
      throw new Error(
        `No se pudo conectar con la biblioteca local. Ejecuta "npm run api" en otra terminal. (${message})`
      );
    }
    throw new Error(`Error de red al solicitar ${url}: ${message}`);
  }
  if (!response.ok) {
    throw new Error(
      `Error HTTP ${response.status} al solicitar ${url}${response.statusText ? `: ${response.statusText}` : ""}`
    );
  }
  if (response.status === 204) {
    return null;
  }
  try {
    return await response.json();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`La respuesta de ${url} no contiene JSON válido: ${message}`);
  }
}
const OPEN_LIBRARY_URL = "https://openlibrary.org";
const LIMIT = 30;
function requireDocs(payload, endpoint) {
  if (!payload || !Array.isArray(payload.docs)) {
    throw new TypeError(`La respuesta de Open Library no contiene resultados válidos (${endpoint}).`);
  }
  return payload.docs;
}
async function buscarAutores(nombre) {
  const query = new URLSearchParams({ q: nombre, limit: String(LIMIT) });
  const endpoint = `${OPEN_LIBRARY_URL}/search/authors.json?${query}`;
  try {
    return requireDocs(await solicitarJSON(endpoint), endpoint);
  } catch (error) {
    throw new Error(`No se pudo buscar autores en Open Library: ${error.message}`);
  }
}
async function buscarObras(filtros) {
  const parts = [];
  if (filtros.autor) parts.push(`author:"${filtros.autor.replace(/["\\]/g, " ")}"`);
  if (filtros.genero) parts.push(`subject:"${filtros.genero.replace(/["\\]/g, " ")}"`);
  if (filtros.desde !== null && filtros.hasta !== null) {
    parts.push(`first_publish_year:[${filtros.desde} TO ${filtros.hasta}]`);
  } else if (filtros.desde !== null) {
    parts.push(`first_publish_year:[${filtros.desde} TO *]`);
  } else if (filtros.hasta !== null) {
    parts.push(`first_publish_year:[* TO ${filtros.hasta}]`);
  }
  const query = new URLSearchParams({
    q: parts.join(" AND "),
    language: filtros.idioma === "es" ? "spa" : filtros.idioma,
    limit: String(LIMIT)
  });
  const endpoint = `${OPEN_LIBRARY_URL}/search.json?${query}`;
  try {
    return requireDocs(await solicitarJSON(endpoint), endpoint);
  } catch (error) {
    throw new Error(`No se pudieron buscar obras en Open Library: ${error.message}`);
  }
}
async function obtenerObrasAutor(claveAutor) {
  if (typeof claveAutor !== "string" || claveAutor.trim() === "") {
    throw new TypeError("La clave del autor no tiene un formato válido.");
  }
  const claveCompleta = claveAutor.startsWith("/authors/") ? claveAutor : `/authors/${claveAutor}`;
  if (!/^\/authors\/[^/]+$/.test(claveCompleta)) {
    throw new TypeError("La clave del autor no tiene un formato válido.");
  }
  const claveCodificada = claveCompleta.split("/").map(encodeURIComponent).join("/");
  const query = new URLSearchParams({ limit: String(LIMIT) });
  const endpoint = `${OPEN_LIBRARY_URL}${claveCodificada}/works.json?${query}`;
  try {
    const payload = await solicitarJSON(endpoint);
    if (!payload || !Array.isArray(payload.entries)) {
      throw new TypeError("La respuesta no contiene una lista de obras válida.");
    }
    return payload.entries;
  } catch (error) {
    throw new Error(`No se pudieron cargar las obras del autor: ${error.message}`);
  }
}
const WIKIPEDIA_URL = "https://es.wikipedia.org/api/rest_v1/page/summary/";
async function obtenerResumenAutor(titulo) {
  if (typeof titulo !== "string" || titulo.trim().length === 0) {
    throw new TypeError("El título del autor es obligatorio.");
  }
  const url = `${WIKIPEDIA_URL}${encodeURIComponent(titulo.trim().replace(/ /g, "_"))}`;
  try {
    const resumen = await solicitarJSON(url);
    if (!resumen || typeof resumen.extract !== "string" || resumen.extract.length === 0) {
      throw new TypeError("La respuesta de Wikipedia no contiene un resumen utilizable.");
    }
    return resumen;
  } catch (error) {
    throw new Error(`No se pudo obtener el resumen biográfico de Wikipedia: ${error.message}`);
  }
}
const PRIVATE_API_URL = "http://localhost:3000";
function getFavoritos() {
  return solicitarJSON(`${PRIVATE_API_URL}/favoritos`);
}
function agregarFavorito(obra) {
  return solicitarJSON(`${PRIVATE_API_URL}/favoritos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obra)
  });
}
function eliminarFavorito(id) {
  return solicitarJSON(`${PRIVATE_API_URL}/favoritos/${encodeURIComponent(id)}`, {
    method: "DELETE"
  });
}
function getNotas() {
  return solicitarJSON(`${PRIVATE_API_URL}/notas`);
}
function guardarNota(nota) {
  return solicitarJSON(`${PRIVATE_API_URL}/notas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nota)
  });
}
function actualizarNota(id, cambios) {
  return solicitarJSON(`${PRIVATE_API_URL}/notas/${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cambios)
  });
}
function eliminarNota(id) {
  return solicitarJSON(`${PRIVATE_API_URL}/notas/${encodeURIComponent(id)}`, {
    method: "DELETE"
  });
}
function normalizarAutorOpenLibrary(autor) {
  if (autor === null || typeof autor !== "object" || typeof autor.name !== "string" || autor.name.trim().length === 0) {
    return null;
  }
  return {
    key: typeof autor.key === "string" ? autor.key : "",
    name: autor.name.trim(),
    top_work: typeof autor.top_work === "string" ? autor.top_work : "",
    work_count: Number.isInteger(autor.work_count) ? autor.work_count : null,
    fuenteExterna: "Open Library"
  };
}
function normalizarObraOpenLibrary(obra) {
  if (obra === null || typeof obra !== "object" || typeof obra.title !== "string" || obra.title.trim().length === 0) {
    return null;
  }
  let autores = [];
  if (Array.isArray(obra.author_name)) {
    autores = obra.author_name.filter(
      (nombre) => typeof nombre === "string" && nombre.trim().length > 0
    );
  } else if (Array.isArray(obra.authors)) {
    obra.authors.forEach((autor) => {
      if (autor && typeof autor.name === "string" && autor.name.trim().length > 0) {
        autores.push(autor.name);
      }
    });
  }
  const obraNormalizada = {
    ...obra,
    title: obra.title.trim(),
    author_name: autores,
    first_publish_year: Number.isInteger(obra.first_publish_year) ? obra.first_publish_year : null
  };
  return obraNormalizada;
}
const IDIOMAS_PERMITIDOS = ["es", "en", "fr"];
const ANIO_MINIMO = 1800;
function leerTexto(filtros, nombre) {
  if (!filtros || typeof filtros[nombre] !== "string") {
    return "";
  }
  return filtros[nombre].trim();
}
function validarFiltros$1(filtros, categoria) {
  const normalizados = {
    autor: leerTexto(filtros, "autor"),
    genero: leerTexto(filtros, "genero"),
    idioma: leerTexto(filtros, "idioma"),
    desdeTexto: leerTexto(filtros, "desde"),
    hastaTexto: leerTexto(filtros, "hasta")
  };
  const errores = [];
  const anioMaximo = (/* @__PURE__ */ new Date()).getFullYear();
  if (!["autores", "obras"].includes(categoria)) {
    errores.push("Selecciona una categoría válida.");
  }
  if (normalizados.autor.length > 100) {
    errores.push("El autor no puede superar los 100 caracteres.");
  }
  if (normalizados.genero.length > 80) {
    errores.push("El género no puede superar los 80 caracteres.");
  }
  if (!IDIOMAS_PERMITIDOS.includes(normalizados.idioma)) {
    errores.push("Selecciona un idioma válido.");
  }
  let desde = null;
  let hasta = null;
  if (normalizados.desdeTexto !== "") {
    desde = Number(normalizados.desdeTexto);
  }
  if (normalizados.hastaTexto !== "") {
    hasta = Number(normalizados.hastaTexto);
  }
  const anios = [
    { nombre: "inicial", valor: desde },
    { nombre: "final", valor: hasta }
  ];
  for (const anio of anios) {
    if (anio.valor !== null && (!Number.isInteger(anio.valor) || anio.valor < ANIO_MINIMO || anio.valor > anioMaximo)) {
      errores.push(
        `El año ${anio.nombre} debe estar entre ${ANIO_MINIMO} y ${anioMaximo}.`
      );
    }
  }
  if (desde !== null && hasta !== null && desde > hasta) {
    errores.push("El año inicial no puede ser posterior al año final.");
  }
  if (categoria === "autores" && normalizados.autor === "") {
    errores.push("Escribe un autor para buscar.");
  }
  if (categoria === "obras" && normalizados.autor === "" && normalizados.genero === "" && desde === null && hasta === null) {
    errores.push("Indica un autor, un género o al menos un año para buscar obras.");
  }
  return {
    valido: errores.length === 0,
    filtros: {
      autor: normalizados.autor,
      genero: normalizados.genero,
      idioma: normalizados.idioma,
      desde,
      hasta
    },
    errores
  };
}
const validarFiltros = validarFiltros$1;
const CATEGORIAS_VALIDAS = ["autores", "obras"];
const FILTROS_VALIDOS = ["autor", "genero", "idioma", "rangoCronologico"];
const SUSCRIPTORES = [];
const filtrosIniciales = {
  autor: "",
  genero: "",
  idioma: "es",
  rangoCronologico: { desde: "", hasta: "" }
};
const estado = {
  categoriaActiva: "autores",
  filtrosActivos: filtrosIniciales,
  resultados: [],
  favoritos: [],
  notas: [],
  autorSeleccionado: null
};
function obtenerEstado() {
  return estado;
}
function suscribirse(suscriptor) {
  if (typeof suscriptor !== "function") {
    throw new TypeError("El suscriptor debe ser una función.");
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
function actualizarCategoria(categoria) {
  if (!CATEGORIAS_VALIDAS.includes(categoria)) {
    throw new RangeError('La categoría debe ser "autores" u "obras".');
  }
  actualizarEstado({ categoriaActiva: categoria });
}
function actualizarFiltros(cambiosFiltros) {
  if (!cambiosFiltros || typeof cambiosFiltros !== "object" || Array.isArray(cambiosFiltros)) {
    throw new TypeError("Los filtros deben proporcionarse como un objeto.");
  }
  const clavesDesconocidas = Object.keys(cambiosFiltros).filter((clave) => !FILTROS_VALIDOS.includes(clave));
  if (clavesDesconocidas.length > 0) {
    throw new RangeError(`Filtro(s) no válido(s): ${clavesDesconocidas.join(", ")}.`);
  }
  const filtrosActualizados = {
    ...estado.filtrosActivos,
    ...cambiosFiltros
  };
  if (Object.prototype.hasOwnProperty.call(cambiosFiltros, "rangoCronologico")) {
    const rango = cambiosFiltros.rangoCronologico;
    if (!rango || typeof rango !== "object" || Array.isArray(rango)) {
      throw new TypeError("El rango cronológico debe ser un objeto.");
    }
    filtrosActualizados.rangoCronologico = {
      ...estado.filtrosActivos.rangoCronologico,
      ...rango
    };
  }
  actualizarEstado({ filtrosActivos: filtrosActualizados });
}
function actualizarResultados(resultados) {
  if (!Array.isArray(resultados)) {
    throw new TypeError("Los resultados deben proporcionarse como un array.");
  }
  actualizarEstado({ resultados });
}
function actualizarAutorSeleccionado(autor) {
  if (autor !== null && (typeof autor !== "object" || Array.isArray(autor))) {
    throw new TypeError("El autor seleccionado debe ser un objeto o null.");
  }
  actualizarEstado({ autorSeleccionado: autor });
}
function actualizarFavoritos(favoritos) {
  if (!Array.isArray(favoritos)) {
    throw new TypeError("Los favoritos deben proporcionarse como un array.");
  }
  actualizarEstado({ favoritos });
}
function actualizarNotas(notas) {
  if (!Array.isArray(notas)) {
    throw new TypeError("Las notas deben proporcionarse como un array.");
  }
  actualizarEstado({ notas });
}
function limpiarFiltros() {
  actualizarEstado({ filtrosActivos: filtrosIniciales });
}
function normalizar(texto) {
  if (texto === null || texto === void 0) {
    texto = "";
  }
  return String(texto).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es");
}
function buscarAutoresLocales(filtros) {
  const autor = normalizar(filtros.autor);
  const tema = normalizar(filtros.genero);
  return AUTORES_27.filter((registro) => {
    const textoAutor = normalizar(`${registro.nombre} ${registro.perfil}`);
    const textoTema = normalizar(`${registro.etiquetas.join(" ")} ${registro.obras.map((obra) => `${obra.titulo} ${obra.genero} ${obra.descripcion}`).join(" ")}`);
    const coincideAutor = !autor || textoAutor.includes(autor);
    const coincideTema = !tema || textoTema.includes(tema);
    return coincideAutor && coincideTema;
  });
}
async function buscarAutoresController(filtros, incluirCatalogos = false) {
  if (!filtros || !filtros.autor) {
    throw new TypeError("El nombre del autor es obligatorio para la búsqueda.");
  }
  const autoresLocales = buscarAutoresLocales(filtros);
  let autores = [...autoresLocales];
  let advertencia = "";
  if (incluirCatalogos) {
    try {
      const externos = await buscarAutores(filtros.autor);
      const nombresLocales = autoresLocales.map((autor) => normalizar(autor.nombre));
      const autoresExternos = externos.map(normalizarAutorOpenLibrary).filter((autor) => autor && !nombresLocales.includes(normalizar(autor.name)));
      autores = [...autores, ...autoresExternos];
    } catch (error) {
      advertencia = error instanceof Error ? error.message : String(error);
    }
  }
  actualizarCategoria("autores");
  actualizarAutorSeleccionado(null);
  actualizarResultados(autores);
  return { resultados: autores, advertencia };
}
async function cargarObrasDeAutor(autor) {
  if (!autor || !autor.key && !autor.id) {
    throw new TypeError("El autor seleccionado no tiene una clave válida.");
  }
  const registroLocal = AUTORES_27.find((registro) => registro.id === autor.id);
  let obras;
  if (registroLocal) {
    obras = registroLocal.obras.map((obra, indice) => ({
      ...obra,
      id: `${registroLocal.id}-${indice}`,
      autor: registroLocal.nombre,
      autorId: registroLocal.id
    }));
    actualizarAutorSeleccionado(registroLocal);
  } else {
    const nombreAutor = autor.nombre || autor.name;
    obras = (await obtenerObrasAutor(autor.key)).map((obra) => ({
      ...obra,
      autor: nombreAutor,
      fuenteExterna: "Open Library"
    }));
    actualizarAutorSeleccionado({
      nombre: nombreAutor,
      key: autor.key,
      perfil: "Registro recuperado de Open Library. Amplía la información en el catálogo bibliográfico.",
      obras: [],
      fuentes: ["Open Library"]
    });
  }
  actualizarCategoria("obras");
  actualizarResultados(obras);
  return obras;
}
async function enriquecerPerfilAutor(autor) {
  const registroLocal = autor ? AUTORES_27.find((registro) => registro.id === autor.id) : null;
  const perfilBase = registroLocal ? registroLocal.perfil : autor && autor.perfil ? autor.perfil : "";
  const nombre = registroLocal ? registroLocal.nombre : autor ? autor.nombre || autor.name : "";
  if (!nombre) {
    throw new TypeError("No se puede ampliar un perfil sin nombre.");
  }
  try {
    const resumen = await obtenerResumenAutor(nombre);
    const seleccionado = {
      ...registroLocal || autor,
      perfilWikipedia: resumen.extract,
      urlWikipedia: resumen.content_urls && resumen.content_urls.desktop && resumen.content_urls.desktop.page ? resumen.content_urls.desktop.page : ""
    };
    actualizarAutorSeleccionado(seleccionado);
    return { perfil: resumen.extract, advertencia: "" };
  } catch (error) {
    return {
      perfil: perfilBase,
      advertencia: error instanceof Error ? error.message : String(error)
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
        autorId: registro.id
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
async function buscarObrasController(filtros, incluirCatalogos = false) {
  let obras = buscarObrasLocales(filtros);
  let advertencia = "";
  if (incluirCatalogos) {
    try {
      const externas = await buscarObras(filtros);
      const clavesLocales = obras.map((obra) => normalizar(`${obra.titulo}|${obra.autor}`));
      const externasUnicas = externas.map(normalizarObraOpenLibrary).filter(Boolean).filter((obra) => !clavesLocales.includes(normalizar(
        `${obra.title}|${obra.author_name[0] || ""}`
      ))).map((obra) => ({ ...obra, fuenteExterna: "Open Library" }));
      obras = [...obras, ...externasUnicas];
    } catch (error) {
      advertencia = error instanceof Error ? error.message : String(error);
    }
  }
  actualizarCategoria("obras");
  actualizarResultados(obras);
  return { resultados: obras, advertencia };
}
function normalizarFavorito(favorito) {
  const registro = favorito || {};
  return {
    ...registro,
    titulo: registro.titulo || registro.title || "Obra sin título",
    autor: registro.autor || registro.author || "Autoría no indicada",
    categoria: registro.categoria || registro.genre || "Obra",
    obraId: registro.obraId || registro.workId || registro.key || ""
  };
}
async function cargarBibliotecaController() {
  const favoritosRecibidos = await getFavoritos();
  const notasRecibidas = await getNotas();
  if (!Array.isArray(favoritosRecibidos) || !Array.isArray(notasRecibidas)) {
    throw new TypeError("La API local devolvió una biblioteca con un formato inesperado.");
  }
  const favoritos = favoritosRecibidos.map(normalizarFavorito);
  actualizarFavoritos(favoritos);
  actualizarNotas(notasRecibidas);
  return { favoritos, notas: notasRecibidas };
}
async function agregarFavoritoController(obra) {
  if (!obra || !obra.titulo || !obra.autor) {
    throw new TypeError("La obra debe tener título y autoría para guardarse.");
  }
  const favoritosActuales = await getFavoritos();
  if (!Array.isArray(favoritosActuales)) {
    throw new TypeError("No se pudo validar la lista actual de favoritos.");
  }
  const yaGuardada = favoritosActuales.some((favorito) => {
    const idObra = favorito.obraId || favorito.workId || favorito.key || "";
    const titulo = favorito.titulo || favorito.title || "";
    return String(idObra) === String(obra.obraId) && String(titulo).toLocaleLowerCase("es") === obra.titulo.toLocaleLowerCase("es");
  });
  if (yaGuardada) {
    throw new Error("Esta obra ya está guardada en tu biblioteca.");
  }
  await agregarFavorito({
    ...obra,
    fechaAgregado: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
  });
  const { favoritos } = await cargarBibliotecaController();
  return favoritos.find((favorito) => favorito.titulo === obra.titulo && favorito.autor === obra.autor);
}
async function eliminarFavoritoController(id) {
  if (id === void 0 || id === null || id === "") {
    throw new TypeError("El favorito no tiene un identificador válido.");
  }
  await eliminarFavorito(id);
  await cargarBibliotecaController();
}
async function guardarNotaController(obraId, texto, notaId = null) {
  const contenido = typeof texto === "string" ? texto.trim() : "";
  if (!obraId || contenido.length === 0 || contenido.length > 1e3) {
    throw new TypeError("Selecciona una obra y escribe una nota de hasta 1000 caracteres.");
  }
  const favoritos = await getFavoritos();
  if (!Array.isArray(favoritos)) {
    throw new TypeError("No se pudo comprobar la obra seleccionada.");
  }
  const favorito = favoritos.find((item) => String(item.id) === String(obraId));
  if (!favorito) {
    throw new Error("La obra seleccionada ya no está en la biblioteca.");
  }
  if (notaId !== null && notaId !== void 0 && notaId !== "") {
    await actualizarNota(notaId, {
      obraId: favorito.id,
      tituloObra: favorito.titulo || favorito.title || "Obra sin título",
      textoNota: contenido,
      fecha: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
    });
  } else {
    await guardarNota({
      obraId: favorito.id,
      tituloObra: favorito.titulo || favorito.title || "Obra sin título",
      textoNota: contenido,
      fecha: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
    });
  }
  await cargarBibliotecaController();
}
async function eliminarNotaController(notaId) {
  if (notaId === void 0 || notaId === null || notaId === "") {
    throw new TypeError("La nota no tiene un identificador válido.");
  }
  await eliminarNota(notaId);
  await cargarBibliotecaController();
}
function obtenerElemento(selector, raiz = document) {
  const elemento = raiz.querySelector(selector);
  if (!elemento) {
    throw new Error(`No se encontró el elemento requerido: ${selector}`);
  }
  return elemento;
}
function crearElemento(etiqueta, { clase = "", texto = "" } = {}) {
  const elemento = document.createElement(etiqueta);
  if (clase) {
    elemento.className = clase;
  }
  if (texto) {
    elemento.textContent = texto;
  }
  return elemento;
}
function renderizarEstadoVacio(contenedor, mensaje) {
  const etiqueta = contenedor.tagName === "UL" ? "li" : "p";
  const estadoEl = crearElemento(etiqueta, { clase: "empty-state", texto: mensaje });
  contenedor.replaceChildren(estadoEl);
}
function mostrarFeedback(elemento, mensaje, tipo = "info") {
  elemento.textContent = mensaje;
  elemento.dataset.type = tipo;
  elemento.hidden = mensaje.length === 0;
  elemento.setAttribute("role", tipo === "error" ? "alert" : "status");
}
function establecerCarga(formulario, indicador, cargando) {
  formulario.setAttribute("aria-busy", String(cargando));
  formulario.querySelectorAll('button[type="submit"]').forEach((boton) => {
    boton.disabled = cargando;
  });
  indicador.hidden = !cargando;
}
function actualizarPestanaActiva(categoria, pestanas) {
  pestanas.forEach((pestana) => {
    const activa = pestana.dataset.category === categoria;
    pestana.setAttribute("aria-selected", String(activa));
    pestana.tabIndex = activa ? 0 : -1;
    pestana.classList.toggle("is-active", activa);
  });
  const pestanaActiva = pestanas.find((pestana) => pestana.dataset.category === categoria);
  const panel = document.querySelector('[role="tabpanel"]');
  if (pestanaActiva && panel) {
    panel.setAttribute("aria-labelledby", pestanaActiva.id);
  }
}
function crearTarjetaAutor(autor) {
  const tarjeta = crearElemento("article", { clase: "result-card" });
  const nombre = autor.nombre || autor.name || "Autoría sin identificar";
  const obrasLocales = Array.isArray(autor.obras) ? autor.obras : [];
  const titulo = crearElemento("h3", { texto: nombre });
  const periodo = Number.isInteger(autor.nacimiento) ? `${autor.nacimiento}–${autor.fallecimiento || "actualidad"}` : "Catálogo externo";
  const metadatos = crearElemento("p", { clase: "card-meta", texto: periodo });
  const descripcion = crearElemento("p", {
    texto: autor.perfil || (autor.top_work ? `Obra destacada: ${autor.top_work}` : `${autor.work_count || "Varias"} obras registradas en Open Library.`)
  });
  const etiquetas = crearElemento("p", {
    texto: Array.isArray(autor.etiquetas) ? autor.etiquetas.join(" · ") : ""
  });
  const acciones = crearElemento("div", { clase: "card-actions" });
  const boton = crearElemento("button", {
    clase: "button",
    texto: autor.id ? "Ver perfil y obras" : "Consultar obras"
  });
  boton.type = "button";
  boton.dataset.action = "author-detail";
  boton.dataset.authorName = nombre;
  boton.dataset.authorId = autor.id || "";
  boton.dataset.authorKey = autor.key || "";
  boton.disabled = !autor.id && !autor.key;
  acciones.append(boton);
  if (obrasLocales.length > 0) {
    const obras = crearElemento("p", {
      clase: "card-meta",
      texto: `${obrasLocales.length} referencias de obras`
    });
    tarjeta.append(titulo, metadatos, descripcion, etiquetas, obras, acciones);
  } else {
    tarjeta.append(titulo, metadatos, descripcion, acciones);
  }
  return tarjeta;
}
function renderizarAutores(contenedor, autores) {
  if (!Array.isArray(autores) || autores.length === 0) {
    renderizarEstadoVacio(contenedor, "No se encontraron autores con esos criterios. Prueba otro nombre o tema.");
    return;
  }
  const fragmento = document.createDocumentFragment();
  autores.forEach((autor) => fragmento.append(crearTarjetaAutor(autor || {})));
  contenedor.replaceChildren(fragmento);
}
function renderizarPerfilAutor(contenedor, autor) {
  if (!autor) {
    contenedor.replaceChildren();
    contenedor.hidden = true;
    return;
  }
  const perfil = crearElemento("div");
  perfil.append(
    crearElemento("p", { clase: "eyebrow", texto: "Ficha de autoría" }),
    crearElemento("h3", { texto: autor.nombre || autor.name || "Autoría sin identificar" }),
    crearElemento("p", {
      clase: "card-meta",
      texto: [autor.lugar, autor.nacimiento && `${autor.nacimiento}–${autor.fallecimiento || "actualidad"}`].filter(Boolean).join(" · ") || "Registro de catálogo externo"
    }),
    crearElemento("p", { texto: autor.perfil || "No hay una biografía local disponible." })
  );
  if (autor.perfilWikipedia) {
    perfil.append(crearElemento("p", {
      texto: `Resumen de Wikipedia: ${autor.perfilWikipedia}`
    }));
    if (autor.urlWikipedia) {
      const enlace = crearElemento("a", { texto: "Consultar artículo en Wikipedia" });
      enlace.href = autor.urlWikipedia;
      enlace.target = "_blank";
      enlace.rel = "noopener noreferrer";
      perfil.append(enlace);
    }
  }
  if (Array.isArray(autor.fuentes) && autor.fuentes.length > 0) {
    const lista = crearElemento("ul", { clase: "source-chips" });
    autor.fuentes.forEach((fuente) => lista.append(crearElemento("li", { texto: fuente })));
    perfil.append(
      crearElemento("h4", { texto: "Fuentes para ampliar" }),
      lista
    );
  }
  contenedor.replaceChildren(perfil);
  contenedor.hidden = false;
}
function crearTarjetaObra(obra) {
  const tarjeta = crearElemento("article", { clase: "result-card" });
  const titulo = obra.titulo || obra.title || obra.title_suggest || "Obra sin título";
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
  const autor = obra.autor || (autoresExternos.length > 0 ? autoresExternos.join(", ") : "Autoría no indicada");
  const año = obra.año || obra.first_publish_year;
  const genero = obra.genero || "Obra";
  const descripcion = obra.descripcion || "Consulta el catálogo bibliográfico para localizar ediciones y datos completos.";
  tarjeta.append(
    crearElemento("p", { clase: "card-meta", texto: `${genero}${año ? ` · ${año}` : ""}` }),
    crearElemento("h3", { texto: titulo }),
    crearElemento("p", { texto: `Autoría: ${autor}` }),
    crearElemento("p", { texto: descripcion })
  );
  const acciones = crearElemento("div", { clase: "card-actions" });
  const boton = crearElemento("button", { clase: "button", texto: "Guardar en mi biblioteca" });
  boton.type = "button";
  boton.dataset.action = "favorite-add";
  boton.dataset.workId = obra.id || obra.key || "";
  boton.dataset.title = titulo;
  boton.dataset.author = autor;
  boton.dataset.genre = genero;
  boton.dataset.year = año || "";
  boton.dataset.description = descripcion;
  acciones.append(boton);
  tarjeta.append(acciones);
  return tarjeta;
}
function renderizarObras(contenedor, obras) {
  if (!Array.isArray(obras) || obras.length === 0) {
    renderizarEstadoVacio(contenedor, "No se encontraron obras. Amplía el rango de años o cambia los filtros.");
    return;
  }
  const fragmento = document.createDocumentFragment();
  obras.forEach((obra) => fragmento.append(crearTarjetaObra(obra || {})));
  contenedor.replaceChildren(fragmento);
}
function textoHelper(elemento, clase, contenido) {
  return crearElemento(elemento, { clase, texto: contenido || "" });
}
function renderizarBiblioteca(favoritos, notas, contenedores) {
  const listaFavoritos = contenedores.favoritos;
  const listaNotas = contenedores.notas;
  const selectorObra = contenedores.selectorObra;
  const opciones = [crearElemento("option", { texto: "Selecciona una obra guardada" })];
  opciones[0].value = "";
  if (!Array.isArray(favoritos) || favoritos.length === 0) {
    renderizarEstadoVacio(listaFavoritos, "Tu biblioteca está vacía. Guarda una obra desde los resultados.");
  } else {
    const fragmento = document.createDocumentFragment();
    favoritos.forEach((favorito) => {
      const item = crearElemento("li", { clase: "library-item" });
      const contenido = crearElemento("div");
      contenido.append(
        textoHelper("h4", "", favorito.titulo || "Obra sin título"),
        textoHelper("p", "", `${favorito.autor || "Autoría no indicada"} · ${favorito.categoria || "Obra"}`)
      );
      const eliminar = crearElemento("button", { clase: "icon-button", texto: "Quitar" });
      eliminar.type = "button";
      eliminar.dataset.action = "favorite-delete";
      eliminar.dataset.id = favorito.id || "";
      eliminar.setAttribute("aria-label", `Quitar ${favorito.titulo || "obra"} de la biblioteca`);
      item.append(contenido, eliminar);
      fragmento.append(item);
      const opcion = crearElemento("option", {
        texto: `${favorito.titulo || "Obra sin título"} — ${favorito.autor || "Autoría desconocida"}`
      });
      opcion.value = String(favorito.id || "");
      opciones.push(opcion);
    });
    listaFavoritos.replaceChildren(fragmento);
  }
  selectorObra.replaceChildren(...opciones);
  if (!Array.isArray(notas) || notas.length === 0) {
    renderizarEstadoVacio(listaNotas, "Todavía no hay notas. Añade una reflexión o pregunta de lectura.");
  } else {
    const fragmento = document.createDocumentFragment();
    notas.forEach((nota) => {
      const item = crearElemento("li", { clase: "library-item" });
      const contenido = crearElemento("div");
      contenido.append(
        textoHelper("h4", "", nota.tituloObra || "Nota de lectura"),
        textoHelper("p", "", nota.textoNota || ""),
        textoHelper("p", "", nota.fecha || "")
      );
      const acciones = crearElemento("div", { clase: "card-actions" });
      const editar = crearElemento("button", { clase: "button-secondary", texto: "Editar" });
      editar.type = "button";
      editar.dataset.action = "note-edit";
      editar.dataset.id = nota.id || "";
      editar.dataset.workId = nota.obraId || "";
      editar.dataset.text = nota.textoNota || "";
      const eliminar = crearElemento("button", { clase: "icon-button", texto: "Eliminar" });
      eliminar.type = "button";
      eliminar.dataset.action = "note-delete";
      eliminar.dataset.id = nota.id || "";
      acciones.append(editar, eliminar);
      item.append(contenido, acciones);
      fragmento.append(item);
    });
    listaNotas.replaceChildren(fragmento);
  }
}
function renderizarBibliografia(contenedor, fuentes) {
  const fragmento = document.createDocumentFragment();
  fuentes.forEach((fuente) => {
    const tarjeta = crearElemento("article", { clase: "bibliography-card" });
    tarjeta.append(
      crearElemento("p", { clase: "card-meta", texto: fuente.tipo }),
      crearElemento("h3", { texto: fuente.nombre }),
      crearElemento("p", { texto: fuente.descripcion })
    );
    const enlace = crearElemento("a", { texto: "Visitar recurso" });
    enlace.href = fuente.url;
    enlace.target = "_blank";
    enlace.rel = "noopener noreferrer";
    tarjeta.append(enlace);
    fragmento.append(tarjeta);
  });
  contenedor.replaceChildren(fragmento);
}
function leerFiltrosFormulario(formulario) {
  if (!(formulario instanceof HTMLFormElement)) {
    throw new TypeError("Se esperaba un formulario de búsqueda válido.");
  }
  const datos = new FormData(formulario);
  return {
    filtros: {
      autor: datos.get("autor"),
      genero: datos.get("genero"),
      idioma: datos.get("idioma"),
      desde: datos.get("desde"),
      hasta: datos.get("hasta")
    },
    incluirCatalogos: datos.get("externos") === "on"
  };
}
async function inicializarAplicacion() {
  const ui = {
    formulario: obtenerElemento("#search-form"),
    resultados: obtenerElemento("#search-results"),
    estado: obtenerElemento("#feedback"),
    pestanas: [...document.querySelectorAll("[data-category]")],
    perfil: obtenerElemento("#author-profile"),
    tituloResultados: obtenerElemento("#results-title"),
    cuentaResultados: obtenerElemento("#results-count"),
    indicadorCarga: obtenerElemento("#loading-indicator"),
    catalogosExternos: obtenerElemento("#include-external"),
    limpiar: obtenerElemento("#clear-filters"),
    camposAnio: [
      obtenerElemento("#year-from"),
      obtenerElemento("#year-to")
    ],
    bibliografia: obtenerElemento("#bibliography-list"),
    bibliotecaEstado: obtenerElemento("#library-status"),
    favoritos: obtenerElemento("#favorites-list"),
    notas: obtenerElemento("#notes-list"),
    selectorObra: obtenerElemento("#note-work"),
    formularioNotas: obtenerElemento("#note-form")
  };
  const renderizarBibliotecaEstado = (est) => renderizarBiblioteca(
    est.favoritos,
    est.notas,
    {
      favoritos: ui.favoritos,
      notas: ui.notas,
      selectorObra: ui.selectorObra
    }
  );
  const renderizarEstadoCompleto = (est) => {
    actualizarPestanaActiva(est.categoriaActiva, ui.pestanas);
    ui.camposAnio.forEach((campo) => {
      campo.disabled = est.categoriaActiva === "autores";
    });
    ui.tituloResultados.textContent = est.categoriaActiva === "autores" ? "Autores y autoras" : est.autorSeleccionado ? `Obras de ${est.autorSeleccionado.nombre || est.autorSeleccionado.name}` : "Obras del archivo";
    if (est.categoriaActiva === "autores") {
      renderizarAutores(ui.resultados, est.resultados);
    } else {
      renderizarObras(ui.resultados, est.resultados);
    }
    ui.cuentaResultados.textContent = `${est.resultados.length} ${est.resultados.length === 1 ? "registro" : "registros"}`;
    renderizarPerfilAutor(ui.perfil, est.autorSeleccionado);
  };
  const cancelarSuscripcion = suscribirse((est, propiedades) => {
    if (propiedades.some((p) => ["categoriaActiva", "resultados", "autorSeleccionado"].includes(p))) {
      renderizarEstadoCompleto(est);
    }
    if (propiedades.some((p) => ["favoritos", "notas"].includes(p))) {
      renderizarBibliotecaEstado(est);
    }
  });
  window.addEventListener("pagehide", cancelarSuscripcion, { once: true });
  renderizarBibliografia(ui.bibliografia, FUENTES_BIBLIOGRAFICAS);
  actualizarResultados(AUTORES_27);
  ui.pestanas.forEach((pestana) => {
    pestana.addEventListener("click", () => {
      try {
        actualizarCategoria(pestana.dataset.category);
        actualizarAutorSeleccionado(null);
        actualizarResultados(
          pestana.dataset.category === "autores" ? AUTORES_27 : []
        );
        mostrarFeedback(ui.estado, "");
      } catch (error) {
        mostrarFeedback(ui.estado, error.message, "error");
      }
    });
  });
  ui.pestanas.forEach((pestana, indice) => {
    pestana.addEventListener("keydown", (evento) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(evento.key)) {
        return;
      }
      evento.preventDefault();
      const destino = evento.key === "Home" ? 0 : evento.key === "End" ? ui.pestanas.length - 1 : (indice + (evento.key === "ArrowRight" ? 1 : ui.pestanas.length - 1)) % ui.pestanas.length;
      ui.pestanas[destino].focus();
      ui.pestanas[destino].click();
    });
  });
  ui.formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    const { filtros: datos, incluirCatalogos } = leerFiltrosFormulario(ui.formulario);
    const validacion = validarFiltros({ ...datos }, obtenerEstado().categoriaActiva);
    if (!validacion.valido) {
      mostrarFeedback(ui.estado, validacion.errores.join(" "), "error");
      return;
    }
    const { filtros } = validacion;
    const filtrosEstado = {
      autor: filtros.autor,
      genero: filtros.genero,
      idioma: filtros.idioma,
      rangoCronologico: {
        desde: filtros.desde || "",
        hasta: filtros.hasta || ""
      }
    };
    try {
      actualizarFiltros(filtrosEstado);
      mostrarFeedback(ui.estado, "Buscando…");
      establecerCarga(ui.formulario, ui.indicadorCarga, true);
      let resultado;
      if (obtenerEstado().categoriaActiva === "autores") {
        resultado = await buscarAutoresController(filtros, incluirCatalogos);
      } else {
        resultado = await buscarObrasController(filtros, incluirCatalogos);
      }
      if (resultado.advertencia) {
        mostrarFeedback(
          ui.estado,
          `Se muestran los resultados del archivo local. ${resultado.advertencia}`,
          "error"
        );
      } else {
        mostrarFeedback(
          ui.estado,
          `Búsqueda completada: ${resultado.resultados.length} resultados.`,
          "success"
        );
      }
    } catch (error) {
      mostrarFeedback(
        ui.estado,
        error.message || "No se pudo completar la búsqueda.",
        "error"
      );
    } finally {
      establecerCarga(ui.formulario, ui.indicadorCarga, false);
    }
  });
  ui.limpiar.addEventListener("click", async () => {
    try {
      ui.formulario.reset();
      limpiarFiltros();
      actualizarAutorSeleccionado(null);
      if (obtenerEstado().categoriaActiva === "autores") {
        actualizarCategoria("autores");
        actualizarResultados(AUTORES_27);
      } else {
        await buscarObrasController({
          autor: "",
          genero: "",
          idioma: "es",
          desde: null,
          hasta: null
        }, false);
      }
      mostrarFeedback(ui.estado, "Filtros limpiados correctamente.", "success");
    } catch (error) {
      mostrarFeedback(ui.estado, error.message || "No se pudieron limpiar los filtros.", "error");
    }
  });
  ui.resultados.addEventListener("click", async (evento) => {
    const boton = evento.target.closest("button[data-action]");
    if (!boton || !ui.resultados.contains(boton)) {
      return;
    }
    if (boton.dataset.action === "author-detail") {
      try {
        const autor = {
          id: boton.dataset.authorId,
          key: boton.dataset.authorKey,
          nombre: boton.dataset.authorName
        };
        mostrarFeedback(ui.estado, `Cargando obras de ${autor.nombre}…`);
        await cargarObrasDeAutor(autor);
        const perfil = await enriquecerPerfilAutor(autor);
        renderizarEstadoCompleto(obtenerEstado());
        mostrarFeedback(
          ui.estado,
          perfil.advertencia ? `Obras cargadas. El resumen complementario no está disponible: ${perfil.advertencia}` : "Perfil y obras cargados.",
          perfil.advertencia ? "info" : "success"
        );
      } catch (error) {
        mostrarFeedback(
          ui.estado,
          error.message || "No se pudieron cargar las obras del autor.",
          "error"
        );
      }
      return;
    }
    if (boton.dataset.action === "favorite-add") {
      try {
        await agregarFavoritoController({
          obraId: boton.dataset.workId,
          titulo: boton.dataset.title,
          autor: boton.dataset.author,
          categoria: boton.dataset.genre,
          año: boton.dataset.year,
          descripcion: boton.dataset.description
        });
        mostrarFeedback(ui.estado, "Obra guardada en Mi biblioteca del 27.", "success");
      } catch (error) {
        mostrarFeedback(ui.estado, error.message || "No se pudo guardar la obra.", "error");
      }
    }
  });
  ui.favoritos.addEventListener("click", async (evento) => {
    const boton = evento.target.closest('button[data-action="favorite-delete"]');
    if (!boton || !ui.favoritos.contains(boton)) {
      return;
    }
    try {
      await eliminarFavoritoController(boton.dataset.id);
      ui.bibliotecaEstado.textContent = "Biblioteca sincronizada.";
      mostrarFeedback(ui.estado, "Obra eliminada de la biblioteca.", "success");
    } catch (error) {
      mostrarFeedback(ui.estado, error.message || "No se pudo eliminar la obra.", "error");
    }
  });
  ui.notas.addEventListener("click", async (evento) => {
    const boton = evento.target.closest("button[data-action]");
    if (!boton || !ui.notas.contains(boton)) {
      return;
    }
    if (boton.dataset.action === "note-edit") {
      ui.formularioNotas.dataset.editId = boton.dataset.id;
      ui.formularioNotas.elements.obra.value = String(boton.dataset.workId);
      ui.formularioNotas.elements.texto.value = boton.dataset.text;
      ui.formularioNotas.querySelector('button[type="submit"]').textContent = "Actualizar nota";
      ui.formularioNotas.scrollIntoView({ behavior: "smooth", block: "center" });
      ui.formularioNotas.elements.texto.focus();
      return;
    }
    if (boton.dataset.action === "note-delete") {
      try {
        await eliminarNotaController(boton.dataset.id);
        delete ui.formularioNotas.dataset.editId;
        ui.formularioNotas.reset();
        ui.formularioNotas.querySelector('button[type="submit"]').textContent = "Guardar nota";
        ui.bibliotecaEstado.textContent = "Biblioteca sincronizada.";
        mostrarFeedback(ui.estado, "Nota eliminada.", "success");
      } catch (error) {
        mostrarFeedback(ui.estado, error.message || "No se pudo eliminar la nota.", "error");
      }
    }
  });
  ui.formularioNotas.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    const datos = new FormData(ui.formularioNotas);
    try {
      await guardarNotaController(
        datos.get("obra"),
        datos.get("texto"),
        ui.formularioNotas.dataset.editId || null
      );
      ui.formularioNotas.reset();
      delete ui.formularioNotas.dataset.editId;
      ui.formularioNotas.querySelector('button[type="submit"]').textContent = "Guardar nota";
      ui.bibliotecaEstado.textContent = "Biblioteca sincronizada.";
      mostrarFeedback(ui.estado, "Nota de lectura guardada.", "success");
    } catch (error) {
      mostrarFeedback(ui.estado, error.message || "No se pudo guardar la nota.", "error");
    }
  });
  try {
    await cargarBibliotecaController();
    ui.bibliotecaEstado.textContent = "Biblioteca conectada y sincronizada.";
  } catch (error) {
    ui.bibliotecaEstado.textContent = "No se pudo conectar con json-server. Inicia la API local para guardar favoritos y notas.";
    mostrarFeedback(
      ui.estado,
      error.message || "La API local de la biblioteca no está disponible.",
      "error"
    );
  }
  renderizarEstadoCompleto(obtenerEstado());
  renderizarBibliotecaEstado(obtenerEstado());
}
if (typeof window !== "undefined" && typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      () => {
        inicializarAplicacion().catch(
          (error) => console.error("No se pudo iniciar el archivo.", error)
        );
      },
      { once: true }
    );
  } else {
    inicializarAplicacion().catch(
      (error) => console.error("No se pudo iniciar el archivo.", error)
    );
  }
}
