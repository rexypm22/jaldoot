"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { AQI_COLOR, AQI_LABEL, type City, type Station, TIER_COLOR, TIER_LABEL, type Zone } from "@/lib/jaldoot"

type Ring = [number, number][]
interface Feature {
  type: string
  properties: Record<string, string>
  geometry: { type: "Polygon" | "MultiPolygon"; coordinates: number[][][] | number[][][][] }
}

const W = 760
const H = 820
const PAD = 18

/* Mercator Y, returned in degree-equivalent units so it shares a scale with
   raw longitude. Without the rad->deg conversion the latitude span is ~0.57
   while longitude spans ~29, and the shared min() scale flattens the map. */
const mercY = (lat: number) =>
  (Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360)) * 180) / Math.PI

interface MapPoint {
  key: string
  kind: "flood" | "aqi" | "land"
  id: string
  name: string
  sub: string
  value: string
  color: string
  lat: number
  lon: number
  urgent: boolean
}

export function IndiaMap({
  stations,
  cities,
  zones,
  onSelect,
}: {
  stations: Station[]
  cities: City[]
  zones: Zone[]
  onSelect: (kind: "flood" | "aqi" | "land", id: string) => void
}) {
  const [features, setFeatures] = useState<Feature[] | null>(null)
  const [hover, setHover] = useState<{ point: MapPoint; x: number; y: number } | null>(null)
  const [filter, setFilter] = useState<"all" | "flood" | "aqi" | "land">("all")
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false
    fetch("/india-states.json")
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled) setFeatures(d.features as Feature[])
      })
      .catch((err) => console.log("[v0] india map load failed:", err))
    return () => {
      cancelled = true
    }
  }, [])

  const { paths, project } = useMemo(() => {
    if (!features) return { paths: [] as { d: string; name: string }[], project: null as null | ((lon: number, lat: number) => [number, number]) }

    let minX = Infinity,
      maxX = -Infinity,
      minY = Infinity,
      maxY = -Infinity

    const ringsOf = (f: Feature): Ring[] =>
      f.geometry.type === "Polygon"
        ? (f.geometry.coordinates as number[][][]).map((r) => r as Ring)
        : (f.geometry.coordinates as number[][][][]).flatMap((p) => p.map((r) => r as Ring))

    for (const f of features) {
      for (const ring of ringsOf(f)) {
        for (const [lon, lat] of ring) {
          const y = mercY(lat)
          if (lon < minX) minX = lon
          if (lon > maxX) maxX = lon
          if (y < minY) minY = y
          if (y > maxY) maxY = y
        }
      }
    }

    const scale = Math.min((W - PAD * 2) / (maxX - minX), (H - PAD * 2) / (maxY - minY))
    const offX = (W - (maxX - minX) * scale) / 2
    const offY = (H - (maxY - minY) * scale) / 2

    const proj = (lon: number, lat: number): [number, number] => [
      offX + (lon - minX) * scale,
      offY + (maxY - mercY(lat)) * scale,
    ]

    const paths = features.map((f) => {
      let d = ""
      for (const ring of ringsOf(f)) {
        if (ring.length < 3) continue
        ring.forEach(([lon, lat], i) => {
          const [x, y] = proj(lon, lat)
          d += `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`
        })
        d += "Z"
      }
      return { d, name: f.properties?.NAME_1 ?? "" }
    })

    return { paths, project: proj }
  }, [features])

  const points = useMemo<MapPoint[]>(() => {
    const out: MapPoint[] = []
    stations.forEach((s) =>
      out.push({
        key: `flood-${s.id}`,
        kind: "flood",
        id: s.id,
        name: s.name,
        sub: s.state,
        value: `Flood risk ${Math.round(s.risk * 100)}% · ${TIER_LABEL[s.tier]}`,
        color: TIER_COLOR[s.tier],
        lat: s.lat,
        lon: s.lon,
        urgent: s.tier === "danger",
      }),
    )
    cities.forEach((c) =>
      out.push({
        key: `aqi-${c.id}`,
        kind: "aqi",
        id: c.id,
        name: c.name,
        sub: c.state,
        value: `AQI ${Math.round(c.aqi)} · ${AQI_LABEL[c.tier]}`,
        color: AQI_COLOR[c.tier],
        lat: c.lat,
        lon: c.lon,
        urgent: c.tier === "severe",
      }),
    )
    zones.forEach((z) =>
      out.push({
        key: `land-${z.id}`,
        kind: "land",
        id: z.id,
        name: z.name,
        sub: `${z.dist}, Uttarakhand`,
        value: `Slide risk ${Math.round(z.risk * 100)}% · ${TIER_LABEL[z.tier]}`,
        color: TIER_COLOR[z.tier],
        lat: z.lat,
        lon: z.lon,
        urgent: z.tier === "danger",
      }),
    )
    return out
  }, [stations, cities, zones])

  const shown = filter === "all" ? points : points.filter((p) => p.kind === filter)

  return (
    <div className="relative" ref={wrapRef}>
      <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-1 rounded-full border border-border bg-background/80 p-1 backdrop-blur">
        {(
          [
            ["all", "All layers"],
            ["flood", "Flood"],
            ["aqi", "Air"],
            ["land", "Landslide"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
            className={`rounded-full px-3 py-1 text-[11px] font-medium transition-colors ${
              filter === key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid-lines flex min-h-[460px] items-center justify-center px-2 py-4">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-[min(66vh,640px)] w-auto max-w-full"
          role="img"
          aria-label="Map of India showing monitored flood, air quality and landslide stations"
        >
          <defs>
            <linearGradient id="landFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.32 0.04 210)" />
              <stop offset="100%" stopColor="oklch(0.26 0.035 225)" />
            </linearGradient>
          </defs>

          {paths.map((p, i) => (
            <path
              key={`${p.name}-${i}`}
              d={p.d}
              fill="url(#landFill)"
              stroke="oklch(0.45 0.045 205 / 0.9)"
              strokeWidth={0.7}
            />
          ))}

          {!features && (
            <text x={W / 2} y={H / 2} textAnchor="middle" className="fill-muted-foreground font-mono text-[16px]">
              loading terrain…
            </text>
          )}

          {project &&
            shown.map((p) => {
              const [x, y] = project(p.lon, p.lat)
              return (
                <g
                  key={p.key}
                  transform={`translate(${x} ${y})`}
                  className="cursor-pointer"
                  onMouseEnter={() => setHover({ point: p, x, y })}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => onSelect(p.kind, p.id)}
                >
                  {p.urgent && <circle r={7} style={{ fill: p.color }} className="animate-ping-slow" />}
                  {p.kind === "flood" && (
                    <circle r={6.5} style={{ fill: p.color }} stroke="oklch(0.19 0.028 218)" strokeWidth={2} />
                  )}
                  {p.kind === "aqi" && (
                    <rect
                      x={-5}
                      y={-5}
                      width={10}
                      height={10}
                      transform="rotate(45)"
                      style={{ fill: p.color }}
                      stroke="oklch(0.19 0.028 218)"
                      strokeWidth={2}
                    />
                  )}
                  {p.kind === "land" && (
                    <path
                      d="M0 -7 L6.5 5 L-6.5 5 Z"
                      style={{ fill: p.color }}
                      stroke="oklch(0.19 0.028 218)"
                      strokeWidth={2}
                    />
                  )}
                  <circle r={14} fill="transparent" />
                </g>
              )
            })}

          {hover && (
            <g transform={`translate(${Math.min(hover.x, W - 200)} ${Math.max(hover.y - 66, 6)})`} pointerEvents="none">
              <rect
                x={0}
                y={0}
                width={198}
                height={58}
                rx={8}
                fill="oklch(0.16 0.03 220 / 0.96)"
                stroke="oklch(0.45 0.045 205)"
              />
              <text x={10} y={19} className="fill-foreground text-[13px] font-semibold">
                {hover.point.name.length > 26 ? `${hover.point.name.slice(0, 25)}…` : hover.point.name}
              </text>
              <text x={10} y={34} className="fill-muted-foreground text-[11px]">
                {hover.point.sub}
              </text>
              <text x={10} y={49} style={{ fill: hover.point.color }} className="font-mono text-[11px]">
                {hover.point.value}
              </text>
            </g>
          )}
        </svg>
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border px-4 py-3 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-safe" /> Normal
        </span>
        <span className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-watch" /> Watch
        </span>
        <span className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-danger" /> Danger
        </span>
        <span className="ml-auto font-mono text-[10.5px] tracking-wide">
          ● river gauge &nbsp; ◆ air quality &nbsp; ▲ landslide zone &nbsp;·&nbsp; click a dot to open its module
        </span>
      </div>
    </div>
  )
}
