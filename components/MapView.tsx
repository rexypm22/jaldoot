"use client";

import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[420px] sm:h-[520px] rounded-2xl border border-dusk-700 bg-dusk-900 flex items-center justify-center text-sandbar-200/50 text-sm">
      Loading map…
    </div>
  )
});

export default function MapView() {
  return <LeafletMap />;
}
