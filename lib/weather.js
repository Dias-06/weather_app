// Работа с внешним API Open-Meteo (https://open-meteo.com). Ключ не нужен.

const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

export async function findCity(name) {
  const url = `${GEO_URL}?name=${encodeURIComponent(name)}&count=1&language=ru`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Не удалось связаться с сервисом поиска городов");

  const data = await res.json();
  if (!data.results || data.results.length === 0) {
    throw new Error(`Город «${name}» не найден`);
  }

  const { name: cityName, country, latitude, longitude } = data.results[0];
  return { name: cityName, country, latitude, longitude };
}

export async function getForecast(latitude, longitude) {
  const params = new URLSearchParams({
    latitude,
    longitude,
    current: "temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    timezone: "auto",
  });

  const res = await fetch(`${FORECAST_URL}?${params}`);
  if (!res.ok) throw new Error("Не удалось получить прогноз погоды");
  return res.json();
}

export function describeWeather(code) {
  if (code === 0) return { text: "Ясно", icon: "☀️" };
  if (code <= 2) return { text: "Малооблачно", icon: "🌤️" };
  if (code === 3) return { text: "Облачно", icon: "☁️" };
  if (code <= 48) return { text: "Туман", icon: "🌫️" };
  if (code <= 57) return { text: "Морось", icon: "🌦️" };
  if (code <= 67) return { text: "Дождь", icon: "🌧️" };
  if (code <= 77) return { text: "Снег", icon: "❄️" };
  if (code <= 82) return { text: "Ливень", icon: "🌧️" };
  if (code <= 86) return { text: "Снегопад", icon: "🌨️" };
  return { text: "Гроза", icon: "⛈️" };
}
