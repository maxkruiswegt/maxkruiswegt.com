---
title: 'Meteo Zandvoort'
description: 'Een live weerdashboard voor Zandvoort.'
images:
  - /images/meteozandvoort/Banner.webp
  - /images/meteozandvoort/Banner2.webp
---

Welkom bij Meteo Zandvoort, een live weerdashboard voor Zandvoort! Dit project toont real-time metingen van het persoonlijke Davis-weerstation van Herman Kruiswegt, waaronder wind, temperatuur, neerslag en luchtdruk. De applicatie is gebouwd met Vue 3, TypeScript en Vite, met een op maat gemaakt donker ontwerp waarmee je het weer in één oogopslag afleest.

Verken de live applicatie op [meteozandvoort.nl](https://meteozandvoort.nl).

## ✨ Functies

- 🌡️ **Huidige Omstandigheden**: Een grote temperatuurweergave met gevoelstemperatuur en het 24-uurs minimum en maximum.
- 🧭 **Windkompas**: Live windrichting, -snelheid en -stoten, met de windkracht op de schaal van Beaufort (KNMI-conventie).
- 📈 **24-uurs Meteogrammen**: Interactieve grafieken voor temperatuur, luchtvochtigheid, neerslag, luchtdruk en wind, inclusief markeringen voor zonsopkomst en zonsondergang.
- 🌅 **Zontijden**: Zonsopkomst en zonsondergang voor Zandvoort, astronomisch berekend in de browser.
- 🏖️ **Live Beachcam**: Een ingebedde livestream van het strand van Zandvoort.
- 📅 **Historische Data**: Kies een dag, blader door de kwartierarchieven en exporteer naar CSV.
- 🔍 **Ruwe Data**: Elk sensorveld, zowel ruw als geformatteerd.
- ⏱️ **Automatisch Verversen**: Elke minuut nieuwe metingen, automatisch gepauzeerd zolang het tabblad verborgen is.
- 📱 **Responsief Ontwerp**: Geoptimaliseerd voor zowel desktop- als mobiele apparaten.

## ⚙️ Backend

De backend API is gehost op `api.meteozandvoort.nl` en fungeert als een reverse proxy naar de API van WeatherLink. Het haalt real-time gegevens rechtstreeks op van het weerstation van Herman Kruiswegt. De backend biedt twee hoofdendpoints:

- `/current`: Haalt de huidige weergegevens op.
- `/historic`: Haalt historische weergegevens op.

Deze endpoints stellen de frontend in staat om naadloos actuele en historische weerinformatie weer te geven.

## 📂 GitHub Repository

Geïnteresseerd in de code? Bekijk de bron op GitHub: [maxkruiswegt/meteozandvoort.nl](https://github.com/maxkruiswegt/meteozandvoort.nl).
