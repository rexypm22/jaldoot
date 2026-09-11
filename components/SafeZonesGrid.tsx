import { SAFE_ZONES } from "@/lib/data";
import CallButton from "./CallButton";

export default function SafeZonesGrid() {
  return (
    <section aria-labelledby="safe-zones-heading">
      <h2 id="safe-zones-heading" className="font-display text-lg font-semibold text-sandbar-100 mb-3">
        Safe Zones
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {SAFE_ZONES.map((zone) => {
          const pct = Math.round((zone.occupancy / zone.capacity) * 100);
          const full = pct >= 90;
          return (
            <div
              key={zone.id}
              className="rounded-xl border border-dusk-700 bg-dusk-900 p-4 flex flex-col gap-3 shadow-panel"
            >
              <div>
                <p className="font-semibold text-sandbar-100 text-sm">{zone.name}</p>
                <p className="text-xs text-sandbar-200/60">{zone.type}</p>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-sandbar-200/70 mb-1">
                  <span>
                    {zone.occupancy} / {zone.capacity} occupied
                  </span>
                  <span className={full ? "text-alert-red" : "text-alert-green"}>{pct}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-dusk-700 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${full ? "bg-alert-red" : "bg-alert-green"}`}
                    style={{ width: `${Math.min(pct, 100)}%` }}
                  />
                </div>
              </div>

              <CallButton phone={zone.phone} label="Call Coordinator" tone="red" size="sm" />
            </div>
          );
        })}
      </div>
    </section>
  );
}
