export type AlertSeverity = "Advisory" | "Watch" | "Warning" | "Critical";

export interface AlertItem {
  id: string;
  areaId: string; // matches a City id in lib/data.ts
  title: string;
  summary: string;
  severity: AlertSeverity;
  category: "Landslide" | "Flood" | "Weather" | "Road" | "General";
  source: string;
  time: string; // relative label
}

export const ALERTS: AlertItem[] = [
  {
    id: "al-ghy-1",
    areaId: "ghy",
    title: "IMD issues heavy rainfall warning for Kamrup belt",
    severity: "Warning",
    category: "Weather",
    summary: "Intermittent heavy rain expected over the next 48 hours; low-lying areas near the Brahmaputra advised to monitor river levels.",
    source: "IMD Regional Centre",
    time: "25 min ago"
  },
  {
    id: "al-ghy-2",
    areaId: "ghy",
    title: "NH-27 stretch near Guwahati bypass reopened",
    severity: "Advisory",
    category: "Road",
    summary: "Waterlogged stretch cleared after overnight pumping; single-lane traffic restored under police supervision.",
    source: "Assam PWD",
    time: "1 hr ago"
  },
  {
    id: "al-mjl-1",
    areaId: "mjl",
    title: "Majuli embankment breach reported near Kamalabari",
    severity: "Critical",
    category: "Flood",
    summary: "A section of the protective embankment has given way; SDRF teams dispatched, affected households being moved to community shelters.",
    source: "Assam SDMA field report",
    time: "8 min ago"
  },
  {
    id: "al-shl-1",
    areaId: "shl",
    title: "Landslide risk escalated to High for East Khasi Hills",
    severity: "Warning",
    category: "Landslide",
    summary: "AI risk model flags rising soil moisture and slope instability along the Shillong–Cherrapunji road corridor.",
    source: "NER Landslide Monitoring Cell",
    time: "20 min ago"
  },
  {
    id: "al-itn-1",
    areaId: "itn",
    title: "Slope movement cracks reported near West Siang villages",
    severity: "Watch",
    category: "Landslide",
    summary: "Field officials uploaded geo-tagged photos of fresh ground cracks; monitoring team en route for on-site assessment.",
    source: "Field officer report",
    time: "40 min ago"
  },
  {
    id: "al-slc-1",
    areaId: "slc",
    title: "Barak river approaching warning level at Silchar",
    severity: "Watch",
    category: "Flood",
    summary: "Water level trending upward over the last 6 readings; residents in low-lying wards advised to stay alert.",
    source: "Central Water Commission",
    time: "1 hr ago"
  },
  {
    id: "al-koh-1",
    areaId: "koh",
    title: "Clear skies expected across Kohima district through the weekend",
    severity: "Advisory",
    category: "Weather",
    summary: "No significant rainfall forecast; risk levels for the district remain low.",
    source: "IMD Regional Centre",
    time: "2 hr ago"
  },
  {
    id: "al-agt-1",
    areaId: "agt",
    title: "Minor road subsidence reported on Agartala–Sabroom highway",
    severity: "Advisory",
    category: "Road",
    summary: "A short stretch has developed surface subsidence after recent rain; repair crews scheduled, one lane open.",
    source: "Tripura PWD",
    time: "3 hr ago"
  }
];

export function alertsForArea(areaId: string): AlertItem[] {
  return ALERTS.filter((a) => a.areaId === areaId);
}
