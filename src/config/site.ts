// Datos centrales de la entidad — Mercado Municipal N° 4 (Mercado 4), Asunción, Paraguay.
// Todas las secciones de la página y los datos estructurados leen de aquí.

export const DOMAIN_NAME = 'mercado4asuncion.com';
export const BASE = `https://${DOMAIN_NAME}`;

export const attraction = {
  // Nombre oficial completo
  fullName: 'Mercado Municipal N° 4',
  // Nombre corto / significado del dominio
  shortName: 'Mercado 4',
  city: 'Asunción',
  region: 'Distrito Capital',
  country: 'Paraguay',
  countryCode: 'PY',
  postalCode: '001223',

  // Dirección y geo
  streetAddress: 'Av. Silvio Pettirossi y Mayor Fleitas, Barrio Pettirossi',
  neighborhood: 'Barrio Pettirossi',
  latitude: -25.299795,
  longitude: -57.622196,
  plusCode: 'P92H+44',

  // Google Maps
  mapsShareUrl: 'https://maps.app.goo.gl/eFSL3TJK58oBRWbP6',
  mapsEmbedSrc:
    'https://www.google.com/maps?q=Mercado+Municipal+N%C2%B0+4%2C+Asunci%C3%B3n%2C+Paraguay&z=16&output=embed&hl=es&region=PY',

  // Referencias oficiales / autoridad
  govTourismUrl: 'https://www.senatur.gov.py/',
  municipalityUrl: 'https://www.asuncion.gov.py/',
  juntaMunicipalUrl: 'https://jma.gov.py/',

  // Datos prácticos
  phone: '+595 21 232 129',
  hours: 'Todos los días, de 05:00 a 18:00 (horario de referencia)',
  hoursShort: '05:00 – 18:00',
  price: 'Entrada libre y gratuita',
  bestTime: 'Mañanas, entre 08:00 y 11:00',

  // Calificación y opiniones (sincronizadas desde Google Maps)
  rating: 4.2,
  ratingDisplay: '4,2',
  reviewCount: 15783,
  reviewCountDisplay: '15.783',
  syncDate: 'septiembre de 2026',
  syncDateISO: '2026-09',
  syncYear: '2026',
  syncMonth: '9',
} as const;

// 4.3 — Clúster semántico de alrededores
export const nearbyLandmarks = [
  {
    name: 'Estadio General Pablo Rojas (La Nueva Olla)',
    tag: '~1,4 km',
    text: 'La cancha de Cerro Porteño, uno de los estadios más grandes del país, queda a pocos minutos hacia el oeste y convierte los días de partido en una experiencia aparte.',
  },
  {
    name: 'Museo Nacional de Bellas Artes de Asunción',
    tag: '~1,1 km',
    text: 'Casona histórica del centro con colección de arte paraguayo y exposiciones temporales; una parada natural para completar la visita al mercado.',
  },
  {
    name: 'Panteón Nacional de los Héroes',
    tag: '~2,3 km',
    text: 'El monumento patriótico más importante del país, en el casco histórico, al que se llega en pocos minutos por el corredor de Pettirossi.',
  },
  {
    name: 'Plaza de la Democracia',
    tag: '~2,2 km',
    text: 'El punto donde funcionaba el antiguo Mercado Guasú, origen del Mercado 4 antes de su traslado al barrio Pettirossi en 1942.',
  },
];

export const NEARBY_LANDMARK_1 = nearbyLandmarks[0].name;
export const NEARBY_LANDMARK_2 = nearbyLandmarks[1].name;

// Galería (imágenes locales con licencia)
export const gallery = [
  {
    src: '/images/mercado4-hero.jpg',
    alt: 'Mercado Municipal N° 4 - Vista principal en Asunción, Paraguay',
    caption: 'El frente del mercado sobre la avenida Pettirossi',
  },
  {
    src: '/images/mercado4-stalls.jpg',
    alt: 'Puestos del Mercado 4 con frutas y verduras en Asunción',
    caption: 'Puestos de frutas, verduras y productos frescos',
  },
  {
    src: '/images/mercado4-terere.jpg',
    alt: 'Tereré y productos típicos paraguayos en el Mercado 4',
    caption: 'Tereré, yerba y productos típicos del Paraguay',
  },
  {
    src: '/images/mercado4-yuyos.jpg',
    alt: 'Puesto de yuyos y plantas medicinales en el Mercado 4 de Asunción',
    caption: 'Yuyos y plantas medicinales de la medicina tradicional',
  },
];

// Lo que se encuentra en el mercado
export const sections = [
  {
    icon: '🥬',
    title: 'Frutas y verduras',
    text: 'Uno de los mayores centros de abasto de Asunción: verdura de hoja, frutas de estación, mandioca, maíz y todo lo que llega cada madrugada desde el interior.',
  },
  {
    icon: '🍲',
    title: 'Cocinerías y comida al paso',
    text: 'Sopa paraguaya, chipa, empanadas, asado y cocina internacional en los comedores del fondo: se come bien y barato a cualquier hora de la mañana.',
  },
  {
    icon: '🌿',
    title: 'Yuyos y medicina tradicional',
    text: 'El rincón más conocido del mercado: hierbas medicinales, remedios naturales y los puestos de los yuyeros que sostienen una tradición guaraní viva.',
  },
  {
    icon: '👕',
    title: 'Ropa, calzados y electrónica',
    text: 'Pasillos de ropa, zapatillas, telas, artículos para el hogar y pequeños locales de electrónica que se fueron sumando con las décadas.',
  },
];

// Hitos históricos
export const timeline = [
  {
    year: 'Antes de 1942',
    title: 'El Mercado Guasú de la Plaza de la Democracia',
    text: 'El abasto de la ciudad funcionaba en el predio donde hoy está la Plaza de la Democracia, en el centro de Asunción.',
  },
  {
    year: '1942',
    title: 'El traslado al barrio Pettirossi',
    text: 'Bajo el gobierno del general Higinio Morínigo se expropian terrenos baldíos y el mercado se instala en su ubicación actual, en el barrio Pettirossi.',
  },
  {
    year: 'Décadas siguientes',
    title: 'Una expansión que se come tres barrios',
    text: 'El mercado crece hasta ocupar áreas de los barrios San Roque, Ciudad Nueva y Pinozá, hasta convertirse en una pequeña ciudad dentro de la ciudad.',
  },
  {
    year: '2012',
    title: '«7 cajas» y la fama internacional',
    text: 'La película paraguaya «7 cajas», filmada en las inmediaciones del mercado, proyecta el Mercado 4 en festivales de todo el mundo.',
  },
  {
    year: 'Hoy',
    title: 'El mercado más popular del país',
    text: 'Miles de personas pasan cada día por sus pasillos. Es comercio, pero también gastronomía, tradición y un retrato vivo de la cultura paraguaya.',
  },
];

// Preguntas frecuentes (coinciden con el FAQPage Schema)
export const faqs = [
  {
    q: '¿Dónde queda el Mercado Municipal N° 4?',
    a: 'El Mercado Municipal N° 4 queda en Asunción, Distrito Capital, Paraguay, en el barrio Pettirossi, sobre la intersección de la Av. Silvio Pettirossi con Mayor Fleitas. Código postal 001223, código Plus P92H+44.',
  },
  {
    q: '¿Cuál es la diferencia entre Mercado 4 y Mercado Municipal N° 4?',
    a: 'Son el mismo lugar. «Mercado Municipal N° 4» es el nombre oficial del recinto y «Mercado 4» —o «Mercado Cuatro»— es la forma popular con la que todos lo conocen en Asunción.',
  },
  {
    q: '¿Se paga entrada para visitar el Mercado 4?',
    a: 'No. El acceso al Mercado Municipal N° 4 es público, libre y gratuito todo el año. Solo se paga por lo que se compra en los puestos.',
  },
  {
    q: '¿Cuál es el horario del Mercado 4?',
    a: 'El movimiento empieza muy temprano, cerca de las 05:00, y se mantiene fuerte hasta media tarde, alrededor de las 18:00. Cada puesto maneja su propio horario, por lo que conviene confirmar si se busca algo específico.',
  },
  {
    q: '¿Cuál es la mejor hora para visitarlo?',
    a: 'Por la mañana, entre las 08:00 y las 11:00, cuando llega la mercadería fresca y los pasillos están activos pero todavía no abarrotados. Es también el mejor momento para los puestos de yuyos y las cocinerías.',
  },
  {
    q: '¿Es un lugar seguro para turistas?',
    a: 'Es un mercado popular muy concurrido, con mucho movimiento de gente. Como en cualquier mercado grande del mundo, conviene cuidar pertenencias, evitar objetos de valor a la vista y moverse por los pasillos principales.',
  },
  {
    q: '¿Qué se puede comprar en el Mercado 4?',
    a: 'Frutas y verduras, carnes y pescados, yuyos medicinales, especias, ropa, calzados, artículos para el hogar, electrónica y comida típica paraguaya: chipa, sopa paraguaya, empanadas y asado.',
  },
  {
    q: '¿Cómo llego al Mercado 4 en transporte público?',
    a: 'Numerosas líneas de colectivo recorren la Av. Silvio Pettirossi y la zona del mercado; la parada Puerto Elsa queda a pocos minutos a pie. Es uno de los puntos mejor conectados de Asunción.',
  },
  {
    q: '¿Se puede pagar con tarjeta o hay que llevar efectivo?',
    a: 'Muchos puestos pequeños trabajan solo con efectivo en guaraníes. Hay cajeros automáticos en los alrededores y algunos locales aceptan tarjeta, pero conviene llevar billetes pequeños.',
  },
  {
    q: '¿De dónde salen la calificación y las opiniones que se muestran en esta página?',
    a: 'La calificación y la cantidad de opiniones están sincronizadas desde las opiniones de usuarios de Google Maps, con fecha de sincronización septiembre de 2026. Los derechos sobre esos contenidos pertenecen a sus autores originales y a Google Maps.',
  },
];

// Aspectos destacados y recomendaciones (resumen de opiniones de visitantes)
export const reviewHighlights = [
  'Precios bajos y producto fresco recién llegado del interior',
  'Los puestos de yuyos y la medicina tradicional guaraní',
  'Comida típica paraguaya a precios de mercado',
  'Un retrato auténtico del comercio popular de Asunción',
];

export const reviewNotes = [
  'Pasillos estrechos y muy concurridos en horas pico',
  'Calor y poca sombra al mediodía: mejor ir temprano',
  'Llevar efectivo en billetes pequeños para los puestos chicos',
  'Cuidar pertenencias personales en los tramos más apretados',
];

// Fuentes / E-E-A-T
export const sources = [
  {
    title: 'Opiniones · Sincronización: septiembre de 2026',
    meta: 'Google Maps',
    desc: 'Calificación y cantidad de opiniones sincronizadas desde las opiniones de usuarios de Google Maps, con fecha de sincronización septiembre de 2026; los derechos de autor pertenecen a sus autores originales y a Google Maps.',
    linkLabel: 'Ver todas las opiniones en Google Maps',
    url: attraction.mapsShareUrl,
  },
  {
    title: 'Ubicación, límites y código postal',
    meta: 'Google Maps · Wikidata',
    desc: 'Coordenadas, código Plus y código postal del barrio Pettirossi verificados sobre el registro del Mercado Municipal N° 4 y el mapa de la zona.',
    linkLabel: 'Abrir la ubicación en Google Maps',
    url: attraction.mapsShareUrl,
  },
  {
    title: 'Historia y reconocimiento institucional',
    meta: 'Junta Municipal de Asunción',
    desc: 'El traslado del mercado desde el Mercado Guasú hasta el barrio Pettirossi en 1942, su expansión hacia los barrios San Roque, Ciudad Nueva y Pinozá, y su aparición en la película paraguaya «7 cajas».',
    linkLabel: 'Ver la publicación de la Junta Municipal de Asunción',
    url: attraction.juntaMunicipalUrl,
  },
  {
    title: 'Información turística oficial',
    meta: 'SENATUR',
    desc: 'La Secretaría Nacional de Turismo del Paraguay es el organismo oficial para consultar novedades, circuitos y recomendaciones vigentes para visitantes.',
    linkLabel: 'Visitar el portal oficial de turismo del Paraguay',
    url: attraction.govTourismUrl,
  },
];
