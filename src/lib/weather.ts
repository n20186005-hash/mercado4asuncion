// Datos y lógica del módulo de clima.
// La información se obtiene en el servidor (frontmatter de Astro) y se vuelve a
// consultar desde el navegador al abrir la página, de modo que los valores
// mostrados correspondan al momento de la visita.

export interface WeatherCurrent {
  temperature: number | null;
  apparentTemperature: number | null;
  humidity: number | null;
  windSpeed: number | null;
  precipitation: number | null;
  weatherCode: number | null;
  isDay: boolean;
  time: string | null;
}

export interface WeatherDay {
  date: string;
  weatherCode: number | null;
  tMax: number | null;
  tMin: number | null;
  precipitation: number | null;
  precipitationProbability: number | null;
  uvIndex: number | null;
}

export interface WeatherPayload {
  current: WeatherCurrent | null;
  days: WeatherDay[];
  timezone: string;
  fetchedAt: string;
}

/** Recomendaciones agrupadas: se muestran solo los bloques que aplican. */
export interface AdviceBundle {
  risks: string[];
  outfit: string[];
  plan: string[];
  gear: string[];
}

interface OpenMeteoResponse {
  timezone?: string;
  current?: Record<string, number | string | null>;
  daily?: {
    time?: string[];
    weather_code?: (number | null)[];
    temperature_2m_max?: (number | null)[];
    temperature_2m_min?: (number | null)[];
    precipitation_sum?: (number | null)[];
    precipitation_probability_max?: (number | null)[];
    uv_index_max?: (number | null)[];
  };
}

const WMO: Record<number, { label: string; icon: string; group: string }> = {
  0: { label: 'Despejado', icon: '☀️', group: 'soleado' },
  1: { label: 'Mayormente despejado', icon: '🌤️', group: 'soleado' },
  2: { label: 'Parcialmente nublado', icon: '⛅', group: 'nubes' },
  3: { label: 'Nublado', icon: '☁️', group: 'nubes' },
  45: { label: 'Niebla', icon: '🌫️', group: 'niebla' },
  48: { label: 'Niebla con escarcha', icon: '🌫️', group: 'niebla' },
  51: { label: 'Llovizna ligera', icon: '🌦️', group: 'lluvia' },
  53: { label: 'Llovizna', icon: '🌦️', group: 'lluvia' },
  55: { label: 'Llovizna intensa', icon: '🌧️', group: 'lluvia' },
  56: { label: 'Llovizna helada', icon: '🌧️', group: 'lluvia' },
  57: { label: 'Llovizna helada intensa', icon: '🌧️', group: 'lluvia' },
  61: { label: 'Lluvia ligera', icon: '🌦️', group: 'lluvia' },
  63: { label: 'Lluvia', icon: '🌧️', group: 'lluvia' },
  65: { label: 'Lluvia intensa', icon: '🌧️', group: 'lluvia' },
  66: { label: 'Lluvia helada', icon: '🌧️', group: 'lluvia' },
  67: { label: 'Lluvia helada intensa', icon: '🌧️', group: 'lluvia' },
  71: { label: 'Nevada ligera', icon: '🌨️', group: 'nieve' },
  73: { label: 'Nevada', icon: '🌨️', group: 'nieve' },
  75: { label: 'Nevada intensa', icon: '❄️', group: 'nieve' },
  77: { label: 'Granos de nieve', icon: '🌨️', group: 'nieve' },
  80: { label: 'Chubascos ligeros', icon: '🌦️', group: 'lluvia' },
  81: { label: 'Chubascos', icon: '🌧️', group: 'lluvia' },
  82: { label: 'Chubascos intensos', icon: '🌧️', group: 'lluvia' },
  85: { label: 'Chubascos de nieve', icon: '🌨️', group: 'nieve' },
  86: { label: 'Chubascos de nieve intensos', icon: '❄️', group: 'nieve' },
  95: { label: 'Tormenta', icon: '⛈️', group: 'tormenta' },
  96: { label: 'Tormenta con granizo', icon: '⛈️', group: 'tormenta' },
  99: { label: 'Tormenta con granizo intenso', icon: '⛈️', group: 'tormenta' },
};

/** Códigos de lluvia de intensidad media a fuerte. */
const HEAVY_CODES = new Set([55, 57, 65, 67, 81, 82]);

export function describeCode(code: number | null | undefined) {
  if (code === null || code === undefined) {
    return { label: 'Sin datos', icon: '🌡️', group: 'nubes' };
  }
  return WMO[code] ?? { label: 'Condiciones variables', icon: '🌡️', group: 'nubes' };
}

/* ------------------------------------------------------------- Formateo */

const DAY_NAMES_ES = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

export function formatDayLabel(isoDate: string): string {
  const d = new Date(`${isoDate}T12:00:00`);
  if (Number.isNaN(d.getTime())) return isoDate;
  return `${DAY_NAMES_ES[d.getDay()]} ${d.getDate()}/${d.getMonth() + 1}`;
}

export function formatTime(iso: string | null | undefined): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleTimeString('es-PY', { hour: '2-digit', minute: '2-digit' });
}

/** Escala de viento en palabras, sin usar léxico técnico. */
export function windLabel(kmh: number | null | undefined): string {
  if (kmh === null || kmh === undefined) return '';
  if (kmh < 6) return 'sin viento';
  if (kmh < 20) return 'brisa leve';
  if (kmh < 39) return 'viento moderado';
  if (kmh < 50) return 'viento fuerte';
  return 'viento muy fuerte';
}

/** Nivel de radiación solar en palabras. */
export function uvLabel(uv: number | null | undefined): string {
  if (uv === null || uv === undefined) return '';
  if (uv < 3) return 'sol suave';
  if (uv < 6) return 'sol moderado';
  if (uv < 8) return 'sol fuerte';
  return 'sol muy fuerte';
}

/** Resumen de una línea: rango térmico, sol y viento. */
export function headline(current: WeatherCurrent | null, days: WeatherDay[]): string {
  const today = days[0];
  const parts: string[] = [];
  if (today?.tMin !== null && today?.tMin !== undefined && today?.tMax !== null && today?.tMax !== undefined) {
    parts.push(`hoy ${Math.round(today.tMin)}° – ${Math.round(today.tMax)}°`);
  }
  const uv = uvLabel(today?.uvIndex);
  if (uv) parts.push(uv);
  const wind = windLabel(current?.windSpeed);
  if (wind) parts.push(wind);
  return parts.join(' · ');
}

/* ------------------------------------------- Motor de recomendaciones */

/**
 * Traduce los datos meteorológicos en recomendaciones concretas para visitar
 * un mercado urbano a cielo semicubierto: qué ponerse, cómo organizar la
 * visita, qué llevar y si hay algún aviso que amerite cambiar de plan.
 */
export function buildAdvice(current: WeatherCurrent | null, days: WeatherDay[]): AdviceBundle {
  const risks: string[] = [];
  const outfit: string[] = [];
  const plan: string[] = [];
  const gear: string[] = [];

  const today = days[0] ?? null;
  const tMax = today?.tMax ?? current?.temperature ?? null;
  const tMin = today?.tMin ?? null;
  const pop = today?.precipitationProbability ?? 0;
  const uv = today?.uvIndex ?? null;
  const wind = current?.windSpeed ?? null;
  const humidity = current?.humidity ?? null;
  const apparent = current?.apparentTemperature ?? null;
  const temp = current?.temperature ?? null;
  const code = current?.weatherCode ?? today?.weatherCode ?? null;
  const group = describeCode(code).group;

  const wetGroup = group === 'lluvia' || group === 'tormenta';
  const rainIsHeavy = (code !== null && HEAVY_CODES.has(code)) || (today?.precipitation ?? 0) >= 8;
  const heavyRain = wetGroup && rainIsHeavy;
  const lightRain = group === 'lluvia' && !rainIsHeavy;
  const storm = group === 'tormenta';
  const windy = wind !== null && wind >= 39;
  const veryWindy = wind !== null && wind >= 50;
  const hot = tMax !== null && tMax >= 32;
  const range = tMax !== null && tMin !== null ? tMax - tMin : null;

  /* ---- Avisos que pueden cambiar el plan ---- */
  if (storm) {
    risks.push(
      'Tormentas previstas: no te refugies bajo árboles ni estructuras metálicas y evitá quedarte en zonas abiertas.'
    );
  }
  if (heavyRain) {
    risks.push('Lluvia fuerte prevista: los pasillos se inundan y el piso queda muy resbaladizo.');
  }
  if (veryWindy) {
    risks.push(
      'Viento muy fuerte: alejate de carteles, toldos y árboles, y tené cuidado con lo que se vuela de los puestos.'
    );
  }
  if (tMax !== null && tMax >= 40) {
    risks.push('Calor extremo: pasarse varias horas adentro del mercado con esta temperatura es un riesgo real.');
  }
  if (group === 'niebla') {
    risks.push('Niebla y poca visibilidad en los accesos: llegá con tiempo y con precaución si manejás.');
  }
  if (tMax !== null && tMax <= 10) {
    risks.push('Hace mucho frío para la ciudad: abrigate bien si vas a estar de pie mucho tiempo.');
  }

  /* ---- Qué ponerse ---- */
  if (hot) {
    outfit.push('Ropa ligera, suelta y de colores claros: hay poca sombra entre los puestos.');
  } else if (tMax !== null && tMax <= 10) {
    outfit.push('Abrigo de invierno: campera gruesa, gorro y guantes si salís temprano.');
  }
  if (range !== null && range > 8) {
    outfit.push('La mañana y la noche son muy distintas: vestite en capas para poder sacarte algo.');
  }
  if (storm || heavyRain || pop >= 60 || lightRain) {
    outfit.push('Calzado cerrado con suela que no patine: el piso de los pasillos se moja.');
  }
  if (windy) {
    outfit.push('Evitá sombreros sueltos y ropa muy holgada: con este viento se vuelan.');
  }
  if (outfit.length === 0) {
    outfit.push('Ropa cómoda para caminar: con la temperatura de hoy no hace falta nada especial.');
  }

  /* ---- Cómo organizar la visita ---- */
  if (storm) {
    plan.push('Conviene ir temprano y con un plan bajo techo: con tormenta el mercado se complica y cierran puestos.');
  } else if (heavyRain) {
    plan.push('Priorizá la mañana: la lluvia fuerte suele llegar por la tarde y los pasillos se vacían.');
  } else if (pop >= 60) {
    plan.push('Hay chances altas de lluvia: andá temprano y tené prevista una alternativa bajo techo.');
  } else if (lightRain) {
    plan.push('El mercado está techado en gran parte: se puede recorrer igual, con cuidado en el piso mojado.');
  }
  if (hot) {
    plan.push('Evitá el tramo de 12:00 a 15:00: es el pico de calor y el mercado queda más vacío.');
    if (humidity !== null && humidity >= 70) {
      plan.push('Entre los puestos el calor se concentra: pará a la sombra y tomá agua seguido.');
    }
  }
  if (apparent !== null && temp !== null && apparent - temp >= 3) {
    plan.push('La sensación es más alta que lo que marca el termómetro: el calor se siente más adentro.');
  }
  if (uv !== null && uv >= 5) {
    plan.push('El sol pega fuerte: aprovechá antes de las 10:00 o después de las 16:00.');
  }
  if (group === 'soleado') {
    plan.push('Buen día para recorrer: la luz de la mañana entre los puestos es ideal para sacar fotos.');
  } else if (group === 'nubes') {
    plan.push('Luz pareja y sin sol directo: muy buen día para recorrer tranquilo y fotografiar.');
  }
  if (plan.length === 0) {
    plan.push('Condiciones cómodas para recorrer a pie a cualquier hora de la mañana.');
  }

  /* ---- Qué llevar ---- */
  if (storm || heavyRain || pop >= 60 || lightRain) {
    gear.push(
      windy
        ? 'Piloto o campera impermeable: con este viento un paraguas no sirve'
        : 'Paraguas plegable en la mochila'
    );
  }
  if (uv !== null && uv >= 5) {
    gear.push('Protector solar, anteojos de sol y gorra');
  }
  if (hot) {
    gear.push('Botella de agua: vas a necesitar más de la que pensás');
  }
  if (humidity !== null && humidity >= 80 && tMax !== null && tMax >= 28) {
    gear.push('Toallitas y una remera de repuesto: con esta humedad se transpira mucho');
  }
  if (range !== null && range > 8) {
    gear.push('Una campera liviana para la vuelta');
  }
  if (tMax !== null && tMax <= 10) {
    gear.push('Campera gruesa, bufanda y guantes');
  }

  return { risks, outfit, plan, gear };
}

/** Consejo breve para cada tarjeta del pronóstico de los próximos días. */
export function dayTip(day: WeatherDay): string {
  const group = describeCode(day.weatherCode).group;
  const pop = day.precipitationProbability ?? 0;

  if (group === 'tormenta') return 'Tormentas: mejor visitar temprano.';
  if (group === 'lluvia' && (day.precipitation ?? 0) >= 8) return 'Lluvia fuerte: pasillos inundables.';
  if (pop >= 60) return 'Chances altas de lluvia: llevá paraguas.';
  if (pop >= 30 || group === 'lluvia') return 'Lluvia dispersa: paraguas chico, por las dudas.';
  if ((day.tMax ?? 0) >= 34) return 'Día muy caluroso: evitá el mediodía.';
  if ((day.uvIndex ?? 0) >= 8) return 'Sol muy fuerte: protector solar y gorra.';
  if ((day.tMax ?? 0) >= 28) return 'Calor húmedo: ropa ligera y agua.';
  if ((day.tMax ?? 0) <= 12) return 'Mañana fresca: llevá una campera liviana.';
  if (group === 'soleado') return 'Día ideal para recorrer y fotografiar.';
  return 'Condiciones cómodas para recorrer a pie.';
}

/**
 * Marcado de los bloques de recomendaciones. Se usa tanto en el servidor como
 * en el navegador para que ambas renders sean idénticas.
 */
export function renderAdviceHtml(a: AdviceBundle): string {
  const list = (items: string[]) => items.map((i) => `<li>${i}</li>`).join('');

  const block = (icon: string, label: string, items: string[]) =>
    items.length === 0
      ? ''
      : `<div class="wx__block">
           <h4 class="wx__block-title"><span aria-hidden="true">${icon}</span>${label}</h4>
           <ul>${list(items)}</ul>
         </div>`;

  const risk = a.risks.length
    ? `<div class="wx__risk" role="alert">
         <h4 class="wx__block-title"><span aria-hidden="true">⚠️</span>Aviso importante</h4>
         <ul>${list(a.risks)}</ul>
       </div>`
    : `<div class="wx__risk wx__risk--ok">
         <h4 class="wx__block-title"><span aria-hidden="true">✓</span>Sin avisos meteorológicos para hoy</h4>
       </div>`;

  return (
    risk +
    block('👕', 'Qué ponerte', a.outfit) +
    block('🗺️', 'Cómo organizar la visita', a.plan) +
    block('🎒', 'Qué llevar', a.gear)
  );
}

/**
 * Consulta el pronóstico para las coordenadas indicadas.
 * Devuelve `null` si el servicio no responde, para que la página se construya igual.
 */
export async function getWeather(
  latitude: number,
  longitude: number,
  timeoutMs = 8000
): Promise<WeatherPayload | null> {
  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.searchParams.set('latitude', String(latitude));
  url.searchParams.set('longitude', String(longitude));
  url.searchParams.set(
    'current',
    'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m'
  );
  url.searchParams.set(
    'daily',
    'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,uv_index_max'
  );
  url.searchParams.set('timezone', 'America/Asuncion');
  url.searchParams.set('forecast_days', '7');

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) return null;

    const data = (await response.json()) as OpenMeteoResponse;
    const daily = data.daily;
    const time = daily?.time ?? [];

    const days: WeatherDay[] = time.map((date, i) => ({
      date,
      weatherCode: daily?.weather_code?.[i] ?? null,
      tMax: daily?.temperature_2m_max?.[i] ?? null,
      tMin: daily?.temperature_2m_min?.[i] ?? null,
      precipitation: daily?.precipitation_sum?.[i] ?? null,
      precipitationProbability: daily?.precipitation_probability_max?.[i] ?? null,
      uvIndex: daily?.uv_index_max?.[i] ?? null,
    }));

    const c = data.current;
    const current: WeatherCurrent | null = c
      ? {
          temperature: typeof c.temperature_2m === 'number' ? c.temperature_2m : null,
          apparentTemperature:
            typeof c.apparent_temperature === 'number' ? c.apparent_temperature : null,
          humidity: typeof c.relative_humidity_2m === 'number' ? c.relative_humidity_2m : null,
          windSpeed: typeof c.wind_speed_10m === 'number' ? c.wind_speed_10m : null,
          precipitation: typeof c.precipitation === 'number' ? c.precipitation : null,
          weatherCode: typeof c.weather_code === 'number' ? c.weather_code : null,
          isDay: c.is_day === 1,
          time: typeof c.time === 'string' ? c.time : null,
        }
      : null;

    return {
      current,
      days,
      timezone: data.timezone ?? 'America/Asuncion',
      fetchedAt: new Date().toISOString(),
    };
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}
