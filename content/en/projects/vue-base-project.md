---
title: 'Vue Base Project'
description: 'A production-ready Vue 3 starter template with a built-in component library.'
images:
  - /images/vuebaseproject/Banner.webp
---

A Vue 3 starter template I built to accelerate new projects. Instead of setting up the same boilerplate every time, this template comes with a full component library, authentication flow, theming, i18n, and API layer ready to go. Clone it, and start building. Browse the [live component showcase](https://vue-base.maxkruiswegt.com/showcase).

## 🧩 Form Components

A complete set of form inputs, all with validation support via Vee-validate and Zod:

- 📝 **TextField** - Text input with icon slots, password mode, and visibility toggle
- 📄 **TextArea** - Multi-line input with resize control
- 📋 **SelectField** - Searchable, clearable dropdown with multi-select support
- 📅 **DateField** - Date picker with format options and time selection
- 🎚️ **RangeField** - Slider for numerical ranges with tooltip
- ✅ **CheckboxField**, **SwitchField**, and **RadioButtons** for boolean and choice inputs

## 🖼️ UI Components

- 🔘 **BaseButton** - Multiple styles (primary, secondary, text, danger, success) with icon support and bordered variant
- 💬 **BaseModal** - Dialog component with customizable size and footer slots
- 🔔 **BaseToast** - Notification system with info, success, warning, and error types
- ⏳ **LoadingSpinner** - Loading indicator with overlay mode

## 📖 Component Showcase

The template includes 13 showcase pages that serve as living documentation. Each component has a dedicated page demonstrating its features, props, and usage patterns.

## 🎨 Theming & Styling

A complete CSS variable-based design system with dark and light mode. Includes a full color palette with 10-step tint and shade scales for primary, secondary, and accent colors. Mobile-first responsive layout with breakpoints, consistent typography using a Perfect Fourth scale, and a noise texture overlay for visual depth.

## 🔐 Authentication

Built-in JWT authentication flow with login, registration, protected routes, automatic token refresh, and user profile management.

## 💻 Technologies

- ⚡ **Vue 3** with **TypeScript** and `<script setup>` syntax
- ⚙️ **Vite 6** for fast development and optimized builds
- 🗄️ **Pinia** for state management
- 🌐 **Vue I18n** for English/Dutch language support
- ✅ **Vee-validate** + **Zod** for type-safe form validation
- 📡 **Axios** with request/response interceptors
- 🔣 **Material Symbols** via unplugin-icons
