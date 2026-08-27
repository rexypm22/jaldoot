export function Gauge({
  pct,
  color,
  value,
  label,
}: {
  pct: number
  color: string
  value: string
  label: string
}) {
  const cx = 70
  const cy = 74
  const r = 54
  const pt = (a: number) => [cx + r * Math.cos(a), cy - r * Math.sin(a)]
  const clamped = Math.max(0, Math.min(100, pct))
  const [x1, y1] = pt(Math.PI)
  const [x2, y2] = pt(0)
  const [xa, ya] = pt(Math.PI - (clamped / 100) * Math.PI)

  return (
    <div className="flex shrink-0 flex-col items-center">
      <svg width={132} height={80} viewBox="0 0 140 84" aria-hidden>
        <path
          d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`}
          fill="none"
          stroke="oklch(0.35 0.038 215)"
          strokeWidth={11}
          strokeLinecap="round"
        />
        <path
          d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${xa} ${ya}`}
          fill="none"
          style={{ stroke: color }}
          strokeWidth={11}
          strokeLinecap="round"
        />
      </svg>
      <div className="-mt-11 font-mono text-2xl font-semibold tabular-nums" style={{ color }}>
        {value}
      </div>
      <div className="mt-3 text-[9.5px] uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  )
}
