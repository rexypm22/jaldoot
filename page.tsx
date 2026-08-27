"use client"

import { useState } from "react"
import { useNetwork } from "@/hooks/use-network"
import { LANGS, strings } from "@/lib/i18n"
import { TIER_COLOR } from "@/lib/jaldoot"
import { AirTab } from "@/components/tabs/air-tab"
import { EmergencyTab } from "@/components/tabs/emergency-tab"
import { FloodTab } from "@/components/tabs/flood-tab"
import { LandslideTab } from "@/components/tabs/landslide-tab"
import { NearYouTab } from "@/components/tabs/near-you-tab"
import { OverviewTab } from "@/components/tabs/overview-tab"

export default function Page() {
  const { stations, cities, zones, alerts, live } = useNetwork()
  const [lang, setLang] = useState("en")
  const [tab, setTab] = useState(0)
  const [stationId, setStationId] = useState(stations[0].id)
  const [cityId, setCityId] = useState(cities[0].id)
  const [zoneId, setZoneId] = useState(zones[0].id)

  const s = strings(lang)
  const critical = alerts.find((a) => a.en.startsWith("DANGER"))

  const handleMapSelect = (kind: "flood" | "aqi" | "land", id: string) => {
    if (kind === "flood") {
      setStationId(id)
      setTab(1)
    } else if (kind === "aqi") {
      setCityId(id)
      setTab(2)
    } else {
      setZoneId(id)
      setTab(3)
    }
  }

  return (
    <main className="mx-auto max-w-[1400px] px-4 pb-16 pt-5 sm:px-6">
      <header className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="flex size-11 items-center justify-center rounded-xl border border-primary/40 bg-primary/12 font-mono text-lg font-bold text-primary"
          >
            JD
          </span>
          <div>
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              JALDOOT
              <span className="ml-2 align-middle font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                disaster ops
              </span>
            </h1>
            <p className="text-[11.5px] text-muted-foreground">{s.brandSub}</p>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2.5">
          <span className="flex items-center gap-2 rounded-full border border-border bg-panel/70 px-3 py-1.5 text-[11px]">
            <span className="relative flex size-2">
              {live && <span className="absolute inline-flex size-full animate-ping rounded-full bg-safe/70" />}
              <span className={`relative inline-flex size-2 rounded-full ${live ? "bg-safe" : "bg-muted-foreground"}`} />
            </span>
            {s.status}
          </span>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            aria-label="Interface language"
            className="rounded-full border border-border bg-panel/70 px-3 py-1.5 text-[11.5px]"
          >
            {LANGS.map((l) => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
          </select>
        </div>
      </header>

      {critical && (
        <div
          className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border px-4 py-2.5"
          style={{ borderColor: TIER_COLOR.danger, background: "oklch(0.64 0.185 22 / 0.12)" }}
        >
          <span className="rounded-md bg-danger px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-background">
            live danger
          </span>
          <span className="text-[12.5px] leading-relaxed">{critical.en}</span>
          <span className="ml-auto font-mono text-[10.5px] text-muted-foreground">{critical.time}</span>
        </div>
      )}

      <nav className="sticky top-0 z-20 -mx-4 mb-4 mt-4 overflow-x-auto bg-background/85 px-4 py-2 backdrop-blur sm:-mx-6 sm:px-6">
        <div className="flex w-max gap-1 rounded-full border border-border bg-panel/70 p-1">
          {s.tabs.map((label, i) => (
            <button
              key={label}
              type="button"
              onClick={() => setTab(i)}
              aria-current={tab === i}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-[12.5px] font-medium transition-colors ${
                tab === i
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-panel-2 hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </nav>

      {tab === 0 && (
        <OverviewTab
          stations={stations}
          cities={cities}
          zones={zones}
          alerts={alerts}
          s={s}
          onSelect={handleMapSelect}
        />
      )}
      {tab === 1 && (
        <FloodTab stations={stations} alerts={alerts} selectedId={stationId} onSelect={setStationId} s={s} />
      )}
      {tab === 2 && <AirTab cities={cities} selectedId={cityId} onSelect={setCityId} s={s} />}
      {tab === 3 && <LandslideTab zones={zones} selectedId={zoneId} onSelect={setZoneId} s={s} />}
      {tab === 4 && <NearYouTab stations={stations} cities={cities} zones={zones} s={s} />}
      {tab === 5 && <EmergencyTab s={s} />}

      <footer className="mt-8 border-t border-border pt-4 text-[11px] leading-relaxed text-muted-foreground">
        JALDOOT hackathon prototype · simulated sensor feed for demonstration. In production, replace the feed with CWC
        river gauges, CPCB air quality stations and GSI landslide susceptibility data. Always follow official
        instructions from NDMA and your state disaster authority.
      </footer>
    </main>
  )
}
