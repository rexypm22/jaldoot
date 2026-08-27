import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function Panel({
  title,
  tag,
  children,
  className,
  bodyClassName,
  flush,
}: {
  title?: string
  tag?: ReactNode
  children: ReactNode
  className?: string
  bodyClassName?: string
  flush?: boolean
}) {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-panel/70 shadow-[0_1px_0_0_oklch(1_0_0/0.04)_inset] backdrop-blur",
        className,
      )}
    >
      {title && (
        <header className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
          <h2 className="text-sm font-semibold tracking-tight">{title}</h2>
          {tag && <span className="text-[10.5px] uppercase tracking-wider text-muted-foreground">{tag}</span>}
        </header>
      )}
      <div className={cn(flush ? "" : "p-4", bodyClassName)}>{children}</div>
    </section>
  )
}

export function Metric({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div className="rounded-lg border border-border bg-panel-2/60 px-3 py-2.5">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 font-mono text-base tabular-nums">
        {value}
        {unit && <span className="ml-1 text-[10.5px] text-muted-foreground">{unit}</span>}
      </div>
    </div>
  )
}

export function PrecautionList({ title, items }: { title: string; items: { en: string[]; hi: string[] } }) {
  return (
    <div className="mt-4 border-t border-border pt-4">
      <div className="text-[10.5px] uppercase tracking-wider text-muted-foreground">{title}</div>
      <ul className="mt-2.5 flex flex-col gap-2">
        {items.en.map((line, i) => (
          <li key={line} className="relative pl-4 text-[12.5px] leading-relaxed">
            <span aria-hidden className="absolute left-0 top-0 text-watch">
              ▸
            </span>
            {line}
            {items.hi[i] && <div className="text-[11.5px] text-muted-foreground">{items.hi[i]}</div>}
          </li>
        ))}
      </ul>
    </div>
  )
}
