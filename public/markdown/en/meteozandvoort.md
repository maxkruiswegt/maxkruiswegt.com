#### 📜 Project Overview

Welcome to Meteo Zandvoort, a weather monitoring web application for Zandvoort! This project provides real-time weather data, including wind speeds, temperature, and other meteorological information, fetched directly from Herman Kruiswegt's weather station. The application is built using Vue 3 and Vite, ensuring a fast and modern user experience.

&nbsp;

Explore the live application at [meteozandvoort.nl](https://meteozandvoort.nl).

&nbsp;

#### 🌟 Features

- 🌬️ **Real-time Wind Data**: View current wind speed, direction, and force.
- 📊 **Historical Wind Data**: Access average and maximum wind data over different time spans.
- 🌡️ **Temperature Data**: View current temperature, feels-like temperature, and dew point.
- ☔ **Rain Data**: Monitor current rain intensity and daily rainfall.
- 💧 **Humidity Data**: Check the current humidity levels.
- 📈 **Barometric Pressure**: View current barometric pressure and its trend over the last 3 hours.
- ⏱️ **Frequent Updates**: Get updated weather information every minute.
- 📱 **Responsive Design**: Optimized for both desktop and mobile devices.

&nbsp;

#### ⚙️ Backend

The backend API is hosted at `api.meteozandvoort.nl` and acts as a reverse proxy to WeatherLink's API. It fetches real-time data directly from Herman Kruiswegt's weather station. The backend provides two main endpoints:

- `/current`: Fetches the current weather data.
- `/historic`: Fetches historical weather data.

These endpoints allow the frontend to display up-to-date and historical weather information seamlessly.

&nbsp;

#### 📂 GitHub Repository

Interested in the code? Check out the source on GitHub: [ItsMaxDev/meteozandvoort.nl](https://github.com/ItsMaxDev/meteozandvoort.nl).
