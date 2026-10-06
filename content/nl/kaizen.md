---
title: 'Hoe Kaizen gebouwd is'
description: 'Kaizen is een Pomodoro-timer met Focus Rooms zonder camera, voor iOS, Android, het web en Windows, gebouwd en beheerd door één developer. Hoe het in elkaar zit, inclusief een release die misging.'
---

## Hoe het begon

In 2022 ging ik meehelpen met de Discord-community van Cajun Koi Academy, het studiekanaal van YouTubers Mike en Matty. Een jaar later bouwde ik Cody, een bot voor die server met een Pomodoro-timer, studietijd bijhouden en ranglijsten. Je zag dat mensen beter focusten als er iemand anders bij was, en uit dat idee kwamen de Focus Rooms van Kaizen voort.

Toen de oprichters van de community er in 2025 mee stopten, droegen ze de community aan mij over, en ik gaf die de naam Kaizen. In september 2025 begon ik aan de app, met een hackathon in mijn minor als laatste duwtje. De eerste Android-alpha ging op 26 september naar testers, in november volgden testers op de iPhone, en versie 3.0 verscheen op 2 januari 2026 in Google Play. Op die eerste dag meldden zich zo’n 350 mensen aan.

## Eén codebase, vier platforms

Kaizen is één Expo-app: React Native 0.86, React 19 en TypeScript in strict mode. Dezelfde code draait native op iOS en Android, en via React Native for Web als installeerbare webapp. De Windows-versie verpakt die webbuild in Tauri 2, een kleine Rust-shell die een tray-icoon, systeemmeldingen en onthouden vensterposities toevoegt, als MSIX voor de Microsoft Store.

Een uitnodigingslink naar een room opent op elk platform de geïnstalleerde app: via universal links op iOS, app links op Android en een App URI Handler op Windows. Wie de app niet heeft, komt in de webapp terecht.

## Focus Rooms, zonder camera

Veel tools voor body doubling zetten je op video. Een enquête uit 2024 onder 220 mensen, de meesten neurodivergent, merkt op dat videogesprekken sociale angst kunnen oproepen.[^eagle] Focus Rooms houden de aanwezigheid en laten de camera weg: je ziet wie er focust, wie pauze heeft en wie even weg is, plus het label waaronder iemand werkt.

Aanwezigheid wordt elke 15 seconden opgehaald. Er is geen realtime kanaal. De timer van elk lid loopt op het apparaat zelf af vanaf een eindtijd die aan de serverklok vastzit. Zo blijft hij tussen twee updates soepel lopen zonder uit de pas te raken, en wie langer dan 45 seconden niets van zich laat horen, staat op Afwezig. In versie 4.0 heb ik de rooms herschreven, omdat mensen er per ongeluk uit vlogen: een telefoon op de achtergrond houdt zijn plek nu 15 minuten vast, eerst was dat 2.

## Apps blokkeren, native geschreven

Voor het blokkeren van afleidende apps heb je functies van het besturingssysteem nodig die geen bestaande library goed afdekt. De kandidaten die ik vond, waren een paar maanden oud met één maintainer, vroegen toestemming om alle geïnstalleerde apps te zien, of zaten vast op een oude Expo-versie. Dus schreef ik een eigen Expo-module met twee native helften.

Op Android leest een engine in Kotlin via gebruikstoegang welke app op de voorgrond staat en tekent daar een blokscherm overheen. Hij gebruikt nooit de toegankelijkheidsservice of de toestemming om alle geïnstalleerde apps op te vragen. Op de iPhone gebruikt de module Schermtijd van Apple: je kiest apps in Apples eigen kiezer en Kaizen krijgt alleen een token terug dat het zelf niet kan lezen, dus de app kan niet zien wat je koos. Drie app-extensies houden de blokkade gelijk over vier processen. Op beide platforms blijft de lijst met geblokkeerde apps op de telefoon.

## Een fout: versie 4.10.0

Apps blokkeren kwam uit in 4.10.0, op 17 september 2026, en op Android blokkeerde het helemaal niets. Releasebuilds worden met R8 verkleind, en zonder een `@OptimizedRecord`-annotatie kon Expo de instellingen voor de native module niet meer omzetten. Elke debugbuild werkte. Alleen de releasebuild faalde, en dan ook nog zonder foutmelding.

De fix, 4.10.1, was dezelfde dag klaar. Daarin zitten ook een R8-keep-regel als vangnet en een logregel die een lege configuratie meldt. Google Play deed er zo’n 24 uur over om die goed te keuren, dus een volle dag lang deed de functie waarvoor Android-gebruikers net hadden geüpdatet het niet. Expo heeft de onderliggende oorzaak inmiddels opgelost in expo-modules-core 58.

## Synchronisatie die offline werkt

Elke wijziging komt eerst op het apparaat terecht en synchroniseert op de achtergrond met Supabase. Items krijgen hun ID op het apparaat, bij een conflict wint de nieuwste `updated_at`, en verwijderingen worden vastgelegd als tombstones, zodat een ander apparaat een verwijderde taak niet terug kan halen. Tussen volledige synchronisaties door haalt een apparaat alleen op wat er sinds het laatste controlepunt veranderd is.

Afgevinkte gewoontes krijgen een ID dat is afgeleid van de gewoonte en de dag. Twee telefoons die offline dezelfde gewoonte afvinken, eindigen zo met één record in plaats van twee.

## Testen

De app heeft honderden testbestanden. Pure logica, zoals het samenvoegen bij synchronisatie en de statistieken, krijgt naast gewone voorbeelden ook property-based tests met fast-check. Daarna past Stryker die code op kleine punten aan en controleert of de tests dat opmerken. De CI faalt als die mutation score onder de 80 procent zakt. Typechecks, linting, opmaak, de testsuite en een controle van de handtekening van elk npm-pakket draaien bij elke push naar de hoofdbranches.

## Rond de app

Naast de app draait een beheerpaneel: een Vue 3-app met TanStack Query die aanmeldingen, retentiecohorten en een markering voor elke grotere release in de grafieken laat zien. Nieuwe timerachtergronden worden in de browser met WebAssembly naar WebP omgezet, en videoloops worden met WebCodecs gecontroleerd voordat ze worden geüpload.

De storepagina’s voor drie stores in zeven talen staan in een eigen repository, met scripts die elke veldlimiet bewaken en nagaan of elke vertaling dezelfde opbouw heeft als het Engelse origineel. De website, [my-kaizen.com](https://my-kaizen.com), is gebouwd met Nuxt 4 en heeft uitgebreide artikelen met bronvermelding. En de Discord-server, met zo’n 30.000 leden, heeft forums voor bugmeldingen en ideeën.

## Wat de cijfers zeggen

September 2026 was de grootste maand van Kaizen tot nu toe:

::stat-row
---
items:
  - value: '1.500'
    label: nieuwe aanmeldingen, een kwart van het totaal
  - value: '750'
    label: mensen actief die maand, zo’n 350 per week
  - value: '6.200'
    label: uur focus in die ene maand
---
::

Twee beslissingen springen eruit. Toen taken en het meedoen aan openbare rooms in maart gratis werden, verdubbelde het aantal aanmeldingen per week ongeveer. Met de lancering in zeven talen in april steeg daarna het deel van de nieuwe gebruikers dat de app echt ging gebruiken, dat voorjaar van zo’n 23 naar zo’n 43 procent. Van het voorjaar tot september is het aantal nieuwe gebruikers dat elke week echt begint ongeveer verdrievoudigd. De volgende uitdaging is de tweede week: ongeveer een op de zeven nieuwe gebruikers komt terug.

## Wat ik anders zou doen

- **Meteen vertalen.** De activatie sprong omhoog toen er zeven talen bij kwamen, drie maanden na de lancering.
- **Eerder een library voor serverstate.** Het ophalen van data in de synchronisatielaag is zelfgebouwd, en TanStack Query staat gepland als vervanger.
- **De releasebuild op een echte telefoon testen voordat hij uitgaat.** Bij 4.10.0 werkte elke debugbuild; alleen de releasebuild was stuk.

[^eagle]: Eagle, T., Baltaxe-Admony, L. B. en Ringland, K. E. (2024). [“It Was Something I Naturally Found Worked and Heard About Later”: An Investigation of Body Doubling with Neurodivergent Participants.]{lang="en"} ACM Transactions on Accessible Computing, 17(3). [doi.org/10.1145/3689648](https://doi.org/10.1145/3689648)
