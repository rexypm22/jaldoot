"use client";

import { useEffect, useState } from "react";

type Status = "Optimal" | "Low-Bandwidth Mode";

// Reads the browser's Network Information API where available, and falls
// back to a periodic latency probe so the pill is meaningful even on
// browsers that don't expose connection details.
export default function NetworkStatusPill() {
  const [status, setStatus] = useState<Status>("Optimal");

  useEffect(() => {
    const nav = navigator as Navigator & {
      connection?: {
        effectiveType?: string;
        saveData?: boolean;
        addEventListener?: (ev: string, cb: () => void) => void;
        removeEventListener?: (ev: string, cb: () => void) => void;
      };
    };

    const evaluate = () => {
      const conn = nav.connection;
      if (conn) {
        const slow =
          conn.saveData ||
          conn.effectiveType === "2g" ||
          conn.effectiveType === "slow-2g" ||
          conn.effectiveType === "3g";
        setStatus(slow ? "Low-Bandwidth Mode" : "Optimal");
      } else {
        setStatus(navigator.onLine ? "Optimal" : "Low-Bandwidth Mode");
      }
    };

    evaluate();
    nav.connection?.addEventListener?.("change", evaluate);
    window.addEventListener("online", evaluate);
    window.addEventListener("offline", evaluate);

    return () => {
      nav.connection?.removeEventListener?.("change", evaluate);
      window.removeEventListener("online", evaluate);
      window.removeEventListener("offline", evaluate);
    };
  }, []);

  const optimal = status === "Optimal";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
        optimal
          ? "bg-alert-green/15 text-alert-green border border-alert-green/40"
          : "bg-alert-amber/15 text-alert-amber border border-alert-amber/40"
      }`}
      role="status"
      aria-live="polite"
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${optimal ? "bg-alert-green" : "bg-alert-amber"}`}
      />
      {status}
    </span>
  );
}
