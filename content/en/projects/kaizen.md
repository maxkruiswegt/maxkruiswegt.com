---
title: 'Kaizen'
description: 'A cross-platform Pomodoro timer app with camera-free Focus Rooms.'
images:
  - /images/kaizen/Banner.webp
  - /images/kaizen/Banner2.webp
  - /images/kaizen/Banner3.webp
  - /images/kaizen/Banner4.webp
---

Kaizen is the Pomodoro timer app I have been building solo since September 2025. It combines personal productivity with social accountability through camera-free Focus Rooms, and runs on iOS, Android, Web and Windows from one codebase. More than 4,000 people have logged over 16,500 hours of focus with it. Read [the story behind it](https://my-kaizen.com/about), use it in the browser at [my-kaizen.app](https://my-kaizen.app/), or download it on [Google Play](https://play.google.com/store/apps/details?id=com.maxkruiswegt.kaizen), the [App Store](https://apps.apple.com/app/id6755314708), or the [Microsoft Store](https://apps.microsoft.com/detail/9MV8DVZ52JQS).

## ⏱️ Pomodoro Timer

Four presets out of the box (Classic 25/5/15, Quick 15/3/10, Extended 50/10/30, Long Focus 90/15/30) or anything from 5 to 180 minutes. Built on the system clock, so it stays accurate with the screen off or the app in the background, and it ends a session with sound, vibration and a notification you can control the timer from. Immersive mode hides everything but the dial, and after a full cycle the dial shows a recap of the sessions and minutes you just did.

<picture>
  <source media="(max-width: 767px)" srcset="/images/kaizen/Banner2-mobile.webp" />
  <img src="/images/kaizen/Banner2.webp" alt="Kaizen Pomodoro timer interface showing a focus session with a LOFI illustrated theme and progress ring" />
</picture>

## 🎨 Themes

More than 60 timer backgrounds across six collections: lofi illustrations, nature photography, city, cozy, space and minimal, some of them looping video. They download when you pick them so the app installs small. Every still background is free; Premium adds the rest of the animated ones and lets you put your own photo behind the timer.

<picture>
  <source media="(max-width: 767px)" srcset="/images/kaizen/Banner3-mobile.webp" />
  <img src="/images/kaizen/Banner3.webp" alt="Kaizen theme selector showing LOFI illustrated and nature photography themes" />
</picture>

## 🎵 Focus Music

A built-in library of lo-fi, ambient, nature, white noise and classical tracks, cached after the first play so it keeps working offline. Volume control, auto-mute on breaks and seamless looping.

<picture>
  <source media="(max-width: 767px)" srcset="/images/kaizen/Banner4-mobile.webp" />
  <img src="/images/kaizen/Banner4.webp" alt="Kaizen focus music library showing different music categories" />
</picture>

## 👥 Focus Rooms

Study together, even when you're apart. Focus Rooms bring body doubling to your pocket with no camera or microphone: rooms of 2 to 50 people where everyone runs their own timer and you see who is focusing, on a break or away, live, second by second. Joining a public room is free. Hosts can rename a room, change its visibility or capacity, remove a member or hand hosting on, and members can see each other's focus tag and current task.

## ✅ Tasks

A one-line Inbox catches a thought without breaking focus, and you plan it into To Do when you are actually planning. Pin a task, start the timer, and Kaizen logs the minutes against it automatically. Priorities, due dates with push reminders, up to 25 subtasks and a time estimate per task, bulk actions, and a searchable Logbook of everything you finished. Up to 7 active tasks free, unlimited on Premium.

## 🔁 Habits

Check-off habits and focus-time habits that complete themselves from your Pomodoro minutes. Daily, specific-weekday or times-per-week schedules, forgiving streaks that never break on a rest day or a skip, a consistency percentage with a trend chart, unlimited backdating, and reminders at any minute of the day. Five habits free, unlimited on Premium.

## 📊 Statistics & Streaks

Daily streaks with milestone colors, focus time by hour and by weekday, your session mix, a focus-by-tag breakdown (Work, Study, Personal and more), and a full session history you can re-tag. Thirty days of history free, all-time on Premium. Everything syncs offline-first across your devices.

## 🌍 Everywhere

One codebase on iOS, Android, the web (installable as a PWA, with keyboard shortcuts) and a native Windows app from the Microsoft Store, in seven languages: English, German, Spanish, French, Italian, Portuguese and Dutch.

## 💻 Technologies

- 📱 **React Native** with **Expo SDK 57** for cross-platform mobile and web support
- ⚛️ **React 19** with **TypeScript** for a modern, type-safe codebase
- 🗄️ **Supabase** for authentication, PostgreSQL database, and edge functions
- 🪟 **Tauri** for the native Windows desktop app
- 💳 **RevenueCat** for subscription management across platforms
- 🛰️ **Sentry** for crash and error monitoring
- 🌐 **Nuxt** for the static marketing website at [my-kaizen.com](https://my-kaizen.com/)
