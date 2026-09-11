"use client";

import { useState } from "react";
import { LANDSLIDE_ZONES, RISK_LEVEL_COLORS, RiskLevel } from "@/lib/landslideData";

const LEVEL_ORDER: RiskLevel[] = ["Severe", "High", "Moderate", "Low"];

export default function LandslideRiskWidget() {
  const [filter, setFilter] = useState<RiskLevel | "All">("All");

  const zones = LANDSLIDE_ZONES.filter((z) => filter === "All" || z.riskLevel === filter).sort(
    (a, b) => b.riskScore - a.riskScore
  );

  return (
    <section
      aria-labelledby="landslide-risk-heading"
      className="rounded-2xl border border-dusk-700 bg-dusk-900 shadow-panel p-4 sm:p-5"
    >
      <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
        <h2 id="landslide-risk-heading" className="font-display text-lg font-semibold text-sandbar-100">
          AI Landslide Risk Monitor
        </h2>
        <span className="text-[10px] rounded-full border border-river-400/40 bg-river-500/10 text-river-300 px-2 py-0.5 font-semibold">
          Model v0 · simulated
        </span>
      </div>
      <p className="text-xs text-sandbar-200/60 mb-3">
        Risk score derived from rainfall, soil moisture and slope angle inputs — refreshed per monitoring cycle.
      </p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {(["All", ...LEVEL_ORDER] as const).map((lvl) => (
          <button
            key={lvl}
            onClick={() => setFilter(lvl)}
            className={`text-[11px] font-semibold rounded-full px-2.5 py-1 border transition-colors ${
              filter === lvl
                ? "bg-sandbar-100 text-dusk-950 border-sandbar-100"
                : "bg-dusk-800 text-sandbar-200/70 border-dusk-700 hover:border-sandbar-200/40"
            }`}
          >
            {lvl}
          </button>
        ))}
      </div>

      <div className="space-y-2.5">
        {zones.map((z) => (
          <div key={z.id} className="rounded-xl border border-dusk-700 bg-dusk-800/60 p-3">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-sandbar-100 truncate">
                  {z.district} <span className="text-sandbar-200/50 font-normal">· {z.state}</span>
                </p>
                <p className="text-[11px] text-sandbar-200/50">Updated {z.lastUpdated}</p>
              </div>
              <span
                className="shrink-0 text-[11px] font-bold rounded-full px-2.5 py-1 text-white"
                style={{ backgroundColor: RISK_LEVEL_COLORS[z.riskLevel] }}
              >
                {z.riskLevel} · {z.riskScore}
              </span>
            </div>

            <div className="h-1.5 rounded-full bg-dusk-700 overflow-hidden mb-2.5">
              <div
                className="h-full rounded-full"
                style={{ width: `${z.riskScore}%`, backgroundColor: RISK_LEVEL_COLORS[z.riskLevel] }}
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-sandbar-200/70">
              <div>
                <p className="text-sandbar-200/45">Rainfall (24h)</p>
                <p className="font-semibold text-sandbar-100">{z.rainfall24hMm} mm</p>
              </div>
              <div>
                <p className="text-sandbar-200/45">Soil moisture</p>
                <p className="font-semibold text-sandbar-100">{z.soilMoisturePct}%</p>
              </div>
              <div>
                <p className="text-sandbar-200/45">Slope angle</p>
                <p className="font-semibold text-sandbar-100">{z.slopeAngleDeg}°</p>
              </div>
              <div>
                <p className="text-sandbar-200/45">Road status</p>
                <p
                  className={`font-semibold ${
                    z.roadStatus === "Open"
                      ? "text-alert-green"
                      : z.roadStatus === "Blocked"
                      ? "text-alert-red"
                      : "text-alert-amber"
                  }`}
                >
                  {z.roadStatus}
                </p>
              </div>
            </div>
            <p className="text-[10px] text-sandbar-200/40 mt-2">Model confidence: {z.confidencePct}%</p>
          </div>
        ))}

        {zones.length === 0 && (
          <p className="text-xs text-sandbar-200/40 italic py-4 text-center">No zones at this risk level right now.</p>
        )}
      </div>
    </section>
  );
}
