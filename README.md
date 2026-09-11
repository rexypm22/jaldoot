# Jaldooot Response Hub

A North-East India disaster-relief coordination dashboard built with Next.js
14 (App Router), TypeScript, Tailwind CSS, and React-Leaflet.

## Setup

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

To produce a production build:

```bash
npm run build
npm run start
```

## Features implemented

1. **Emergency calling** — every Rescue Team and Safe Zone card has a
   high-contrast red/green `tel:` call button (`components/CallButton.tsx`).
   A dedicated **Quick Helpline** card (`components/QuickHelpline.tsx`) lists
   national numbers (112, 100, 101, 108, 1091, NDRF) and North-East regional
   SDMA/SDRF lines.
2. **Crowdsourced SOS reporting** — a persistent floating "Report SOS" button
   (`components/SOSReportButton.tsx`) opens a modal
   (`components/SOSReportModal.tsx`) with location selection (city dropdown
   or GPS), incident type, free-text details, and a simulated photo upload.
3. **Header & navigation** — regional language dropdown (Assamese, Manipuri,
   Mizo, Khasi, Bengali, English), a live network-status pill
   (Optimal / Low-Bandwidth Mode, driven by the Network Information API),
   an offline mesh-network P2P SOS toggle with a simulated
   Bluetooth/Wi-Fi-Direct relay visualization, and a reserved layout slot for
   the official Ministry of DoNER logo.
4. **AI Drone Feasibility Zone map overlay** — a toggle button on the Leaflet
   map draws simulated aerial supply routes to cut-off villages, with wind
   speed / weather clearance / payload capacity shown on hover
   (`components/LeafletMap.tsx`).
5. **River water level analytics** — sparkline widgets track Brahmaputra and
   Barak river levels against warning/danger thresholds
   (`components/RiverLevelWidget.tsx`, `components/Sparkline.tsx`).
6. **Interactive Survival Guide** — age-group and gender dropdown filters
   dynamically regenerate survival, foraging, hydration, and disease
   prevention tips (`components/SurvivalGuide.tsx`, `lib/survivalTips.ts`).
7. **AI Landslide Risk Monitor** — district-level risk scoring from
   simulated rainfall, soil moisture and slope-angle inputs, with a
   severity filter and road-connectivity status
   (`components/LandslideRiskWidget.tsx`, `lib/landslideData.ts`), plus a
   matching "Landslide Risk Zones" toggle layer on the map.
8. **Alert Feed & Local News** — pick an area manually or use device
   location to see disaster alerts and news scoped to that area, tagged by
   severity (Advisory/Watch/Warning/Critical) and category
   (`components/AlertsNewsFeed.tsx`, `lib/alertsData.ts`).
9. The **Real-Time Monitoring** section now groups the Situation Map,
   Landslide Risk, River Levels, and Alerts & News as tabs
   (`components/DashboardTabs.tsx`) so the dashboard doesn't read as
   flood-only.

## Data

All city coordinates, rescue teams, safe zones, helplines, drone routes and
river readings live in `lib/data.ts` — edit this file to plug in your real,
live data sources. Helpline numbers are illustrative and should be verified
against current official listings before production use.

## Notes

- The Leaflet map is loaded via `next/dynamic` with `ssr: false` since
  Leaflet requires the browser `window` object.
- No backend is wired up — the SOS form and mesh-network widget simulate
  their real-world behavior client-side, ready to be connected to real APIs.
