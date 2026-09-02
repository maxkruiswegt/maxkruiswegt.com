---
title: 'Kaizen'
description: 'Een cross-platform Pomodoro timer app met camera-vrije Focus Rooms.'
images:
  - /images/kaizen/Banner.webp
  - /images/kaizen/Banner2.webp
  - /images/kaizen/Banner3.webp
  - /images/kaizen/Banner4.webp
---

Kaizen is de Pomodoro timer app die ik sinds september 2025 in mijn eentje bouw. Het combineert persoonlijke productiviteit met sociale verantwoordelijkheid via camera-vrije Focus Rooms en draait op iOS, Android, Web en Windows vanuit één codebase. Meer dan 4.000 mensen hebben er samen ruim 16.500 uur focus mee gelogd. Lees [het verhaal erachter](https://my-kaizen.com/about), gebruik het in de browser op [my-kaizen.app](https://my-kaizen.app/), of download het op [Google Play](https://play.google.com/store/apps/details?id=com.maxkruiswegt.kaizen), de [App Store](https://apps.apple.com/app/id6755314708) of de [Microsoft Store](https://apps.microsoft.com/detail/9MV8DVZ52JQS).

## ⏱️ Pomodoro Timer

Vier presets standaard aanwezig (Classic 25/5/15, Quick 15/3/10, Extended 50/10/30, Long Focus 90/15/30) of alles tussen 5 en 180 minuten. Gebouwd op de systeemklok, dus hij blijft nauwkeurig met het scherm uit of de app op de achtergrond, en een sessie eindigt met geluid, trilling en een notificatie waaruit je de timer kunt bedienen. De immersieve modus verbergt alles behalve de wijzerplaat, en na een volledige cyclus laat de wijzerplaat een samenvatting zien van de sessies en minuten die je net deed.

<picture>
  <source media="(max-width: 767px)" srcset="/images/kaizen/Banner2-mobile.webp" />
  <img src="/images/kaizen/Banner2.webp" alt="Kaizen Pomodoro timer interface met een focussessie, LOFI geïllustreerd thema en voortgangsring" />
</picture>

## 🎨 Thema's

Meer dan 60 timerachtergronden in zes collecties: lofi-illustraties, natuurfotografie, stad, cozy, ruimte en minimaal, sommige als loopende video. Ze downloaden pas als je ze kiest, zodat de app klein installeert. Elke stilstaande achtergrond is gratis; Premium voegt de overige geanimeerde toe en laat je je eigen foto achter de timer zetten.

<picture>
  <source media="(max-width: 767px)" srcset="/images/kaizen/Banner3-mobile.webp" />
  <img src="/images/kaizen/Banner3.webp" alt="Kaizen themaselectie met LOFI geïllustreerde en natuurfotografie thema's" />
</picture>

## 🎵 Focusmuziek

Een ingebouwde bibliotheek met lo-fi, ambient, natuurgeluiden, witte ruis en klassieke muziek, na de eerste keer afspelen gecachet zodat het offline blijft werken. Volumeregeling, automatisch dempen tijdens pauzes en naadloos loopen.

<picture>
  <source media="(max-width: 767px)" srcset="/images/kaizen/Banner4-mobile.webp" />
  <img src="/images/kaizen/Banner4.webp" alt="Kaizen focusmuziek bibliotheek met verschillende muziekcategorieën" />
</picture>

## 👥 Focus Rooms

Samen studeren, ook als je apart bent. Focus Rooms brengen body doubling naar je telefoon zonder camera of microfoon: kamers van 2 tot 50 mensen waar iedereen zijn eigen timer draait en je live, seconde voor seconde, ziet wie focust, pauzeert of weg is. Een openbare kamer joinen is gratis. Hosts kunnen een kamer hernoemen, de zichtbaarheid of capaciteit aanpassen, een lid verwijderen of het hostschap overdragen, en leden zien elkaars focustag en huidige taak.

## ✅ Taken

Een Inbox van één regel vangt een gedachte op zonder je focus te breken, en je plant hem in To Do zodra je echt aan het plannen bent. Zet een taak vast, start de timer en Kaizen logt de minuten er automatisch op. Prioriteiten, vervaldatums met pushherinneringen, tot 25 subtaken en een tijdsinschatting per taak, bulkacties en een doorzoekbaar Logboek van alles wat je hebt afgerond. Tot 7 actieve taken gratis, onbeperkt met Premium.

## 🔁 Gewoontes

Afvink-gewoontes en focustijd-gewoontes die zichzelf voltooien vanuit je Pomodoro-minuten. Dagelijkse schema's, specifieke weekdagen of een aantal keer per week, vergevingsgezinde streaks die nooit breken op een rustdag of een skip, een consistentiepercentage met trendgrafiek, onbeperkt terugdateren en herinneringen op elke minuut van de dag. Vijf gewoontes gratis, onbeperkt met Premium.

## 📊 Statistieken & Streaks

Dagelijkse streaks met mijlpaalkleuren, focustijd per uur en per weekdag, je sessiemix, een verdeling per focustag (Werk, Studie, Persoonlijk en meer) en een volledige sessiegeschiedenis die je kunt hertaggen. Dertig dagen geschiedenis gratis, alles met Premium. Alles synchroniseert offline-first over je apparaten.

## 🌍 Overal

Eén codebase op iOS, Android, het web (installeerbaar als PWA, met sneltoetsen) en een native Windows-app uit de Microsoft Store, in zeven talen: Engels, Duits, Spaans, Frans, Italiaans, Portugees en Nederlands.

## 💻 Technologieën

- 📱 **React Native** met **Expo SDK 57** voor cross-platform mobiel en web ondersteuning
- ⚛️ **React 19** met **TypeScript** voor een moderne, type-safe codebase
- 🗄️ **Supabase** voor authenticatie, PostgreSQL database en edge functions
- 🪟 **Tauri** voor de native Windows desktop-app
- 💳 **RevenueCat** voor abonnementsbeheer over platforms heen
- 🛰️ **Sentry** voor crash- en foutmonitoring
- 🌐 **Nuxt** voor de statische marketingwebsite op [my-kaizen.com](https://my-kaizen.com/)
