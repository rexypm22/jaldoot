"use client"

import React, { useState } from "react"
import { MapPin, ZoomIn, ZoomOut, AlertTriangle, ShieldCheck } from "lucide-react"

// North-East focused disaster zones data
const neDisasterZones = [
  { id: 1, name: "Guwahati (Brahmaputra Basin)", state: "Assam", type: "Flood Risk", severity: "High", coords: { x: 35, y: 55 }, details: "Water level rising 6.5 cm/hr near danger mark." },
  { id: 2, name: "Kaziranga National Park", state: "Assam", type: "Submergence Alert", severity: "Critical", coords: { x: 50, y: 50 }, details: "70% wildlife corridor affected. Relief camps active." },
  { id: 3, name: "Itanagar Foothills", state: "Arunachal Pradesh", type: "Landslide Watch", severity: "Moderate", coords: { x: 65, y: 30 }, details: "NH-415 partial block due to mudslide." },
  { id: 4, name: "East Khasi Hills (Cherrapunji)", state: "Meghalaya", type: "Flash Flood Risk", severity: "High", coords: { x: 30, y: 70 }, details: "Continuous heavy rainfall exceeding 120mm/day." },
  { id: 5, name: "Imphal Valley", state: "Manipur", type: "Water Logging", severity: "Moderate", coords: { x: 45, y: 85 }, details: "Drainage overflow near Loktak lake basin." },
  { id: 6, name: "Aizawl Ridge", state: "Mizoram", type: "Landslide Zone", severity: "High", coords: { x: 25, y: 90 }, details: "Vulnerable settlement zone under evacuation advisory." },
  { id: 7, name: "Kohima District", state: "Nagaland", type: "Soil Instability", severity: "Moderate", coords: { x: 60, y: 75 }, details: "Minor subsidence reported on arterial roads." },
  { id: 8, name: "Agartala Basin", state: "Tripura", type: "River Overflow", severity: "Low", coords: { x: 15, y: 80 }, details: "Howrah river close to warning threshold." }
]

export function IndiaMap() {
  const [zoomLevel, setZoomLevel] = useState(1)
  const [selectedZone, setSelectedZone] = useState(neDisasterZones[0])

  return (
    <div className="relative w-full h-[450px] bg-slate-950 rounded-xl border border-slate-800 p-4 flex flex-col justify-between overflow-hidden shadow-2xl">
      {/* Map Header Controls */}
      <div className="flex justify-between items-center z-10 bg-slate-900/80 backdrop-blur px-4 py-2 rounded-lg border border-slate-800">
        <div>
          <h3 className="text-sm font-semibold text-white">North-Eastern Region Intelligence Grid</h3>
          <p className="text-xs text-slate-400">Targeted Ministry of DoNER Telemetry & Risk Mapping</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 1.8))}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded transition"
            title="Zoom In"
          >
            <ZoomIn size={16} />
          </button>
          <button 
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 1))}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded transition"
            title="Zoom Out"
          >
            <ZoomOut size={16} />
          </button>
        </div>
      </div>

      {/* Interactive Simulated Map Canvas */}
      <div className="relative flex-1 my-3 overflow-hidden rounded-lg bg-slate-900/40 border border-slate-800 flex items-center justify-center">
        <div 
          className="relative w-full h-full transition-transform duration-300 ease-out flex items-center justify-center"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Simulated NE Map Background Box / Grid Styling */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          <div className="absolute text-xs text-slate-600 font-mono top-2 left-3">REGION: NORTH-EASTERN SECTOR (DoNER Jurisdiction)</div>

          {/* Interactive Pins */}
          {neDisasterZones.map((zone) => (
            <button
              key={zone.id}
              onClick={() => setSelectedZone(zone)}
              className={`absolute group flex items-center justify-center p-2 rounded-full transition-all transform -translate-x-1/2 -translate-y-1/2 ${
                selectedZone.id === zone.id ? 'ring-4 ring-cyan-500/50 scale-125 z-20' : 'hover:scale-110'
              }`}
              style={{ left: `${zone.coords.x}%`, top: `${zone.coords.y}%` }}
            >
              <span className={`absolute w-4 h-4 rounded-full animate-ping opacity-75 ${
                zone.severity === 'Critical' ? 'bg-red-500' : zone.severity === 'High' ? 'bg-amber-500' : 'bg-blue-500'
              }`}></span>
              <MapPin className={`w-6 h-6 drop-shadow-md ${
                zone.severity === 'Critical' ? 'text-red-500' : zone.severity === 'High' ? 'text-amber-400' : 'text-blue-400'
              }`} />
            </button>
          ))}
        </div>
      </div>

      {/* Selected Zone Quick Info Footer */}
      <div className="z-10 bg-slate-900/90 border border-slate-800 p-3 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">{selectedZone.state}</span>
            <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${
              selectedZone.severity === 'Critical' ? 'bg-red-950 text-red-400 border border-red-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
            }`}>{selectedZone.type}</span>
          </div>
          <h4 className="text-sm font-semibold text-white mt-0.5">{selectedZone.name}</h4>
          <p className="text-xs text-slate-400">{selectedZone.details}</p>
        </div>
        <div className="text-right text-xs text-slate-400 font-mono self-end sm:self-center">
          Status: <span className="text-emerald-400 font-bold">Active Radar</span>
        </div>
      </div>
    </div>
  )
}
