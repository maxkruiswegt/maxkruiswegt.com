---
title: 'Vue Base Project'
description: 'Een productieklaar Vue 3 startersjabloon met een ingebouwde componentbibliotheek.'
images:
  - /images/vuebaseproject/Banner.webp
---

Een Vue 3 startersjabloon dat ik heb gebouwd om nieuwe projecten te versnellen. In plaats van elke keer dezelfde boilerplate op te zetten, komt dit sjabloon met een volledige componentbibliotheek, authenticatie, theming, i18n en API-laag kant-en-klaar. Kloon het en begin met bouwen. Bekijk de [live component showcase](https://vue-base.maxkruiswegt.com/showcase).

## 🧩 Formuliercomponenten

Een complete set formulierinvoer, allemaal met validatie via Vee-validate en Zod:

- 📝 **TextField** - Tekstinvoer met pictogramslots, wachtwoordmodus en zichtbaarheidswisseling
- 📄 **TextArea** - Meerregelige invoer met aanpasbare grootte
- 📋 **SelectField** - Doorzoekbare, wisbare dropdown met multi-select ondersteuning
- 📅 **DateField** - Datumkiezer met formaatopties en tijdselectie
- 🎚️ **RangeField** - Schuifregelaar voor numerieke bereiken met tooltip
- ✅ **CheckboxField**, **SwitchField** en **RadioButtons** voor boolean- en keuzeinvoer

## 🖼️ UI-componenten

- 🔘 **BaseButton** - Meerdere stijlen (primary, secondary, text, danger, success) met pictogramondersteuning en omrande variant
- 💬 **BaseModal** - Dialoogcomponent met aanpasbare grootte en footer slots
- 🔔 **BaseToast** - Notificatiesysteem met info-, succes-, waarschuwings- en fouttypen
- ⏳ **LoadingSpinner** - Laadindicator met overlay-modus

## 📖 Component Showcase

Het sjabloon bevat 13 showcasepagina's die dienen als levende documentatie. Elk component heeft een eigen pagina die de functies, props en gebruikspatronen demonstreert.

## 🎨 Theming & Styling

Een volledig op CSS-variabelen gebaseerd ontwerpsysteem met donkere en lichte modus. Bevat een compleet kleurenpalet met 10-staps tint- en schaduwschalen voor primaire, secundaire en accentkleuren. Mobile-first responsieve layout met breakpoints, consistente typografie op basis van een Perfect Fourth schaal, en een noise-textuuroverlay voor visuele diepte.

## 🔐 Authenticatie

Ingebouwde JWT-authenticatie met inloggen, registratie, beveiligde routes, automatische token-verversing en gebruikersprofielbeheer.

## 💻 Technologieën

- ⚡ **Vue 3** met **TypeScript** en `<script setup>` syntax
- ⚙️ **Vite 6** voor snelle ontwikkeling en geoptimaliseerde builds
- 🗄️ **Pinia** voor state management
- 🌐 **Vue I18n** voor Engelse/Nederlandse taalondersteuning
- ✅ **Vee-validate** + **Zod** voor type-veilige formuliervalidatie
- 📡 **Axios** met request/response interceptors
- 🔣 **Material Symbols** via unplugin-icons
