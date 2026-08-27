"use client"

const W = 520
const H = 140
const PAD = 6

interface Series {
  label: string
  values: number[]
  color: string
  dashed?: boolean
  fill?: boolean
}

export function TrendChart({ series }: { series: Series[] }) {
  const len = Math.max(...series.map((s) => s.values.length), 2)
  const x = (i: number) => PAD + (i / Math.max(len - 1, 1)) * (W - PAD * 2)
  const y = (v: number) => H - PAD - (Math.max(0, Math.min(100, v)) / 100) * (H - PAD * 2)

  return (
    <div className="mt-4">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-32 w-full" role="img" aria-label="Recent readings trend">
        {[0, 25, 50, 75, 100].map((g) => (
          <line key={g} x1={PAD} x2={W - PAD} y1={y(g)} y2={y(g)} stroke="oklch(0.32 0.04 220)" strokeWidth={0.7} />
        ))}
        {series.map((s) => {
          const line = s.values.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join("")
          return (
            <g key={s.label}>
              {s.fill && s.values.length > 1 && (
                <path
                  d={`${line}L${x(s.values.length - 1).toFixed(1)} ${H - PAD}L${x(0).toFixed(1)} ${H - PAD}Z`}
                  style={{ fill: s.color, opacity: 0.14 }}
                />
              )}
              <path
                d={line}
                fill="none"
                style={{ stroke: s.color }}
                strokeWidth={2}
                strokeLinecap="round"
                strokeDasharray={s.dashed ? "5 4" : undefined}
              />
            </g>
          )
        })}
      </svg>
      <div className="mt-1 flex flex-wrap gap-4">
        {series.map((s) => (
          <span key={s.label} className="flex items-center gap-2 text-[10.5px] text-muted-foreground">
            <span className="h-0.5 w-4 rounded-full" style={{ background: s.color }} />
            {s.label}
          </span>
        ))}
      </div>
    </div>
  )
}
