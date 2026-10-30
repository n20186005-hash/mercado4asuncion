// Datos y lógica del módulo de clima.
// Open-Meteo (CC BY 4.0), consulted in the browser for fixed place coordinates.
// The static build does not publish a stale forecast as current conditions.

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
  /** Nombres de los avisos activos, para encabezar el bloque de riesgo. */
  alerts: string[];
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
    return { label: 'Sin datos', icon: '🌡️', group: 'sin-datos' };
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
  // Con lluvia o tormenta el nivel de sol no es lo que condiciona la visita.
  const wet = describeCode(current?.weatherCode ?? today?.weatherCode).group;
  const uv = wet === 'soleado' || wet === 'nubes' ? uvLabel(today?.uvIndex) : '';
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
 const alerts: string[]=[];const risks: string[]=[];const outfit: string[]=[];const plan: string[]=[];const gear: string[]=[];
 if (!current && !days.length) return {alerts,risks,outfit,plan,gear};
 const code=current?.weatherCode ?? days[0]?.weatherCode;
 if(code!=null&&code>=95){alerts.push('Posible tormenta');risks.push('Revisá avisos oficiales y reconsiderá el paseo al aire libre si hay tormenta.');}
 if((days[0]?.precipitationProbability??0)>=50)gear.push('Protección para lluvia y calzado con agarre, según las condiciones reales.');
 if((days[0]?.tMax??current?.temperature??0)>=30)gear.push('Agua para tu recorrido; no se han confirmado bebederos.');
 plan.push('Confirmá el horario y acceso del vendedor; el pronóstico no garantiza apertura ni seguridad.');
 return {alerts,risks,outfit,plan,gear};
}

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
         <h4 class="wx__block-title"><span aria-hidden="true">⚠️</span>Aviso de riesgo: ${a.alerts.join(' · ')}</h4>
         <p class="wx__risk-lead">Con este panorama conviene ajustar el itinerario y seguir de cerca cómo sigue el tiempo durante el día.</p>
         <ul>${list(a.risks)}</ul>
       </div>`
    : `<div class="wx__risk wx__risk--ok">
         <h4 class="wx__block-title"><span aria-hidden="true">✓</span>Sin avisos de riesgo para hoy</h4>
         <p class="wx__risk-lead">No hay condiciones que ameriten cambiar el plan: se puede recorrer con normalidad.</p>
       </div>`;

  return (
    risk +
    block('👕', 'Qué ponerse', a.outfit) +
    block('🗺️', 'Plan de visita', a.plan) +
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
