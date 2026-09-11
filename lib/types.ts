export type LatLng = [number, number];

export interface City {
  id: string;
  name: string;
  state: string;
  coords: LatLng;
  cutOff?: boolean;
}

export interface RescueTeam {
  id: string;
  name: string;
  unit: string;
  base: string;
  phone: string;
  status: "Deployed" | "On Standby" | "En Route";
  coords: LatLng;
}

export interface SafeZone {
  id: string;
  name: string;
  type: "Relief Camp" | "Community Shelter" | "Medical Post";
  capacity: number;
  occupancy: number;
  phone: string;
  coords: LatLng;
}

export interface Helpline {
  id: string;
  label: string;
  number: string;
  scope: "National" | "Regional";
  note?: string;
}

export interface DroneRoute {
  id: string;
  from: string;
  to: LatLng;
  fromCoords: LatLng;
  windSpeedKmh: number;
  weatherClearance: "Clear" | "Marginal" | "Grounded";
  payloadKg: number;
}

export interface RiverReading {
  river: "Brahmaputra" | "Barak";
  station: string;
  levels: number[];
  currentLevel: number;
  dangerLevel: number;
  warningLevel: number;
  unit: "m";
}
