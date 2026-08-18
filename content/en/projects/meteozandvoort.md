---
title: 'Meteo Zandvoort'
description: 'A live weather dashboard for Zandvoort.'
images:
  - /images/meteozandvoort/Banner.webp
  - /images/meteozandvoort/Banner2.webp
---

Welcome to Meteo Zandvoort, a live weather dashboard for Zandvoort! This project shows real-time measurements from Herman Kruiswegt's personal Davis weather station, including wind, temperature, rainfall and barometric pressure. The application is built with Vue 3, TypeScript and Vite, with a custom dark design tailored to reading weather data at a glance.

Explore the live application at [meteozandvoort.nl](https://meteozandvoort.nl).

## ✨ Features

- 🌡️ **Current Conditions**: A large temperature readout with feels-like temperature and the 24-hour minimum and maximum.
- 🧭 **Wind Compass**: Live wind direction, speed and gusts, with the wind force on the Beaufort scale (KNMI convention).
- 📈 **24-hour Meteograms**: Interactive charts for temperature, humidity, rainfall, pressure and wind, including sunrise and sunset markers.
- 🌅 **Sun Times**: Sunrise and sunset for Zandvoort, computed astronomically on the client.
- 🏖️ **Live Beachcam**: An embedded livestream of the Zandvoort beach.
- 📅 **Historic Browser**: Pick any day, browse the 15-minute archive records and export them to CSV.
- 🔍 **Raw Data View**: Every sensor field, both raw and formatted.
- ⏱️ **Auto-refresh**: New measurements every minute, paused automatically while the tab is hidden.
- 📱 **Responsive Design**: Optimized for both desktop and mobile devices.

## ⚙️ Backend

The backend API is hosted at `api.meteozandvoort.nl` and acts as a reverse proxy to WeatherLink's API. It fetches real-time data directly from Herman Kruiswegt's weather station. The backend provides two main endpoints:

- `/current`: Fetches the current weather data.
- `/historic`: Fetches historical weather data.

These endpoints allow the frontend to display up-to-date and historical weather information seamlessly.

## 📂 GitHub Repository

Interested in the code? Check out the source on GitHub: [maxkruiswegt/meteozandvoort.nl](https://github.com/maxkruiswegt/meteozandvoort.nl).
