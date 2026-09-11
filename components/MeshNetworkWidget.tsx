"use client";

import { useEffect, useState } from "react";

interface Node {
  id: number;
  x: number;
  y: number;
  hop: number;
}

const NODES: Node[] = [
  { id: 1, x: 50, y: 50, hop: 0 }, // you
  { id: 2, x: 18, y: 25, hop: 1 },
  { id: 3, x: 82, y: 22, hop: 1 },
  { id: 4, x: 20, y: 78, hop: 2 },
  { id: 5, x: 78, y: 80, hop: 2 },
  { id: 6, x: 50, y: 12, hop: 2 }
];

export default function MeshNetworkWidget() {
  const [active, setActive] = useState(false);
  const [hopIndex, setHopIndex] = useState(0);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setHopIndex((i) => (i + 1) % 3);
    }, 1200);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setActive((a) => !a)}
        aria-pressed={active}
        className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold border transition-colors ${
          active
            ? "bg-river-500/20 border-river-400 text-river-300"
            : "bg-dusk-800 border-dusk-700 text-sandbar-200/80"
        }`}
        title="Simulate offline Bluetooth / Wi-Fi Direct SOS relay between nearby devices"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2v20M8 5l4-3 4 3-4 4-4-4zm0 14 4 3 4-3-4-4-4 4z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Mesh SOS {active ? "On" : "Off"}
      </button>

      {active && (
        <div className="absolute right-0 top-full mt-2 w-64 rounded-xl border border-dusk-700 bg-dusk-900/95 backdrop-blur p-3 shadow-panel z-50">
          <p className="text-[11px] uppercase tracking-wide text-sandbar-200/60 mb-2">
            Offline mesh relay (simulated)
          </p>
          <svg viewBox="0 0 100 100" className="w-full h-32">
            {NODES.filter((n) => n.hop > 0).map((n) => (
              <line
                key={`line-${n.id}`}
                x1={50}
                y1={50}
                x2={n.x}
                y2={n.y}
                stroke={n.hop <= hopIndex + 1 ? "#2C9CAE" : "#1D4E63"}
                strokeWidth={0.8}
              />
            ))}
            {NODES.map((n) => (
              <g key={n.id}>
                {n.hop === 0 && (
                  <circle cx={n.x} cy={n.y} r={3.5} className="mesh-ping" fill="#C6402F" opacity={0.5} />
                )}
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={n.hop === 0 ? 3.2 : 2.4}
                  fill={n.hop === 0 ? "#C6402F" : n.hop <= hopIndex + 1 ? "#2C9CAE" : "#284A5A"}
                />
              </g>
            ))}
          </svg>
          <p className="text-[11px] text-sandbar-200/70 leading-relaxed">
            Your SOS signal is hopping via {hopIndex + 1} nearby {hopIndex === 0 ? "device" : "devices"} over
            Bluetooth / Wi-Fi Direct until it reaches a connected relay.
          </p>
        </div>
      )}
    </div>
  );
}
