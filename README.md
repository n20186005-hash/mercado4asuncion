# Mercado 4 Asunción

Sitio de una sola página (Astro + TypeScript) dedicado al **Mercado Municipal N° 4** —conocido como
**Mercado 4**— en Asunción, Distrito Capital, Paraguay.

## Estructura

```
src/
  config/site.ts        # Todos los datos de la entidad (un único lugar para editar)
  styles/global.css     # Tokens de diseño y estilos de componentes
  pages/index.astro     # Página completa (TDK, JSON-LD, secciones, PWA)
public/
  favicon.svg
  manifest.webmanifest
  sw.js                 # Service worker (PWA)
  robots.txt
  images/               # Fotos locales con licencia (ver PHOTO-LINKS.md)
```

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

## Comandos

```bash
pnpm install --config.node-linker=hoisted   # Windows sin symlinks
pnpm dev
pnpm build
```

La salida es estática en `dist/` y se puede publicar en Cloudflare Pages / Workers Assets sin adaptador.

## Aviso

Sitio informativo independiente. No es un sitio oficial del Mercado 4 ni de la Municipalidad de Asunción.
