import { HELPLINES } from "@/lib/data";
import CallButton from "./CallButton";

export default function QuickHelpline() {
  const national = HELPLINES.filter((h) => h.scope === "National");
  const regional = HELPLINES.filter((h) => h.scope === "Regional");

  return (
    <section
      aria-labelledby="quick-helpline-heading"
      className="rounded-2xl border border-alert-red/30 bg-dusk-900 shadow-panel p-4 sm:p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="h-2 w-2 rounded-full bg-alert-red animate-pulse" />
        <h2 id="quick-helpline-heading" className="font-display text-lg font-semibold text-sandbar-100">
          Quick Helpline
        </h2>
      </div>

      <p className="text-[11px] uppercase tracking-wide text-sandbar-200/50 mb-2">National</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
        {national.map((h) => (
          <div key={h.id} className="rounded-lg bg-dusk-800/70 border border-dusk-700 p-2.5 flex flex-col gap-1.5">
            <span className="text-xs text-sandbar-200/80 truncate">{h.label}</span>
            <CallButton phone={h.number} label={h.number} tone="red" size="sm" />
          </div>
        ))}
      </div>

      <p className="text-[11px] uppercase tracking-wide text-sandbar-200/50 mb-2">
        North-East Regional (SDMA / SDRF)
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {regional.map((h) => (
          <div
            key={h.id}
            className="rounded-lg bg-dusk-800/70 border border-dusk-700 p-2.5 flex items-center justify-between gap-2"
          >
            <div className="min-w-0">
              <p className="text-xs text-sandbar-200/90 truncate">{h.label}</p>
              {h.note && <p className="text-[10px] text-sandbar-200/50 truncate">{h.note}</p>}
            </div>
            <CallButton phone={h.number} label="Call" tone="green" size="sm" />
          </div>
        ))}
      </div>

      <p className="mt-3 text-[10px] text-sandbar-200/40 leading-relaxed">
        Numbers reflect commonly published emergency lines. Verify with local authorities where possible before
        relying on them in a live emergency.
      </p>
    </section>
  );
}
