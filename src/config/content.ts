// Contenido editorial de la guía: servicios al visitante, transporte, clima,
// recorridos, divulgación y responsabilidad. Todo redactado de forma neutral:
// se describen **tipos de servicios**, nunca comercios concretos.

import { attraction } from './site';

const SHORT = attraction.shortName;
const FULL = attraction.fullName;
const CITY = attraction.city;

/* ------------------------------------------------------------------ CLIMA */
export const climateIntro = `${CITY} tiene clima subtropical húmedo: veranos largos y calurosos,
inviernos cortos y templados, y lluvias concentradas en los meses cálidos. Como el ${SHORT} es en su
mayoría un recorrido a pie por pasillos cubiertos pero abiertos, el clima define mucho la experiencia:
la sombra es escasa y el calor se siente más que en la calle.`;

export const climateBaseline = [
  { k: 'Temperatura media anual', v: '≈ 23 °C' },
  { k: 'Máximas de verano', v: '33 – 40 °C (con sensación térmica mayor)' },
  { k: 'Mínimas de invierno', v: '8 – 14 °C (puede haber mañanas frescas)' },
  { k: 'Meses más lluviosos', v: 'octubre – marzo' },
  { k: 'Meses más secos', v: 'junio – agosto' },
  { k: 'Humedad relativa', v: 'alta todo el año, en especial al amanecer' },
];

export const seasons = [
  {
    season: 'Verano (diciembre – marzo)',
    climate: 'Muy caluroso y húmedo, con tormentas de tarde y picos de sensación térmica por encima de los 40 °C.',
    crowd: 'Alto en la mañana temprano; vacío al mediodía.',
    best: 'Ir entre las 06:00 y las 09:00, cuando entra la mercadería y todavía corre algo de aire.',
    caution: 'Golpes de calor y piso mojado por lluvia. Evitar las 12:00–15:00.',
  },
  {
    season: 'Otoño (abril – mayo)',
    climate: 'Temperaturas agradables, entre 20 y 28 °C, y menos lluvias que en verano.',
    crowd: 'Flujo constante y parejo durante toda la mañana.',
    best: 'La mejor ventana del año para recorrer con calma y sacar fotos.',
    caution: 'Algunas tardes siguen siendo húmedas; llevar una campera liviana para la vuelta.',
  },
  {
    season: 'Invierno (junio – agosto)',
    climate: 'Templado y seco, con mañanas frescas (8 – 14 °C) y tardes de 20 – 25 °C.',
    crowd: 'Muy alto: es la temporada de mayor comodidad para caminar.',
    best: 'Llegar cerca de las 09:00: ya hay movimiento y el frío aflojó.',
    caution: 'Los frentes fríos (“surazo”) bajan la temperatura de golpe; abrigarse en capas.',
  },
  {
    season: 'Primavera (septiembre – noviembre)',
    climate: 'Cálido con lluvias crecientes y mucha variación en el mismo día.',
    crowd: 'Medio, con picos los fines de semana.',
    best: 'Mañanas de sol para los puestos de frutas de estación (mango, piña, naranja).',
    caution: 'Tormentas eléctricas vespertinas: el paraguas es casi obligatorio.',
  },
];

/* -------------------------------------------------- SERVICIOS AL VISITANTE */
export const services = [
  {
    icon: '🚻',
    title: 'Sanitarios',
    text: 'Hay baños públicos de pago dentro y en el perímetro del mercado, señalizados con cartelería en los pasillos principales. Son instalaciones básicas: conviene llevar papel y alcohol en gel.',
    tips: ['Llevar monedas en efectivo', 'Papel higiénico y toallitas en la mochila', 'Usarlos en los accesos principales, no en pasillos laterales'],
  },
  {
    icon: '🅿️',
    title: 'Estacionamiento',
    text: 'El entorno funciona con playas de estacionamiento privadas y espacios en la vía pública administrados por cuidadores. No hay un estacionamiento oficial único ni gratuito garantizado.',
    tips: ['Llegar antes de las 09:00 para conseguir lugar', 'No dejar objetos a la vista dentro del vehículo', 'Confirmar el precio antes de dejar el auto'],
  },
  {
    icon: '🍲',
    title: 'Alimentación',
    text: 'Dentro del mercado hay comedores y cocinerías de comida al paso: sopa paraguaya, chipa, empanadas, asado, minutas y también cocina de comunidades de inmigrantes. En los alrededores hay casas de comida, panaderías y cafeterías.',
    tips: ['Elegir puestos con mucha rotación de clientes', 'El horario fuerte del almuerzo es 11:00–14:00', 'Si tenés restricciones alimentarias, preguntá por los ingredientes'],
  },
  {
    icon: '🛏️',
    title: 'Alojamiento',
    text: 'En el radio del mercado predominan hospedajes económicos y pensiones familiares. El centro histórico de Asunción, a 2–3 km, concentra hoteles de todas las categorías y mejor conectividad nocturna.',
    tips: ['Comparar por zona: Pettirossi es más barato, el centro es más cómodo', 'Reservar con antelación si hay partido o feriado largo', 'Verificar que tenga recepción 24 h'],
  },
  {
    icon: '🛒',
    title: 'Supermercados y abasto',
    text: 'Además de los puestos del mercado, en las avenidas del entorno hay minimercados, despensas y algún supermercado de formato grande. Sirven para comprar agua, hielo y productos envasados.',
    tips: ['Agua embotellada siempre a mano', 'Los precios del mercado suelen ser más bajos que los del supermercado', 'Cerrar compras antes de las 17:00 si buscás variedad'],
  },
  {
    icon: '⛽',
    title: 'Combustible y carga',
    text: 'Las estaciones de servicio se ubican sobre las avenidas principales que rodean el barrio Pettirossi. La infraestructura de carga para vehículos eléctricos todavía es escasa en la zona: conviene planificar la recarga en el centro.',
    tips: ['Cargar nafta antes de entrar al barrio', 'Planificar la recarga eléctrica en el centro de la ciudad', 'El tráfico es denso en hora pico: prever tiempo extra'],
  },
  {
    icon: '💊',
    title: 'Salud y farmacias',
    text: 'Hay farmacias en el perímetro del mercado y centros de salud públicos en el barrio. Para urgencias, los hospitales de referencia quedan a pocos minutos en taxi.',
    tips: ['Llevar los medicamentos habituales', 'Anotar la dirección del alojamiento en caso de emergencia', 'Hidratarse: el calor y la humedad sorprenden'],
  },
  {
    icon: '🏧',
    title: 'Bancos y cajeros',
    text: 'Los cajeros automáticos y las casas de cambio se concentran en las avenidas del entorno. Dentro del mercado la mayoría de los puestos cobra en efectivo.',
    tips: ['Extraer antes de entrar a los pasillos', 'Preferir cajeros en locales con vigilancia', 'Pedir billetes de denominación baja'],
  },
  {
    icon: '📶',
    title: 'Conectividad y otros',
    text: 'La señal de telefonía móvil funciona razonablemente bien, aunque dentro de los pasillos más techados puede degradarse. Hay locales de servicios de recarga, lotería y reparaciones menores.',
    tips: ['Descargar el mapa offline antes de salir', 'Compartir ubicación con alguien de confianza', 'Llevar power bank si vas a fotografiar mucho'],
  },
];

/* ------------------------------------------------------------- TRANSPORTE */
export const transportModes = [
  {
    icon: '✈️',
    mode: 'Desde el aeropuerto',
    summary: `El Aeropuerto Internacional Silvio Pettirossi queda a unos 15 km del ${FULL}.`,
    steps: [
      'Taxi o servicio de transporte por aplicación: el trayecto directo toma entre 30 y 45 minutos según el tráfico.',
      'Servicio de transfer compartido: conviene reservarlo con antelación si llegás de noche.',
      'Transporte público: requiere combinar un servicio urbano hasta el corredor de la Av. Silvio Pettirossi; es la opción más barata pero la más lenta con equipaje.',
    ],
    meta: ['Tiempo: 30 – 45 min', 'Costo: medio–alto', 'Comodidad: alta'],
  },
  {
    icon: '🚌',
    mode: 'En transporte público',
    summary: `Numerosas líneas de colectivo urbano recorren la Av. Silvio Pettirossi y las calles del perímetro del ${SHORT}.`,
    steps: [
      'Buscar las líneas que pasan por Av. Silvio Pettirossi o por el barrio Pettirossi; la parada Puerto Elsa queda a pocos minutos a pie.',
      'El pago se hace en efectivo al conductor; conviene llevar monto justo y billetes pequeños.',
      'Es una buena opción de día, con luz y equipaje liviano. Evitarla de noche o con valijas grandes.',
    ],
    meta: ['Tiempo: 20 – 40 min desde el centro', 'Costo: bajo', 'Comodidad: media'],
  },
  {
    icon: '🚕',
    mode: 'En taxi o transporte por aplicación',
    summary: 'Es la forma más directa y predecible de llegar, especialmente si es tu primera visita.',
    steps: [
      'Pedir el viaje indicando “Mercado 4 / Av. Silvio Pettirossi y Mayor Fleitas” para evitar confusiones con otras paradas.',
      'Desde el centro de Asunción el viaje toma entre 10 y 25 minutos según el tránsito.',
      'Para la vuelta, caminar hasta la avenida principal antes de pedir el auto: dentro de los pasillos el GPS pierde precisión.',
    ],
    meta: ['Tiempo: 10 – 25 min desde el centro', 'Costo: medio', 'Comodidad: alta'],
  },
  {
    icon: '🚗',
    mode: 'En vehículo propio',
    summary: 'Posible, pero exige paciencia: el entorno tiene tráfico denso y estacionamiento informal.',
    steps: [
      'Usar una playa de estacionamiento sobre la avenida en lugar de internarse en las calles del barrio.',
      'Evitar el horario pico (07:00–09:00 y 17:00–19:00).',
      'No dejar pertenencias visibles dentro del vehículo.',
    ],
    meta: ['Tiempo: muy variable', 'Costo: estacionamiento por hora', 'Comodidad: media'],
  },
  {
    icon: '🚶',
    mode: 'A pie o en bicicleta',
    summary: 'Desde el centro histórico son unos 2–3 km en descenso por el corredor de Pettirossi.',
    steps: [
      'Caminar es viable con temperaturas templadas y sin equipaje pesado.',
      'Las veredas del corredor son angostas y con mucho movimiento: ir por la sombra.',
      'No hay bicisendas protegidas en el tramo: si vas en bici, extremá la atención con el tráfico.',
    ],
    meta: ['Tiempo: 30 – 40 min a pie desde el centro', 'Costo: ninguno', 'Comodidad: depende del clima'],
  },
];

/* ------------------------------------------------------------- RECORRIDOS */
export const itineraries = [
  {
    icon: '👨‍👩‍👧‍👦',
    name: 'Familias con niños',
    tagline: 'Un recorrido corto, con sombra, comida y mucho color.',
    duration: '2 – 3 horas',
    stops: [
      'Entrada por la Av. Silvio Pettirossi y primer tramo de frutas: es el sector más visual y menos apretado.',
      'Pausa en una cocinería para probar chipa o sopa paraguaya en porciones chicas.',
      'Recorrido por los puestos de ropa y juguetería, donde los pasillos son algo más anchos.',
      'Salida hacia una plaza del barrio para descansar antes de volver.',
    ],
    tips: [
      'Ir temprano: antes de las 11:00 hay menos gente y menos calor.',
      'Llevar agua, gorra y una mochila pequeña (no cochecito: los pasillos son estrechos).',
      'Acordar un punto de encuentro visible por si alguien se separa.',
    ],
  },
  {
    icon: '📷',
    name: 'Fotografía y cultura urbana',
    tagline: 'Texturas, color y retrato de la vida popular asuncena.',
    duration: '3 – 4 horas',
    stops: [
      'Amanecer comercial (06:00–08:00): descarga de mercadería en los accesos, la mejor luz y el mayor movimiento.',
      'Puestos de yuyos y hierbas: texturas, haces de plantas y retratos de quienes atienden.',
      'Pasillos de comida: vapor, ollas y puestos de chipa recién salida.',
      'Perímetro exterior y paradas de colectivo para capturar el contexto urbano.',
    ],
    tips: [
      'Pedir permiso antes de retratar a personas; muchos acceden si se les explica el motivo.',
      'Lentes luminosos: hay poca luz dentro de los pasillos techados.',
      'Cuidar la cámara en los tramos más apretados y usar una mochila cruzada adelante.',
    ],
  },
  {
    icon: '♿',
    name: 'Bajo esfuerzo físico y accesibilidad',
    tagline: 'Una visita realista, corta y por los sectores más amplios.',
    duration: '1 – 1,5 horas',
    stops: [
      'Acceso por el frente sobre la Av. Silvio Pettirossi, donde el piso es más parejo.',
      'Recorrido lineal por el pasillo principal, sin entrar a los corredores secundarios.',
      'Parada en un puesto de comida con asientos para descansar.',
      'Salida por el mismo acceso, evitando el interior más denso.',
    ],
    tips: [
      'El mercado no es accesible en silla de ruedas en la mayor parte de su interior: piso irregular, desniveles y mucha gente.',
      'Ir acompañado y en horario de menor afluencia (08:00–10:00).',
      'Prever un vehículo que espere cerca: caminar de vuelta puede ser agotador.',
    ],
  },
];

export const routes = [
  {
    name: 'Media jornada (3 – 4 horas)',
    icon: '⏱️',
    intro: 'El recorrido mínimo recomendable para entender el lugar sin agotarse.',
    blocks: [
      { t: '06:30 – 08:00', d: 'Llegada y primer tramo de frutas y verduras: el momento de mayor movimiento comercial.' },
      { t: '08:00 – 09:00', d: 'Puestos de yuyos y hierbas medicinales, el rincón más singular del mercado.' },
      { t: '09:00 – 10:00', d: 'Desayuno en una cocinería: chipa, café con leche o jugo de fruta.' },
      { t: '10:00 – 11:00', d: 'Pasillos de ropa, calzados y artículos del hogar.' },
    ],
  },
  {
    name: 'Jornada completa (6 – 7 horas)',
    icon: '🗺️',
    intro: 'Para quienes quieren recorrerlo completo y combinarlo con el centro histórico.',
    blocks: [
      { t: '06:30 – 09:00', d: 'Recorrido comercial: verduras, frutas, carnes y pescados.' },
      { t: '09:00 – 10:30', d: 'Yuyos, especias y productos de medicina tradicional.' },
      { t: '10:30 – 12:00', d: 'Almuerzo temprano en una cocinería, antes del pico de la tarde.' },
      { t: '12:00 – 13:30', d: 'Sector de artesanías, telas y productos regionales.' },
      { t: '13:30 – 15:30', d: 'Traslado al centro histórico para completar con museos y plazas.' },
    ],
  },
];

/* ---------------------------------------------------------------- HISTORIA */
export const historyStories = [
  {
    year: 'Origen',
    title: 'El Mercado Guasú y la numeración municipal',
    text: `Antes de instalarse en el barrio Pettirossi, el abasto mayorista de ${CITY} funcionaba en el predio
    que hoy ocupa la Plaza de la Democracia, en el centro de la ciudad. De allí viene el “Guasú” (grande en
    guaraní) y de allí también la costumbre de numerar los mercados municipales: el ${SHORT} recibió su
    número cuando la ciudad ya tenía los mercados 1, 2 y 3.`,
  },
  {
    year: '1942',
    title: 'La mudanza al barrio Pettirossi',
    text: `Durante el gobierno del general Higinio Morínigo se expropiaron terrenos baldíos del barrio
    Pettirossi y el mercado se trasladó a su ubicación actual. La mudanza no fue un hecho menor: cambió la
    geografía comercial de ${CITY} y terminó de consolidar el corredor de la Av. Silvio Pettirossi.`,
  },
  {
    year: 'Expansión',
    title: 'Una ciudad dentro de la ciudad',
    text: `Con las décadas el mercado desbordó su manzana original y absorbió sectores de los barrios San
    Roque, Ciudad Nueva y Pinozá. Hoy es un entramado de pasillos cubiertos, galerías y calles internas
    donde se calcula que trabajan miles de personas, entre puesteros, changadores, carretilleros y
    cocineras.`,
  },
  {
    year: 'Saber ancestral',
    title: 'Los yuyos: la huella guaraní',
    text: `El sector de yuyos y plantas medicinales es el corazón simbólico del mercado. Allí sobrevive una
    parte del saber botánico guaraní transmitido de generación en generación: haces de hierbas para el
    mate, para la digestión, para “el susto”, con nombres en guaraní y en castellano. Es patrimonio
    cultural inmaterial tanto como una actividad comercial.`,
  },
  {
    year: '2012',
    title: '«7 cajas» y la proyección internacional',
    text: `La película paraguaya «7 cajas», filmada en las inmediaciones del mercado, llevó los pasillos del
    ${SHORT} a festivales de todo el mundo y fijó en el imaginario colectivo una imagen del lugar: laberíntico,
    vertiginoso y profundamente humano.`,
  },
  {
    year: 'Dicho popular',
    title: '«Si no está en el Mercado 4, no existe»',
    text: `Es la frase que más se escucha en ${CITY}. El dicho refleja la lógica real del lugar: la
    superposición de rubros —alimentos, ropa, electrónica, hierbas, artesanías— hace que cualquier cosa, por
    rara que parezca, termine apareciendo en algún pasillo. Para el visitante es también la mejor definición
    de qué esperar.`,
  },
];

/* ------------------------------------------------------- DIVULGACIÓN (科普) */
export const scienceFacts = [
  {
    icon: '🌾',
    title: 'Los mercados de abasto son infraestructura crítica',
    text: `Un mercado como este no es solo un lugar de compras: es el nodo donde se conecta el campo con la
    ciudad. Buena parte de las frutas y verduras que se consumen en ${CITY} pasa por aquí en las horas
    previas al amanecer. Entenderlo así explica por qué el mejor momento para visitarlo es tan temprano.`,
  },
  {
    icon: '🌡️',
    title: 'Temperatura y seguridad de los alimentos',
    text: `Los alimentos perecederos se conservan mal entre 5 °C y 60 °C, el rango que los manuales de
    seguridad alimentaria llaman “zona de peligro”. En un mercado cálido, esa franja se alcanza rápido: de
    ahí la recomendación de comprar temprano, elegir puestos con rotación y refrigerar o consumir pronto lo
    que se compra.`,
  },
  {
    icon: '🌿',
    title: 'Etnobotánica: lo que los yuyos nos enseñan',
    text: `Los puestos de hierbas son una farmacia popular y a la vez un registro viviente de etnobotánica.
    Muchas de esas plantas se estudian por sus compuestos activos; muchas otras se usan por tradición oral.
    La postura responsable es la misma que en cualquier sistema de salud: no automedicarse y consultar a un
    profesional.`,
  },
  {
    icon: '🗣️',
    title: 'Guaraní, castellano y yopará',
    text: `El mercado es uno de los lugares donde mejor se escucha el bilingüismo paraguayo: el guaraní, el
    castellano y el yopará (la mezcla de ambos) conviven en la misma oración. Fijarse en los nombres de los
    puestos y en los pregones es una manera sencilla de escuchar esa mezcla en vivo.`,
  },
  {
    icon: '♻️',
    title: 'Residuos y economía circular',
    text: `Un mercado de este tamaño genera toneladas de residuos orgánicos por día. Buena parte termina en
    compost o en alimentación animal, pero la escala del problema explica por qué se insiste en llevar bolsa
    reutilizable y en no sumar plásticos de un solo uso al recorrido.`,
  },
  {
    icon: '🧱',
    title: 'Arquitectura informal y densidad',
    text: `El ${SHORT} no fue diseñado por un único plan: es el resultado de décadas de ampliaciones
    superpuestas. Esa ausencia de plan central es lo que produce su forma característica de laberinto y
    también sus problemas: ventilación escasa, sombra desigual y circulación complicada.`,
  },
];

/* ------------------------------------------------------- RESPONSABILIDAD */
export const responsibility = {
  do: [
    'Pedir permiso antes de fotografiar personas, puestos o mercadería.',
    'Llevar bolsa reutilizable y, si se puede, botella de agua propia.',
    'Pagar en efectivo con billetes pequeños: muchos puestos no aceptan tarjeta.',
    'Probar la comida en puestos con mucha rotación y cocción a la vista.',
    'Consultar a un profesional de la salud antes de usar hierbas medicinales.',
    'Comprar a quienes trabajan en el lugar: es comercio de subsistencia.',
  ],
  dont: [
    'No bloquear los pasillos: son vías de trabajo por donde circula mercadería.',
    'No automedicarse con productos de los puestos de yuyos.',
    'No exhibir cámaras, teléfonos ni billeteras en los tramos más apretados.',
    'No dejar residuos fuera de los puntos de recolección.',
    'No regatear de forma agresiva: los márgenes son muy estrechos.',
    'No ingresar con mochilas grandes: dificultan el paso y llaman la atención.',
  ],
  note: `Este sitio es una guía de divulgación sin fines comerciales. No recomienda comercios concretos, no
  cobra comisiones y no gestiona reservas: la información se ofrece como contexto para visitar el
  ${FULL} de forma informada y respetuosa.`,
};

export const PROFILE_FAMILY = itineraries[0].name;
export const PROFILE_PHOTO = itineraries[1].name;
export const PROFILE_ACCESSIBLE = itineraries[2].name;
