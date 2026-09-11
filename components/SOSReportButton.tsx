"use client";

import { useState } from "react";
import SOSReportModal from "./SOSReportModal";

export default function SOSReportButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-alert-red hover:bg-alert-redDark text-white font-semibold pl-4 pr-5 py-3.5 shadow-lg shadow-black/40"
      >
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full rounded-full bg-white/70 mesh-ping" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
        </span>
        Report SOS
      </button>

      {open && <SOSReportModal onClose={() => setOpen(false)} />}
    </>
  );
}
