import { RIVER_READINGS } from "@/lib/data";
import Sparkline from "./Sparkline";

export default function RiverLevelWidget() {
  return (
    <section
      aria-labelledby="river-levels-heading"
      className="rounded-2xl border border-dusk-700 bg-dusk-900 shadow-panel p-4 sm:p-5"
    >
      <h2 id="river-levels-heading" className="font-display text-lg font-semibold text-sandbar-100 mb-1">
        River Water Levels
      </h2>
      <p className="text-xs text-sandbar-200/60 mb-4">Brahmaputra &amp; Barak — 12-reading trend vs danger threshold</p>

      <div className="space-y-4">
        {RIVER_READINGS.map((r) => {
          const overDanger = r.currentLevel >= r.dangerLevel;
          const overWarning = r.currentLevel >= r.warningLevel;
          return (
            <div
              key={`${r.river}-${r.station}`}
              className="rounded-xl border border-dusk-700 bg-dusk-800/60 p-3 flex items-center justify-between gap-3"
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-sandbar-100 truncate">
                  {r.river} <span className="text-sandbar-200/50 font-normal">· {r.station}</span>
                </p>
                <p className="text-xs text-sandbar-200/60">
                  {r.currentLevel.toFixed(1)} {r.unit}{" "}
                  <span className={overDanger ? "text-alert-red" : overWarning ? "text-alert-amber" : "text-alert-green"}>
                    ({overDanger ? "above danger level" : overWarning ? "above warning level" : "normal"})
                  </span>
                </p>
              </div>
              <Sparkline values={r.levels} dangerLevel={r.dangerLevel} warningLevel={r.warningLevel} width={140} height={44} />
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex items-center gap-4 text-[10px] text-sandbar-200/50">
        <span className="flex items-center gap-1">
          <span className="h-0.5 w-3 bg-alert-red inline-block" /> Danger level
        </span>
        <span className="flex items-center gap-1">
          <span className="h-0.5 w-3 bg-alert-amber inline-block" /> Warning level
        </span>
      </div>
    </section>
  );
}
