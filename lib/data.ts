import {
  City,
  RescueTeam,
  SafeZone,
  Helpline,
  DroneRoute,
  RiverReading
} from "./types";

// Map center: roughly the geographic middle of North-East India
export const MAP_CENTER: [number, number] = [26.2, 92.9];
export const MAP_DEFAULT_ZOOM = 6;

export const CITIES: City[] = [
  { id: "ghy", name: "Guwahati", state: "Assam", coords: [26.1445, 91.7362] },
  { id: "dib", name: "Dibrugarh", state: "Assam", coords: [27.4728, 94.912] },
  { id: "slc", name: "Silchar", state: "Assam", coords: [24.8333, 92.7789] },
  { id: "jrh", name: "Jorhat", state: "Assam", coords: [26.7509, 94.2037] },
  { id: "imf", name: "Imphal", state: "Manipur", coords: [24.817, 93.9368] },
  { id: "shl", name: "Shillong", state: "Meghalaya", coords: [25.5788, 91.8933] },
  { id: "azl", name: "Aizawl", state: "Mizoram", coords: [23.7271, 92.7176] },
  { id: "koh", name: "Kohima", state: "Nagaland", coords: [25.6751, 94.1086] },
  { id: "agt", name: "Agartala", state: "Tripura", coords: [23.8315, 91.2868] },
  { id: "itn", name: "Itanagar", state: "Arunachal Pradesh", coords: [27.0844, 93.6053] },
  { id: "gtk", name: "Gangtok", state: "Sikkim", coords: [27.3389, 88.6065] },
  {
    id: "mjl",
    name: "Majuli (river island)",
    state: "Assam",
    coords: [27.0173, 94.2153],
    cutOff: true
  },
  {
    id: "tpr",
    name: "Along-Yingkiong belt",
    state: "Arunachal Pradesh",
    coords: [28.15, 95.05],
    cutOff: true
  }
];

export const RESCUE_TEAMS: RescueTeam[] = [
  {
    id: "ndrf-1bn",
    name: "NDRF 1st Battalion",
    unit: "National Disaster Response Force",
    base: "Guwahati, Assam",
    phone: "+911124363260",
    status: "Deployed",
    coords: [26.1445, 91.7362]
  },
  {
    id: "sdrf-assam",
    name: "SDRF Assam Team Alpha",
    unit: "State Disaster Response Force",
    base: "Dibrugarh, Assam",
    phone: "+913732300100",
    status: "En Route",
    coords: [27.4728, 94.912]
  },
  {
    id: "sdrf-manipur",
    name: "SDRF Manipur Unit",
    unit: "State Disaster Response Force",
    base: "Imphal, Manipur",
    phone: "+913852411668",
    status: "On Standby",
    coords: [24.817, 93.9368]
  },
  {
    id: "army-eastern",
    name: "Army Eastern Command Relief Column",
    unit: "Indian Army",
    base: "Shillong, Meghalaya",
    phone: "+913642226999",
    status: "Deployed",
    coords: [25.5788, 91.8933]
  },
  {
    id: "sdrf-mizoram",
    name: "SDRF Mizoram Wing",
    unit: "State Disaster Response Force",
    base: "Aizawl, Mizoram",
    phone: "+38932322418",
    status: "On Standby",
    coords: [23.7271, 92.7176]
  }
];

export const SAFE_ZONES: SafeZone[] = [
  {
    id: "sz-ghy-1",
    name: "Guwahati Government Higher Secondary Relief Camp",
    type: "Relief Camp",
    capacity: 500,
    occupancy: 312,
    phone: "+913612237100",
    coords: [26.1584, 91.7458]
  },
  {
    id: "sz-mjl-1",
    name: "Majuli Community Shelter, Kamalabari",
    type: "Community Shelter",
    capacity: 220,
    occupancy: 198,
    phone: "+913775274022",
    coords: [27.03, 94.23]
  },
  {
    id: "sz-slc-1",
    name: "Silchar Medical College Relief Post",
    type: "Medical Post",
    capacity: 150,
    occupancy: 87,
    phone: "+913842260222",
    coords: [24.8221, 92.7981]
  },
  {
    id: "sz-imf-1",
    name: "Imphal DM College Community Shelter",
    type: "Community Shelter",
    capacity: 300,
    occupancy: 140,
    phone: "+913852220335",
    coords: [24.809, 93.945]
  }
];

// National + regional helplines. Numbers reflect commonly published Indian
// emergency lines; always verify current numbers with local authorities
// before relying on them in a live emergency.
export const HELPLINES: Helpline[] = [
  { id: "nat-emg", label: "National Emergency", number: "112", scope: "National" },
  { id: "police", label: "Police", number: "100", scope: "National" },
  { id: "fire", label: "Fire", number: "101", scope: "National" },
  { id: "ambulance", label: "Ambulance", number: "108", scope: "National" },
  { id: "women", label: "Women Helpline", number: "1091", scope: "National" },
  {
    id: "ndrf",
    label: "NDRF Control Room",
    number: "011-24363260",
    scope: "National",
    note: "24x7 National Disaster Response Force"
  },
  {
    id: "assam-sdma",
    label: "Assam SDMA / SDRF",
    number: "0361-2237219",
    scope: "Regional",
    note: "Assam State Disaster Management Authority"
  },
  {
    id: "manipur-sdma",
    label: "Manipur SDMA / SDRF",
    number: "0385-2411668",
    scope: "Regional"
  },
  {
    id: "meghalaya-sdma",
    label: "Meghalaya SDMA",
    number: "0364-2226999",
    scope: "Regional"
  },
  {
    id: "mizoram-sdma",
    label: "Mizoram SDMA",
    number: "0389-2322418",
    scope: "Regional"
  },
  {
    id: "state-eoc",
    label: "State Emergency Ops Centre",
    number: "1070",
    scope: "Regional",
    note: "Toll-free, common across NE states"
  }
];

export const DRONE_ROUTES: DroneRoute[] = [
  {
    id: "route-mjl",
    from: "Jorhat Air Base → Majuli",
    fromCoords: [26.7509, 94.2037],
    to: [27.0173, 94.2153],
    windSpeedKmh: 18,
    weatherClearance: "Clear",
    payloadKg: 12
  },
  {
    id: "route-along",
    from: "Along Field Depot → Yingkiong belt",
    fromCoords: [28.16, 94.8],
    to: [28.15, 95.05],
    windSpeedKmh: 34,
    weatherClearance: "Marginal",
    payloadKg: 6
  },
  {
    id: "route-tuensang",
    from: "Kohima Depot → Tuensang villages",
    fromCoords: [25.6751, 94.1086],
    to: [26.27, 94.83],
    windSpeedKmh: 46,
    weatherClearance: "Grounded",
    payloadKg: 0
  },
  {
    id: "route-lunglei",
    from: "Aizawl Hub → Lunglei outskirts",
    fromCoords: [23.7271, 92.7176],
    to: [22.8879, 92.7353],
    windSpeedKmh: 22,
    weatherClearance: "Clear",
    payloadKg: 10
  }
];

export const RIVER_READINGS: RiverReading[] = [
  {
    river: "Brahmaputra",
    station: "Guwahati (Pandu)",
    levels: [48.8, 49.1, 49.6, 50.0, 50.3, 50.5, 50.7, 50.6, 50.9, 51.1, 51.3, 51.2],
    currentLevel: 51.2,
    dangerLevel: 51.5,
    warningLevel: 50.5,
    unit: "m"
  },
  {
    river: "Brahmaputra",
    station: "Dibrugarh",
    levels: [106.8, 107.0, 107.3, 107.6, 107.9, 108.1, 108.0, 108.3, 108.5, 108.6, 108.7, 108.9],
    currentLevel: 108.9,
    dangerLevel: 108.5,
    warningLevel: 107.9,
    unit: "m"
  },
  {
    river: "Barak",
    station: "Silchar",
    levels: [19.9, 20.1, 20.4, 20.6, 20.5, 20.7, 20.9, 21.0, 20.8, 21.1, 21.2, 21.0],
    currentLevel: 21.0,
    dangerLevel: 21.5,
    warningLevel: 20.9,
    unit: "m"
  }
];

export const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "as", label: "অসমীয়া (Assamese)" },
  { code: "mni", label: "মৈতৈলোন্ (Manipuri)" },
  { code: "lus", label: "Mizo ṭawng" },
  { code: "kha", label: "Khasi" },
  { code: "bn", label: "বাংলা (Bengali)" }
] as const;
