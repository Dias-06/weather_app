"use client";

import { useEffect, useState } from "react";
import { findCity, getForecast, describeWeather } from "../lib/weather";

export default function Home() {
  const [query, setQuery] = useState("Лондон");
  const [city, setCity] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function search(name) {
    setLoading(true);
    setError("");
    try {
      const found = await findCity(name);
      const data = await getForecast(found.latitude, found.longitude);
      setCity(found);
      setForecast(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    search("Лондон");
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (query.trim()) search(query.trim());
  }

  const current = forecast?.current;
  const now = current ? describeWeather(current.weather_code) : null;

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Введите город"
          aria-label="Город"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Ищу..." : "Найти"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {city && current && !error && (
        <>
          <section className="now">
            <div className="icon">{now.icon}</div>
            <div>
              <h1>
                {city.name}
                <span>{city.country}</span>
              </h1>
              <p className="temp">{Math.round(current.temperature_2m)}°</p>
              <p>
                {now.text}, ощущается как {Math.round(current.apparent_temperature)}°
              </p>
              <p className="muted">
                Влажность {current.relative_humidity_2m}% · Ветер {current.wind_speed_10m} км/ч
              </p>
            </div>
          </section>

          <section className="days">
            {forecast.daily.time.map((date, i) => {
              const day = describeWeather(forecast.daily.weather_code[i]);
              const label = new Date(date + "T00:00").toLocaleDateString("ru-RU", {
                weekday: "short",
                day: "numeric",
              });
              return (
                <div className="day" key={date}>
                  <span>{label}</span>
                  <span className="day-icon" title={day.text}>{day.icon}</span>
                  <span>
                    {Math.round(forecast.daily.temperature_2m_max[i])}°
                    <span className="muted"> / {Math.round(forecast.daily.temperature_2m_min[i])}°</span>
                  </span>
                </div>
              );
            })}
          </section>
        </>
      )}
    </main>
  );
}
