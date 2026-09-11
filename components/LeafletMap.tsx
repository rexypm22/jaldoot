"use client";

import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
  Polyline,
  Tooltip,
  LayersControl
} from "react-leaflet";
import L from "leaflet";
import {
  MAP_CENTER,
  MAP_DEFAULT_ZOOM,
  CITIES,
  RESCUE_TEAMS,
  SAFE_ZONES,
  DRONE_ROUTES
} from "@/lib/data";
import { LANDSLIDE_ZONES, RISK_LEVEL_COLORS } from "@/lib/landslideData";

// Default Leaflet marker icons reference image URLs that don't resolve
// correctly under Next.js bundling — rebuild the icon with explicit CDN URLs.
const cityIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [22, 36],
  iconAnchor: [11, 36]
});

const clearanceColor: Record<string, string> = {
  Clear: "#237A4B",
  Marginal: "#D69A2D",
  Grounded: "#C6402F"
};

export default function LeafletMap() {
  const [droneLayerOn, setDroneLayerOn] = useState(true);
  const [landslideLayerOn, setLandslideLayerOn] = useState(true);

  return (
    <div className="relative h-[420px] sm:h-[520px] rounded-2xl overflow-hidden border border-dusk-700 shadow-panel">
      <div className="absolute z-[500] top-3 right-3 flex flex-col gap-2 items-end">
        <button
          type="button"
          onClick={() => setDroneLayerOn((v) => !v)}
          className={`rounded-lg px-3 py-2 text-xs font-semibold border shadow-sm backdrop-blur ${
            droneLayerOn
              ? "bg-river-500/90 border-river-400 text-white"
              : "bg-dusk-900/90 border-dusk-700 text-sandbar-200/80"
          }`}
        >
          ✈️ Drone Feasibility Zones: {droneLayerOn ? "On" : "Off"}
        </button>
        <button
          type="button"
          onClick={() => setLandslideLayerOn((v) => !v)}
          className={`rounded-lg px-3 py-2 text-xs font-semibold border shadow-sm backdrop-blur ${
            landslideLayerOn
              ? "bg-alert-red/90 border-alert-red text-white"
              : "bg-dusk-900/90 border-dusk-700 text-sandbar-200/80"
          }`}
        >
          ⛰️ Landslide Risk Zones: {landslideLayerOn ? "On" : "Off"}
        </button>
      </div>

      <MapContainer
        center={MAP_CENTER}
        zoom={MAP_DEFAULT_ZOOM}
        scrollWheelZoom
        style={{ height: "100%", width: "100%" }}
      >
        <LayersControl position="bottomright">
          <LayersControl.BaseLayer checked name="Street">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Terrain">
            <TileLayer
              attribution='&copy; OpenTopoMap contributors'
              url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        {/* Cities — includes existing North-East city coordinate set */}
        {CITIES.map((city) => (
          <Marker key={city.id} position={city.coords} icon={cityIcon}>
            <Popup>
              <strong>{city.name}</strong>
              <br />
              {city.state}
              {city.cutOff && (
                <>
                  <br />
                  <span style={{ color: "#C6402F", fontWeight: 600 }}>Currently cut off</span>
                </>
              )}
            </Popup>
          </Marker>
        ))}

        {/* Rescue teams */}
        {RESCUE_TEAMS.map((team) => (
          <CircleMarker
            key={team.id}
            center={team.coords}
            radius={8}
            pathOptions={{ color: "#237A4B", fillColor: "#237A4B", fillOpacity: 0.8 }}
          >
            <Popup>
              <strong>{team.name}</strong>
              <br />
              {team.unit}
              <br />
              Status: {team.status}
              <br />
              <a href={`tel:${team.phone}`}>{team.phone}</a>
            </Popup>
          </CircleMarker>
        ))}

        {/* Safe zones */}
        {SAFE_ZONES.map((zone) => (
          <CircleMarker
            key={zone.id}
            center={zone.coords}
            radius={7}
            pathOptions={{ color: "#2C9CAE", fillColor: "#2C9CAE", fillOpacity: 0.7 }}
          >
            <Popup>
              <strong>{zone.name}</strong>
              <br />
              {zone.type}
              <br />
              Occupancy: {zone.occupancy}/{zone.capacity}
              <br />
              <a href={`tel:${zone.phone}`}>{zone.phone}</a>
            </Popup>
          </CircleMarker>
        ))}

        {/* AI Landslide Risk Zone overlay: risk-scored districts */}
        {landslideLayerOn &&
          LANDSLIDE_ZONES.map((z) => (
            <CircleMarker
              key={z.id}
              center={z.coords}
              radius={10 + z.riskScore / 10}
              pathOptions={{
                color: RISK_LEVEL_COLORS[z.riskLevel],
                fillColor: RISK_LEVEL_COLORS[z.riskLevel],
                fillOpacity: 0.35,
                weight: 2
              }}
            >
              <Tooltip sticky>
                <div style={{ fontSize: 12 }}>
                  <strong>
                    {z.district}, {z.state}
                  </strong>
                  <br />
                  Risk: {z.riskLevel} ({z.riskScore}/100)
                  <br />
                  Rainfall (24h): {z.rainfall24hMm} mm
                  <br />
                  Soil moisture: {z.soilMoisturePct}%
                  <br />
                  Road status: {z.roadStatus}
                </div>
              </Tooltip>
            </CircleMarker>
          ))}

        {/* AI Drone Feasibility Zone overlay: simulated aerial supply routes */}
        {droneLayerOn &&
          DRONE_ROUTES.map((route) => (
            <Polyline
              key={route.id}
              positions={[route.fromCoords, route.to]}
              pathOptions={{
                color: clearanceColor[route.weatherClearance],
                weight: 3,
                dashArray: route.weatherClearance === "Grounded" ? "4 6" : undefined
              }}
            >
              <Tooltip sticky>
                <div style={{ fontSize: 12 }}>
                  <strong>{route.from}</strong>
                  <br />
                  Wind speed: {route.windSpeedKmh} km/h
                  <br />
                  Weather clearance: {route.weatherClearance}
                  <br />
                  Payload capacity: {route.payloadKg} kg
                </div>
              </Tooltip>
            </Polyline>
          ))}
      </MapContainer>
    </div>
  );
}
