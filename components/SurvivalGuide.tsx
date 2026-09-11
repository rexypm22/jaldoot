"use client";

import { useMemo, useState } from "react";
import { AGE_BANDS, GENDERS, filterTips, AgeBand, Gender, TipCategory } from "@/lib/survivalTips";

const CATEGORY_META: Record<TipCategory, { label: string; icon: string }> = {
  survival: { label: "Survival", icon: "🛖" },
  foraging: { label: "Foraging", icon: "🌿" },
  hydration: { label: "Hydration", icon: "💧" },
  disease: { label: "Disease Prevention", icon: "🩹" }
};

export default function SurvivalGuide() {
  const [age, setAge] = useState<AgeBand>("adult");
  const [gender, setGender] = useState<Gender>("any");

  const tips = useMemo(() => filterTips(age, gender), [age, gender]);

  const grouped = useMemo(() => {
    const map: Record<TipCategory, string[]> = { survival: [], foraging: [], hydration: [], disease: [] };
    for (const t of tips) map[t.category].push(t.tip);
    return map;
  }, [tips]);

  return (
    <section
      aria-labelledby="survival-guide-heading"
      className="rounded-2xl border border-dusk-700 bg-dusk-900 shadow-panel p-4 sm:p-5"
    >
      <h2 id="survival-guide-heading" className="font-display text-lg font-semibold text-sandbar-100 mb-1">
        Interactive Survival Guide
      </h2>
      <p className="text-xs text-sandbar-200/60 mb-4">
        Choose an age group and gender to see tailored survival, foraging, hydration and disease-prevention tips.
      </p>

      <div className="flex flex-wrap gap-3 mb-4">
        <label className="text-xs text-sandbar-200/70 flex flex-col gap-1">
          Age group
          <select
            value={age}
            onChange={(e) => setAge(e.target.value as AgeBand)}
            className="bg-dusk-800 border border-dusk-700 rounded-md px-2.5 py-1.5 text-sm text-sandbar-100"
          >
            {AGE_BANDS.map((a) => (
              <option key={a.value} value={a.value}>
                {a.label}
              </option>
            ))}
          </select>
        </label>

        <label className="text-xs text-sandbar-200/70 flex flex-col gap-1">
          Gender
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value as Gender)}
            className="bg-dusk-800 border border-dusk-700 rounded-md px-2.5 py-1.5 text-sm text-sandbar-100"
          >
            {GENDERS.map((g) => (
              <option key={g.value} value={g.value}>
                {g.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {(Object.keys(CATEGORY_META) as TipCategory[]).map((cat) => (
          <div key={cat} className="rounded-xl border border-dusk-700 bg-dusk-800/60 p-3">
            <p className="text-sm font-semibold text-sandbar-100 mb-2">
              <span aria-hidden>{CATEGORY_META[cat].icon}</span> {CATEGORY_META[cat].label}
            </p>
            {grouped[cat].length === 0 ? (
              <p className="text-xs text-sandbar-200/40 italic">No specific tips for this combination.</p>
            ) : (
              <ul className="space-y-1.5 text-xs text-sandbar-200/80 list-disc list-inside">
                {grouped[cat].map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
