import { RESCUE_TEAMS } from "@/lib/data";
import CallButton from "./CallButton";

const statusStyles: Record<string, string> = {
  Deployed: "bg-alert-green/15 text-alert-green border-alert-green/40",
  "En Route": "bg-alert-amber/15 text-alert-amber border-alert-amber/40",
  "On Standby": "bg-river-500/15 text-river-300 border-river-400/40"
};

export default function RescueTeamsGrid() {
  return (
    <section aria-labelledby="rescue-teams-heading">
      <h2 id="rescue-teams-heading" className="font-display text-lg font-semibold text-sandbar-100 mb-3">
        Rescue Teams
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {RESCUE_TEAMS.map((team) => (
          <div
            key={team.id}
            className="rounded-xl border border-dusk-700 bg-dusk-900 p-4 flex flex-col gap-3 shadow-panel"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="font-semibold text-sandbar-100 text-sm truncate">{team.name}</p>
                <p className="text-xs text-sandbar-200/60 truncate">{team.unit}</p>
              </div>
              <span
                className={`shrink-0 text-[10px] font-semibold rounded-full border px-2 py-0.5 ${statusStyles[team.status]}`}
              >
                {team.status}
              </span>
            </div>
            <p className="text-xs text-sandbar-200/70">Base: {team.base}</p>
            <CallButton phone={team.phone} label={`Call ${team.name.split(" ")[0]}`} tone="green" size="sm" />
          </div>
        ))}
      </div>
    </section>
  );
}
