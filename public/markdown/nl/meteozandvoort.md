#### 📜 Projectoverzicht

Welkom bij Meteo Zandvoort, een weer website voor Zandvoort! Dit project biedt real-time weergegevens, waaronder windsnelheden, temperatuur en andere meteorologische informatie, rechtstreeks opgehaald van het weerstation van Herman Kruiswegt. De applicatie is gebouwd met Vue 3 en Vite, wat zorgt voor een snelle en moderne gebruikerservaring.

&nbsp;

Verken de live applicatie op [meteozandvoort.nl](https://meteozandvoort.nl).

&nbsp;

#### 🌟 Features

- 🌬️ **Real-time Windgegevens**: Bekijk de huidige windsnelheid, richting en kracht.
- 📊 **Historische Windgegevens**: Toegang tot gemiddelde en maximale windgegevens over verschillende tijdsperioden.
- 🌡️ **Temperatuurgegevens**: Bekijk de huidige temperatuur, gevoelstemperatuur en dauwpunt.
- ☔ **Regengegevens**: Monitor de huidige regenintensiteit en dagelijkse neerslag.
- 💧 **Vochtigheidsgegevens**: Controleer de huidige luchtvochtigheid.
- 📈 **Barometrische Druk**: Bekijk de huidige luchtdruk en de trend van de afgelopen 3 uur.
- ⏱️ **Frequente Updates**: Ontvang elke minuut bijgewerkte weerinformatie.
- 📱 **Responsief Ontwerp**: Geoptimaliseerd voor zowel desktop- als mobiele apparaten.

&nbsp;

#### ⚙️ Backend

De backend API is gehost op `api.meteozandvoort.nl` en fungeert als een reverse proxy naar de API van WeatherLink. Het haalt real-time gegevens rechtstreeks op van het weerstation van Herman Kruiswegt. De backend biedt twee hoofdendpoints:

- `/current`: Haalt de huidige weergegevens op.
- `/historic`: Haalt historische weergegevens op.

Deze endpoints stellen de frontend in staat om naadloos actuele en historische weerinformatie weer te geven.

&nbsp;

#### 📂 GitHub Repository

Geïnteresseerd in de code? Bekijk de bron op GitHub: [maxkruiswegt/meteozandvoort.nl](https://github.com/maxkruiswegt/meteozandvoort.nl).
