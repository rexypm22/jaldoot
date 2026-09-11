"use client";

import { useState } from "react";
import { LANGUAGES } from "@/lib/data";

export default function LanguageSelector() {
  const [lang, setLang] = useState("en");

  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="sr-only">Select language</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-sandbar-200/80 shrink-0">
        <path
          d="M4 5h9M8.5 3v2m-3 2c.7 2.6 2.4 4.8 4.8 6.4M11 7c-1 3.8-4 7-8 8.6M14 21l4-9 4 9m-6.4-3h4.8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="bg-dusk-800 border border-dusk-700 text-sandbar-100 text-sm rounded-md px-2 py-1.5 focus:ring-2 focus:ring-river-400 cursor-pointer"
        aria-label="Regional language"
      >
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
    </label>
  );
}
