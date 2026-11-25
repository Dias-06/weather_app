# Погода на Next.js

Приложение показывает текущую погоду и прогноз на 7 дней для любого города.
Данные берутся из бесплатного внешнего API [Open-Meteo](https://open-meteo.com), ключ не нужен.

Как это работает:

1. Название города отправляется в Geocoding API, оно возвращает координаты.
2. Координаты отправляются в Forecast API, оно возвращает погоду.

Весь код работы с API лежит в `lib/weather.js`, страница — в `app/page.js`.

## Открыть сразу в браузере

Замени `ТВОЙ_ЛОГИН` и `НАЗВАНИЕ_РЕПО` на свои:

- StackBlitz: https://stackblitz.com/github/ТВОЙ_ЛОГИН/НАЗВАНИЕ_РЕПО
- GitHub Codespaces: **Code → Codespaces → Create codespace**, затем `npm install && npm run dev`

## Запуск на компьютере

```bash
npm install
npm run dev
```

Открой http://localhost:3000
