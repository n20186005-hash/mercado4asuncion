# Mercado 4 Asunción

Sitio de una sola página (Astro + TypeScript) dedicado al **Mercado Municipal N° 4** —conocido como
**Mercado 4**— en Asunción, Distrito Capital, Paraguay. Guía de divulgación sin fines comerciales.

## Estructura

```
src/
  config/site.ts          # Datos de la entidad (un único lugar para editar)
  config/content.ts       # Contenido editorial: servicios, transporte, clima, recorridos, divulgación
  lib/weather.ts          # Cliente del pronóstico + mapeo de códigos meteorológicos
  styles/global.css       # Tokens de diseño y estilos de componentes
  pages/index.astro       # Composición de la página + <head> (TDK, OG, JSON-LD, PWA)
  components/             # Secciones: Weather, Transport, Services, Plan, History, Science
public/
  favicon.svg
  manifest.webmanifest
  sw.js                   # Service worker (PWA)
  robots.txt
  images/                 # Fotos locales con licencia (ver PHOTO-LINKS.md)
wrangler.jsonc            # Despliegue manual en Cloudflare Workers (assets estáticos)
```

## Secciones de la página

| Ancla | Contenido |
| --- | --- |
| `#inicio` | H1 + calificación + datos clave |
| `#sobre` | Declaración de equivalencia de nombres + ruta de pertenencia |
| `#mercado` | Qué se encuentra en el mercado |
| `#galeria` | Galería con alt semántico |
| `#clima` | Condiciones actuales + pronóstico de 7 días |
| `#opiniones` | Calificación agregada con nota de procedencia |
| `#ubicacion` | Dirección, coordenadas, Plus Code y mapa embebido |
| `#transporte` | Desde el aeropuerto, colectivo, taxi, auto propio y a pie |
| `#servicios` | Sanitarios, estacionamiento, comida, alojamiento, abasto, combustible, salud, cajeros |
| `#alrededores` | Clúster semántico de alrededores |
| `#temporadas` | Estrategia de visita por temporada (tabla) |
| `#recorridos` | Rutas por perfil: familias / fotografía / bajo esfuerzo |
| `#rutas` | Itinerario de media jornada y jornada completa |
| `#historia` | Línea de tiempo |
| `#relatos` | Historias y contexto: Mercado Guasú, 1942, yuyos, «7 cajas», dicho popular |
| `#divulgacion` | Contexto urbano, alimentario, etnobotánico y lingüístico |
| `#responsabilidad` | Qué hacer y qué evitar |
| `#faq` | 17 preguntas frecuentes con `FAQPage` Schema |
| `#fuentes` | Fuentes y referencias |

## Variables de la entidad

| Variable | Valor |
| --- | --- |
| `ATTRACTION_FULL_NAME` | Mercado Municipal N° 4 |
| `ATTRACTION_SHORT_NAME` | Mercado 4 |
| `CITY_NAME` | Asunción |
| `STATE_PROVINCE` | Distrito Capital |
| `COUNTRY_NAME` / `COUNTRY_CODE_2LETTER` | Paraguay / PY |
| `POSTAL_CODE` | 001223 |
| `LATITUDE` / `LONGITUDE` | -25.299795 / -57.622196 |
| `MAPS_SHARE_URL` | https://maps.app.goo.gl/eFSL3TJK58oBRWbP6 |
| `MAPS_EMBED_SRC` | `google.com/maps?q=…&output=embed&hl=es&region=PY` |
| `NEARBY_LANDMARK_1` | Estadio General Pablo Rojas (La Nueva Olla) |
| `NEARBY_LANDMARK_2` | Museo Nacional de Bellas Artes de Asunción |
| `GOVT_TOURISM_URL` | https://www.senatur.gov.py/ |

## Calificación y opiniones

La calificación (**4,2**) y la cantidad de opiniones (**15.783**) se muestran únicamente en la página y
están **sincronizadas desde las opiniones de usuarios de Google Maps**, con fecha de sincronización
**septiembre de 2026**.

- Los datos de opiniones **no se incluyen en los datos estructurados (JSON-LD)**.
- Todos los bloques de opiniones llevan la nota de procedencia y el enlace a Google Maps.
- Los derechos sobre los contenidos pertenecen a sus autores originales y a Google Maps.

## Módulo de clima

El pronóstico se obtiene en el servidor (frontmatter de Astro) y se vuelve a pedir desde el navegador al
cargar la página, de modo que los valores mostrados correspondan al momento de la visita. Si el servicio no
responde, la sección se construye con un mensaje de respaldo y el resto de la página no se ve afectado.

Los datos no se muestran como texto meteorológico: pasan por un motor de reglas (`buildAdvice`) que traduce
temperatura, sensación térmica, humedad, viento, radiación solar, probabilidad de lluvia y tipo de tiempo en
cuatro bloques:

| Bloque | Contenido |
| --- | --- |
| Aviso importante | Solo aparece si hay tormenta, lluvia fuerte, viento muy fuerte, calor extremo, niebla o frío intenso |
| Qué ponerse | Ropa según temperatura, amplitud térmica, lluvia y viento |
| Cómo organizar la visita | Horario recomendado, efecto de la sensación térmica y de la isla de calor urbana |
| Qué llevar | Paraguas o piloto, protector solar, agua, abrigo: solo lo que corresponde |

Los bloques se renderizan de forma dinámica: si no hay lluvia no se sugiere paraguas, y si no aplica ninguna
regla se muestra una frase neutra. El perfil del destino es **urbano y cultural**, por lo que las
recomendaciones priorizan el calor, la humedad y la sombra antes que riesgos de montaña o costa.

## Comandos

```bash
pnpm install --config.node-linker=hoisted   # Windows sin symlinks
pnpm dev
pnpm build
```

## Despliegue en Cloudflare Workers

La salida es estática en `dist/`. Para publicar a mano:

```bash
pnpm build
npx wrangler deploy
```

`wrangler.jsonc` ya apunta a `./dist` como directorio de assets; no hace falta ningún adaptador.

## Aviso

Sitio informativo independiente. No es un sitio oficial del Mercado 4 ni de la Municipalidad de Asunción.
No recomienda comercios concretos, no cobra comisiones ni gestiona reservas.
