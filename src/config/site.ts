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
  postalCode: '',

  // Dirección y geo
  streetAddress: 'Pettirossi y República Francesa: referencia municipal del Paseo de los Yuyos; confirmar acceso',
  neighborhood: 'Barrio Pettirossi',
  latitude: -25.299691,
  longitude: -57.6221953,
  plusCode: '',

  // Google Maps
  mapsShareUrl: 'https://maps.app.goo.gl/eFSL3TJK58oBRWbP6',
  mapsEmbedSrc:
    'https://www.google.com/maps?q=-25.299691,-57.6221953&z=16&output=embed&hl=es&region=PY',

  // Referencias oficiales / autoridad
  govTourismUrl: 'https://www.senatur.gov.py/',
  municipalityUrl: 'https://www.asuncion.gov.py/',
  juntaMunicipalUrl: 'https://jma.gov.py/',

  // Datos prácticos
  phone: 'No verificado; consultar administración municipal',
  hours: 'Maps señalaba apertura a las 07:00 el 29/10/2026; no es horario semanal completo',
  hoursShort: 'Confirmar por sector',
  price: 'Confirmar condiciones de actividades y servicios',
  bestTime: 'Según el puesto y el clima',

  // Referencia de calificación de terceros consultada en Google Maps
  rating: 4.2,
  ratingDisplay: '4,2',
  reviewCount: 15838,
  reviewCountDisplay: '15.838',
  syncDate: '29 de octubre de 2026',
  syncDateISO: '2026-10-29',
  syncYear: '2026',
  syncMonth: '10',
} as const;

export const nearbyLandmarks = [
  {
    "name": "Paseo de los Yuyos",
    "tag": "Referencia municipal",
    "text": "La campaña municipal de octubre de 2025 ubicó su punto de encuentro en República Francesa y Pettirossi, frente a la administración. Confirmá el acceso actual; no se anuncia aquí un tour vigente."
  },
  {
    "name": "Otros destinos de Asunción",
    "tag": "Plan aparte",
    "text": "Para combinar con museos, estadios o el centro histórico, comprobá por separado el recorrido, la entrada y la agenda. Esta guía no garantiza distancias a pie ni conexiones inmediatas."
  }
];
export const NEARBY_LANDMARK_1 = nearbyLandmarks[0].name;
export const NEARBY_LANDMARK_2 = nearbyLandmarks[1].name;
export const gallery = [
  {
    "src": "/images/market-illustration.svg",
    "alt": "Composición geométrica original de esta guía; no es fotografía ni plano del mercado",
    "caption": "Ilustración original CC0 de esta guía; no representa puestos, personas ni instalaciones reales.",
    "source": "https://creativecommons.org/publicdomain/zero/1.0/",
    "author": "Ilustración original de la guía",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/"
  }
];
export const sections = [
  {
    "icon": "🥬",
    "title": "Alimentos",
    "text": "La Municipalidad incluye alimentos entre los rubros del mercado. Confirmá el producto, precio y puesto concreto antes de comprar; no se garantiza inventario ni frescura."
  },
  {
    "icon": "👕",
    "title": "Textiles y calzados",
    "text": "La nota municipal del 5 de mayo de 2026 destaca textiles y calzados en su actividad comercial. No es un directorio de tiendas ni acredita una marca o sucursal."
  },
  {
    "icon": "📱",
    "title": "Tecnología",
    "text": "También figura en la descripción municipal. Consultá procedencia, garantía, comprobante y condiciones del vendedor antes de pagar."
  },
  {
    "icon": "🌿",
    "title": "Paseo de los Yuyos",
    "text": "Es un punto de referencia cultural identificado por la Municipalidad. La presencia de hierbas en el mercado no implica eficacia terapéutica ni recomendación de esta guía."
  }
];
export const faqs = [
  {
    "q": "¿Dónde queda el Mercado 4 y por dónde entrar?",
    "a": "Está en Asunción, en el entorno de Pettirossi. La Municipalidad identificó República Francesa y Pettirossi, frente a la administración y el Paseo de los Yuyos, como punto de encuentro de un tour de 2025. Es una referencia para orientarse, no la única entrada ni una garantía de acceso hoy; confirmá el sector que buscás."
  },
  {
    "q": "¿Qué horario tiene el Mercado 4?",
    "a": "Maps señalaba apertura a las 07:00 el 29 de octubre de 2026, sin confirmar aquí una tabla semanal completa. Cada sector y vendedor puede tener horarios distintos. Verificá con el puesto o la administración antes de salir."
  },
  {
    "q": "¿El Mercado 4 abre los domingos?",
    "a": "No se verificó un horario oficial dominical común para todo el mercado. No asumás que todos los locales abren: confirmá el vendedor, sector y fecha de tu visita."
  },
  {
    "q": "¿Se paga entrada?",
    "a": "No se verificó una tarifa general de visita vigente. Compras, estacionamiento, actividades y servicios tienen condiciones propias. La gratuidad del tour municipal anunciado para el 1 de noviembre de 2025 correspondía a esa actividad concreta, no a un calendario actual."
  },
  {
    "q": "¿Qué puedo comprar?",
    "a": "La Municipalidad describe textiles, calzados, tecnología y alimentos. La oferta concreta cambia por vendedor; no garantizamos marcas, inventario, precios ni comercios específicos."
  },
  {
    "q": "¿Aceptan tarjeta, transferencia o QR?",
    "a": "La Municipalidad informó en mayo de 2026 una incorporación progresiva de transferencias y QR. No significa que todos los puestos acepten todos los medios: acordá importe, moneda y forma de pago con el vendedor."
  },
  {
    "q": "¿Abre de noche?",
    "a": "La nota municipal del 21 de septiembre de 2026 describe Mercado 4 Suena y la continuidad de un ciclo cultural. La del 18 de octubre informa ampliación de actividad nocturna y trabajo en un cronograma. Ninguna publica aquí un horario semanal completo ni confirma domingos. Consultá la actividad y el vendedor antes de ir; las 21:00 de Battilana de Noche correspondían a fechas concretas de diciembre de 2025."
  },
  {
    "q": "¿Hay baños y un recorrido accesible garantizado?",
    "a": "No se verificaron baños operativos, rampas, pavimento continuo ni anchos de paso para una ruta concreta. Consultá estos puntos y los lugares de descanso antes de ir; adaptá el recorrido a tu movilidad."
  },
  {
    "q": "¿De dónde salen la calificación y las opiniones?",
    "a": "La consulta de Google Maps del 29 de octubre de 2026 mostraba 4,2/5 de 15.838 opiniones de terceros. No son reseñas propias ni actualización automática. Se enlaza a Maps sin copiar opiniones individuales."
  }
];
export const reviewHighlights = [
  "Referencia fechada de Google Maps: 4,2/5 de 15.838 opiniones.",
  "La guía no ha recopilado esas opiniones ni calculado una distribución de estrellas."
];
export const reviewNotes = [
  "Confirmá sector, vendedor, entrada y horario concreto.",
  "La calificación no garantiza seguridad, calidad ni disponibilidad de un servicio."
];
export const sources = [
  {
    "title": "Ubicación y contexto del Paseo de los Yuyos",
    "meta": "Municipalidad · 28/10/2025",
    "desc": "Punto de encuentro municipal en Pettirossi y República Francesa. Se trata de un anuncio histórico, no de reserva o tour vigente.",
    "linkLabel": "Leer la campaña Eju Mercadope",
    "url": "https://www.asuncion.gov.py/mercados/gobierno-de-la-ciudad-impulsa-la-campana-eju-mercadope-para-revalorizar-el-mercado-municipal-no-4"
  },
  {
    "title": "Identidad, rubros y pagos",
    "meta": "Municipalidad · 05/05/2026",
    "desc": "Aniversario del Mercado Municipal N°4, descripción de rubros e incorporación progresiva de pagos electrónicos; no acredita todos los vendedores.",
    "linkLabel": "Leer la nota municipal de aniversario",
    "url": "https://www.asuncion.gov.py/mercados/mercado-no-4/el-mercado-municipal-n-4-celebra-84-anos-como-principal-polo-comercial-minorista-del-pais"
  },
  {
    "title": "Ciclo cultural nocturno",
    "meta": "Municipalidad · 21/09/2026",
    "desc": "Describe Mercado 4 Suena y la intención de continuar el ciclo musical. No establece un horario semanal completo ni dominical.",
    "linkLabel": "Consultar la nota del ciclo cultural",
    "url": "https://www.asuncion.gov.py/mercados/mercado-no-4/en-el-mercado-4-se-ofrecen-variados-espectaculos-artisticos-con-grupos-nacionales-para-atraer-al-publico-en-horario-nocturno"
  },
  {
    "title": "Ampliación de actividad nocturna",
    "meta": "Municipalidad · 18/10/2026",
    "desc": "Informa ampliación nocturna y trabajo en un cronograma de actividades. Confirmá el evento y sector; no publica una tabla semanal ni confirma domingos.",
    "linkLabel": "Consultar el anuncio municipal de octubre",
    "url": "https://www.asuncion.gov.py/mercados/mercados-municipales-amplian-su-actividad-con-propuestas-culturales-y-horarios-nocturnos"
  },
  {
    "title": "Horario extendido de una actividad concreta",
    "meta": "Municipalidad · 09/12/2025",
    "desc": "Battilana de Noche fue un anuncio para dos fechas de diciembre de 2025; no se toma como horario regular.",
    "linkLabel": "Ver el alcance del anuncio histórico",
    "url": "https://www.asuncion.gov.py/mercados/gobierno-de-la-ciudad-de-asuncion-impulsa-battilana-de-noche-para-ofrecer-horarios-extendidos-en-el-mercado-4-e-impulsar-ventas"
  },
  {
    "title": "Referencia de Maps",
    "meta": "Consulta · 29/10/2026",
    "desc": "4,2/5 de 15.838 opiniones. La señal de apertura 07:00 no es un horario semanal completo ni una garantía de acceso.",
    "linkLabel": "Ver la ficha y opiniones de terceros",
    "url": "https://maps.app.goo.gl/eFSL3TJK58oBRWbP6"
  }
];
