import { LatLng } from "./types";

export type RiskLevel = "Low" | "Moderate" | "High" | "Severe";

export interface LandslideZone {
  id: string;
  district: string;
  state: string;
  coords: LatLng;
  rainfall24hMm: number;
  soilMoisturePct: number;
  slopeAngleDeg: number;
  riskScore: number; // 0-100, model output
  riskLevel: RiskLevel;
  confidencePct: number;
  roadStatus: "Open" | "Partially Blocked" | "Blocked";
  lastUpdated: string; // relative time label
}

export function riskLevelFromScore(score: number): RiskLevel {
  if (score >= 80) return "Severe";
  if (score >= 60) return "High";
  if (score >= 35) return "Moderate";
  return "Low";
}

export const LANDSLIDE_ZONES: LandslideZone[] = [
  {
    id: "ls-sonitpur",
    district: "Sonitpur",
    state: "Assam",
    coords: [26.85, 92.8],
    rainfall24hMm: 142,
    soilMoisturePct: 78,
    slopeAngleDeg: 34,
    riskScore: 86,
    riskLevel: "Severe",
    confidencePct: 91,
    roadStatus: "Blocked",
    lastUpdated: "12 min ago"
  },
  {
    id: "ls-east-khasi",
    district: "East Khasi Hills",
    state: "Meghalaya",
    coords: [25.4, 91.9],
    rainfall24hMm: 118,
    soilMoisturePct: 71,
    slopeAngleDeg: 41,
    riskScore: 74,
    riskLevel: "High",
    confidencePct: 87,
    roadStatus: "Partially Blocked",
    lastUpdated: "20 min ago"
  },
  {
    id: "ls-along",
    district: "West Siang",
    state: "Arunachal Pradesh",
    coords: [28.16, 94.8],
    rainfall24hMm: 96,
    soilMoisturePct: 64,
    slopeAngleDeg: 38,
    riskScore: 68,
    riskLevel: "High",
    confidencePct: 82,
    roadStatus: "Partially Blocked",
    lastUpdated: "35 min ago"
  },
  {
    id: "ls-aizawl-rural",
    district: "Aizawl (rural belt)",
    state: "Mizoram",
    coords: [23.65, 92.68],
    rainfall24hMm: 58,
    soilMoisturePct: 52,
    slopeAngleDeg: 29,
    riskScore: 47,
    riskLevel: "Moderate",
    confidencePct: 79,
    roadStatus: "Open",
    lastUpdated: "48 min ago"
  },
  {
    id: "ls-kohima-rural",
    district: "Kohima (rural belt)",
    state: "Nagaland",
    coords: [25.55, 94.05],
    rainfall24hMm: 41,
    soilMoisturePct: 45,
    slopeAngleDeg: 25,
    riskScore: 33,
    riskLevel: "Low",
    confidencePct: 76,
    roadStatus: "Open",
    lastUpdated: "1 hr ago"
  },
  {
    id: "ls-dima-hasao",
    district: "Dima Hasao",
    state: "Assam",
    coords: [25.35, 93.05],
    rainfall24hMm: 103,
    soilMoisturePct: 69,
    slopeAngleDeg: 37,
    riskScore: 71,
    riskLevel: "High",
    confidencePct: 84,
    roadStatus: "Blocked",
    lastUpdated: "18 min ago"
  }
];

export const RISK_LEVEL_COLORS: Record<RiskLevel, string> = {
  Low: "#237A4B",
  Moderate: "#D69A2D",
  High: "#E07A2F",
  Severe: "#C6402F"
};
