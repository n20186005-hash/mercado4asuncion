// Obtención del pronóstico meteorológico para las coordenadas del mercado.
// Se ejecuta en el servidor (frontmatter de Astro) y se complementa con una
// actualización en el cliente para que los datos mostrados sean del momento.

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
  53: { label: 'Llovizna moderada', icon: '🌦️', group: 'lluvia' },
  55: { label: 'Llovizna intensa', icon: '🌧️', group: 'lluvia' },
  56: { label: 'Llovizna helada', icon: '🌧️', group: 'lluvia' },
  57: { label: 'Llovizna helada intensa', icon: '🌧️', group: 'lluvia' },
  61: { label: 'Lluvia ligera', icon: '🌦️', group: 'lluvia' },
  63: { label: 'Lluvia moderada', icon: '🌧️', group: 'lluvia' },
  65: { label: 'Lluvia intensa', icon: '🌧️', group: 'lluvia' },
  66: { label: 'Lluvia helada', icon: '🌧️', group: 'lluvia' },
  67: { label: 'Lluvia helada intensa', icon: '🌧️', group: 'lluvia' },
  71: { label: 'Nevada ligera', icon: '🌨️', group: 'nieve' },
  73: { label: 'Nevada moderada', icon: '🌨️', group: 'nieve' },
  75: { label: 'Nevada intensa', icon: '❄️', group: 'nieve' },
  77: { label: 'Granos de nieve', icon: '🌨️', group: 'nieve' },
  80: { label: 'Chubascos ligeros', icon: '🌦️', group: 'lluvia' },
  81: { label: 'Chubascos moderados', icon: '🌧️', group: 'lluvia' },
  82: { label: 'Chubascos intensos', icon: '🌧️', group: 'lluvia' },
  85: { label: 'Chubascos de nieve', icon: '🌨️', group: 'nieve' },
  86: { label: 'Chubascos de nieve intensos', icon: '❄️', group: 'nieve' },
  95: { label: 'Tormenta', icon: '⛈️', group: 'tormenta' },
  96: { label: 'Tormenta con granizo', icon: '⛈️', group: 'tormenta' },
  99: { label: 'Tormenta con granizo intenso', icon: '⛈️', group: 'tormenta' },
};

export function describeCode(code: number | null | undefined) {
  if (code === null || code === undefined) {
    return { label: 'Sin datos', icon: '🌡️', group: 'nubes' };
  }
  return WMO[code] ?? { label: 'Condiciones variables', icon: '🌡️', group: 'nubes' };
}

/** Breve recomendación de "qué llevar" según el pronóstico del día. */
export function dailyAdvice(day: WeatherDay): string {
  const pop = day.precipitationProbability ?? 0;
  const tMax = day.tMax ?? 0;
  const uv = day.uvIndex ?? 0;
  const group = describeCode(day.weatherCode).group;

  if (group === 'tormenta') return 'Tormentas previstas: mejor visitar temprano y con plan bajo techo.';
  if (pop >= 60 || (day.precipitation ?? 0) >= 5) return 'Llevá paraguas o piloto: chance alta de lluvia.';
  if (pop >= 30) return 'Paraguas plegable en la mochila, por las dudas.';
  if (tMax >= 34) return 'Día muy caluroso: gorra, agua y evitar el mediodía.';
  if (uv >= 8) return 'Radiación UV muy alta: protector solar y sombrero.';
  if (tMax >= 28) return 'Calor húmedo: ropa ligera y agua.';
  if (tMax <= 12) return 'Mañana fresca: una campera liviana viene bien.';
  return 'Condiciones cómodas para recorrer a pie.';
}

/** Recomendación general para el momento actual. */
export function umbrellaHint(current: WeatherCurrent | null, days: WeatherDay[]): string {
  if (!current && days.length === 0) return 'Pronóstico no disponible en este momento.';
  const today = days[0];
  const pop = today?.precipitationProbability ?? 0;
  const group = describeCode(current?.weatherCode ?? today?.weatherCode).group;

  if (group === 'tormenta') return 'Sí: hay tormentas en la zona. Llevá paraguas y calzado cerrado.';
  if (pop >= 60) return 'Sí: la probabilidad de lluvia de hoy es alta. Paraguas recomendado.';
  if (pop >= 30) return 'Probable: lluvia dispersa durante el día. Paraguas plegable, por las dudas.';
  if ((current?.temperature ?? today?.tMax ?? 0) >= 33) {
    return 'Sin lluvia, pero hace mucho calor: gorra, agua y parar a la sombra.';
  }
  return 'No haría falta paraguas hoy: alcanza con ropa ligera y agua.';
}

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
