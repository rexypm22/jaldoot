"use client";

import { useMemo, useState } from "react";
import { CITIES } from "@/lib/data";
import { alertsForArea, AlertSeverity } from "@/lib/alertsData";

const SEVERITY_STYLES: Record<AlertSeverity, string> = {
  Critical: "bg-alert-red/15 text-alert-red border-alert-red/40",
  Warning: "bg-alert-amber/15 text-alert-amber border-alert-amber/40",
  Watch: "bg-river-500/15 text-river-300 border-river-400/40",
  Advisory: "bg-alert-green/15 text-alert-green border-alert-green/40"
};

function nearestCityId(lat: number, lon: number): string {
  let best = CITIES[0];
  let bestDist = Infinity;
  for (const c of CITIES) {
    const d = Math.hypot(c.coords[0] - lat, c.coords[1] - lon);
    if (d < bestDist) {
      bestDist = d;
      best = c;
    }
  }
  return best.id;
}

export default function AlertsNewsFeed() {
  const [areaId, setAreaId] = useState(CITIES[0].id);
  const [locating, setLocating] = useState(false);
  const [locationNote, setLocationNote] = useState<string | null>(null);

  const alerts = useMemo(() => alertsForArea(areaId), [areaId]);
  const activeCity = CITIES.find((c) => c.id === areaId);

  function handleUseMyLocation() {
    setLocating(true);
    setLocationNote(null);
    if (!navigator.geolocation) {
      setLocationNote("Location not available on this device — pick an area manually.");
      setLocating(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const nearest = nearestCityId(pos.coords.latitude, pos.coords.longitude);
        setAreaId(nearest);
        setLocationNote(`Showing alerts for the area nearest your location.`);
        setLocating(false);
      },
      () => {
        setLocationNote("Permission denied — pick an area manually.");
        setLocating(false);
      },
      { timeout: 6000 }
    );
  }

  return (
    <section
      aria-labelledby="alerts-feed-heading"
      className="rounded-2xl border border-dusk-700 bg-dusk-900 shadow-panel p-4 sm:p-5"
    >
      <h2 id="alerts-feed-heading" className="font-display text-lg font-semibold text-sandbar-100 mb-1">
        Alert Feed &amp; Local News
      </h2>
      <p className="text-xs text-sandbar-200/60 mb-3">
        Select an area or use your current location to see disaster alerts and news specific to it.
      </p>

      <div className="flex flex-wrap gap-2 mb-3">
        <select
          value={areaId}
          onChange={(e) => {
            setAreaId(e.target.value);
            setLocationNote(null);
          }}
          className="flex-1 min-w-[10rem] bg-dusk-800 border border-dusk-700 rounded-md px-2.5 py-2 text-sm text-sandbar-100"
          aria-label="Select area for alerts"
        >
          {CITIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}, {c.state}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={handleUseMyLocation}
          disabled={locating}
          className="shrink-0 rounded-md border border-river-400 text-river-300 text-xs font-semibold px-3 py-2 hover:bg-river-500/10 disabled:opacity-50"
        >
          {locating ? "Locating…" : "Use my location"}
        </button>
      </div>

      {locationNote && <p className="text-[11px] text-sandbar-200/50 mb-3">{locationNote}</p>}

      <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
        {alerts.length === 0 ? (
          <p className="text-xs text-sandbar-200/40 italic py-4 text-center">
            No active alerts for {activeCity?.name} right now.
          </p>
        ) : (
          alerts.map((a) => (
            <div key={a.id} className="rounded-xl border border-dusk-700 bg-dusk-800/60 p-3">
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <p className="text-sm font-semibold text-sandbar-100">{a.title}</p>
                <span
                  className={`shrink-0 text-[10px] font-semibold rounded-full border px-2 py-0.5 ${SEVERITY_STYLES[a.severity]}`}
                >
                  {a.severity}
                </span>
              </div>
              <p className="text-xs text-sandbar-200/70 mb-2">{a.summary}</p>
              <div className="flex items-center justify-between text-[10px] text-sandbar-200/45">
                <span>{a.category}</span>
                <span>
                  {a.source} · {a.time}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
