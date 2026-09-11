"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { CITIES } from "@/lib/data";

interface SOSReportModalProps {
  onClose: () => void;
}

type IncidentType = "Landslide" | "Flood" | "Road Block";
const INCIDENT_TYPES: IncidentType[] = ["Landslide", "Flood", "Road Block"];

export default function SOSReportModal({ onClose }: SOSReportModalProps) {
  const [location, setLocation] = useState(CITIES[0].id);
  const [useGps, setUseGps] = useState(false);
  const [gpsCoords, setGpsCoords] = useState<string | null>(null);
  const [incident, setIncident] = useState<IncidentType>("Flood");
  const [details, setDetails] = useState("");
  const [photoName, setPhotoName] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function handleUseCurrentLocation() {
    setUseGps(true);
    if (!navigator.geolocation) {
      setGpsCoords("Unavailable on this device");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGpsCoords(`${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);
      },
      () => setGpsCoords("Permission denied — pick a city instead"),
      { timeout: 6000 }
    );
  }

  function handlePhotoUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setPhotoName(file ? file.name : null);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // Simulated submission — no backend wired up yet.
    setSubmitted(true);
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/60 p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sos-modal-title"
    >
      <div className="w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl bg-dusk-900 border border-dusk-700 shadow-panel max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-dusk-700">
          <h2 id="sos-modal-title" className="font-display text-lg font-semibold text-sandbar-100">
            Report SOS
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-sandbar-200/60 hover:text-sandbar-100 text-xl leading-none px-2"
          >
            ×
          </button>
        </div>

        {submitted ? (
          <div className="p-6 text-center space-y-3">
            <div className="mx-auto h-12 w-12 rounded-full bg-alert-green/15 border border-alert-green/40 flex items-center justify-center text-alert-green text-2xl">
              ✓
            </div>
            <p className="text-sandbar-100 font-semibold">Report received</p>
            <p className="text-sm text-sandbar-200/70">
              Your {incident.toLowerCase()} report has been queued for the nearest rescue coordination team.
            </p>
            <button
              onClick={onClose}
              className="mt-2 rounded-lg bg-river-500 hover:bg-river-400 text-white text-sm font-semibold px-4 py-2"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-sandbar-200/70 mb-1.5">Location</label>
              <div className="flex gap-2">
                <select
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    setUseGps(false);
                  }}
                  className="flex-1 bg-dusk-800 border border-dusk-700 rounded-md px-2.5 py-2 text-sm text-sandbar-100"
                >
                  {CITIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}, {c.state}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={handleUseCurrentLocation}
                  className="shrink-0 rounded-md border border-river-400 text-river-300 text-xs font-semibold px-3 hover:bg-river-500/10"
                >
                  Use GPS
                </button>
              </div>
              {useGps && gpsCoords && (
                <p className="mt-1 text-[11px] text-sandbar-200/60">Current location: {gpsCoords}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-sandbar-200/70 mb-1.5">Incident type</label>
              <div className="grid grid-cols-3 gap-2">
                {INCIDENT_TYPES.map((type) => (
                  <button
                    type="button"
                    key={type}
                    onClick={() => setIncident(type)}
                    className={`rounded-md border px-2 py-2 text-xs font-semibold transition-colors ${
                      incident === type
                        ? "bg-alert-red border-alert-red text-white"
                        : "bg-dusk-800 border-dusk-700 text-sandbar-200/80 hover:border-alert-red/60"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="sos-details" className="block text-xs font-semibold text-sandbar-200/70 mb-1.5">
                Details
              </label>
              <textarea
                id="sos-details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={3}
                placeholder="Number of people affected, access routes, immediate needs..."
                className="w-full bg-dusk-800 border border-dusk-700 rounded-md px-2.5 py-2 text-sm text-sandbar-100 placeholder:text-sandbar-200/30"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-sandbar-200/70 mb-1.5">Photo (optional)</label>
              <label className="flex items-center justify-center gap-2 rounded-md border border-dashed border-dusk-700 py-3 text-xs text-sandbar-200/60 cursor-pointer hover:border-river-400">
                <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handlePhotoUpload} />
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 8h3l1.5-2h7L17 8h3v11H4z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="13.5" r="3" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                {photoName ? photoName : "Attach or simulate photo upload"}
              </label>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-alert-red hover:bg-alert-redDark text-white font-semibold py-2.5 text-sm"
            >
              Submit SOS Report
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
