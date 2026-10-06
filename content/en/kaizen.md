---
title: 'How Kaizen is built'
description: 'Kaizen is a Pomodoro timer with camera-free Focus Rooms on iOS, Android, the web and Windows, built and run by one developer. How it is made, including a release that went wrong.'
---

## Where it came from

In 2022 I started helping run the Discord community of Cajun Koi Academy, the study channel of YouTubers Mike and Matty. A year later I built Cody, a bot for that server with a Pomodoro timer, study-time tracking and leaderboards. People clearly focused better when someone else was there, and that observation became Kaizen’s Focus Rooms.

When the community’s founders moved on in 2025, they handed it to me and I renamed it Kaizen. In September 2025 I started on the app, with a hackathon during my minor as the final push. The first Android alpha reached testers on 26 September, iPhone testers followed in November, and version 3.0 launched on Google Play on 2 January 2026. About 350 people signed up that first day.

## One codebase, four platforms

Kaizen is a single Expo app: React Native 0.86, React 19 and TypeScript in strict mode. The same code runs natively on iOS and Android, and as an installable web app through React Native for Web. The Windows version wraps that web build in Tauri 2, a small Rust shell that adds a tray icon, native notifications and remembered window positions, packaged as an MSIX for the Microsoft Store.

Invite links to a room open the installed app on every platform: universal links on iOS, app links on Android and an App URI Handler on Windows. Everyone else lands in the web app.

## Focus Rooms, without a camera

Many body-doubling tools put you on video. A 2024 survey of 220 mostly neurodivergent people notes that video calls “may activate people’s social anxiety”.[^eagle] Focus Rooms keep the presence and drop the camera: you see who is focusing, who is on a break and who stepped away, plus the tag each person works under.

Presence is polled every 15 seconds. There is no realtime channel. Each member’s countdown ticks on the device from an end time anchored to the server clock, so it stays smooth between polls without drifting, and a member whose heartbeat is older than 45 seconds shows as Away. Version 4.0 rewrote the rooms after people kept getting removed by accident: a phone in the background now keeps its seat for 15 minutes, up from 2.

## App blocking, written natively

Blocking distracting apps needs operating-system features that no existing library covered well. The candidates I found were a few months old with a single maintainer, asked for the permission to list every installed app, or were stuck on an old Expo version. So I wrote my own Expo module with two native halves.

On Android, a Kotlin engine reads which app is in front through usage access and draws a block screen over it. It never uses the Accessibility service or the permission to list every installed app. On iPhone it uses Apple’s Screen Time: you pick apps in Apple’s own picker and Kaizen only receives a sealed token, so it can’t see what you chose. Three app extensions keep the shield in step across four processes. On both platforms the list of blocked apps stays on the phone.

## A mistake: version 4.10.0

App blocking shipped in 4.10.0 on 17 September 2026, and on Android it blocked nothing. Release builds are shrunk with R8, and without an `@OptimizedRecord` annotation, Expo could no longer convert the settings passed to the native module. Every debug build worked. Only the release build failed, and it failed silently.

The fix, 4.10.1, was ready the same day. It also added an R8 keep rule as a safety net and a log line that flags an empty configuration. Google Play took about 24 hours to approve it, so for a full day, the feature Android users had just updated for didn’t work. Expo has since fixed the underlying cause in expo-modules-core 58.

## Sync that works offline

Every change lands on the device first and syncs to Supabase in the background. Items get their IDs on the device, the newest `updated_at` wins a conflict, and deletions are recorded as tombstones, so another device can’t bring a deleted task back to life. Between full syncs, a device only pulls what changed since its last checkpoint.

Habit check-ins use an ID derived from the habit and the day. Two phones that check off the same habit while offline end up with one record instead of two.

## Testing

The app has hundreds of test files. Pure logic, such as the sync merge and the statistics, gets property-based tests with fast-check on top of regular examples. Stryker then changes that code in small ways and checks that the tests notice. CI fails when that mutation score drops below 80 percent. Typechecking, linting, formatting, the test suite and a check of every npm package signature run on every push to the main branches.

## Around the app

Next to the app runs an admin panel: a Vue 3 app with TanStack Query that shows sign-ups, retention cohorts and a marker for every feature release on the charts. New timer backgrounds are converted to WebP in the browser with WebAssembly, and video loops are checked with WebCodecs before upload.

The store listings for three stores and seven languages live in their own repository, with scripts that check every field limit and that each translation has the same structure as the English original. The website, [my-kaizen.com](https://my-kaizen.com), is built with Nuxt 4 and has long guides with sources. And the Discord server, with about 30,000 members, has forums for bug reports and feature requests.

## What the numbers say

September 2026 was Kaizen’s biggest month so far:

::stat-row
---
items:
  - value: '1,500'
    label: new sign-ups, a quarter of all time
  - value: '750'
    label: people active that month, about 350 a week
  - value: '6,200'
    label: hours of focus in that month alone
---
::

Two decisions stand out. Making tasks and joining public rooms free in March roughly doubled weekly sign-ups. Releasing in seven languages in April then lifted the share of new users who actually start using the app from about 23 to about 43 percent that spring. From spring to September, the number of new users who start each week roughly tripled. The next challenge is the second week: about one in seven new users comes back.

## What I’d do differently

- **Translate from the start.** Activation jumped when seven languages arrived, three months after launch.
- **Use a server-state library earlier.** The reads in the sync layer are hand-rolled, and TanStack Query is the planned replacement.
- **Test the release build on a real phone before it ships.** In 4.10.0 every debug build worked; only the release build was broken.

[^eagle]: Eagle, T., Baltaxe-Admony, L. B. and Ringland, K. E. (2024). “It Was Something I Naturally Found Worked and Heard About Later”: An Investigation of Body Doubling with Neurodivergent Participants. ACM Transactions on Accessible Computing, 17(3). [doi.org/10.1145/3689648](https://doi.org/10.1145/3689648)
