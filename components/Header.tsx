import LanguageSelector from "./LanguageSelector";
import NetworkStatusPill from "./NetworkStatusPill";
import MeshNetworkWidget from "./MeshNetworkWidget";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-dusk-700/80 bg-dusk-950/90 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex flex-wrap items-center gap-3 justify-between">
        <div className="flex items-center gap-3 min-w-0">
          {/* Official Ministry of DoNER emblem */}
          <img
            src="/gov-logo.png"
            alt="Ministry of Development of North Eastern Region logo"
            className="h-11 w-11 shrink-0 rounded-md object-contain bg-white p-1"
          />
          <div className="min-w-0">
            <h1 className="font-display text-lg sm:text-xl font-semibold text-sandbar-100 truncate">
              Jaldooot Response Hub
            </h1>
            <p className="text-[11px] text-sandbar-200/60 truncate">
              North-East India · Live Disaster Relief Coordination
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <NetworkStatusPill />
          <MeshNetworkWidget />
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
}
