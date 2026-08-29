"use client"

import React, { useState } from "react"
import { Navigation, ShieldAlert, HeartPulse, LifeBuoy, MapPin, Utensils, AlertCircle } from "lucide-react"

export function Panel() {
  const [activeSubTab, setActiveSubTab] = useState<"rescue" | "survival">("rescue")
  const [userGender, setUserGender] = useState("All")
  const [userAgeGroup, setUserAgeGroup] = useState("Adult")

  // Simulated survival tips customized by demographic & context
  const getSurvivalAdvice = () => {
    if (userAgeGroup === "Child") {
      return {
        food: "Boiled safe water only,ORS solution, mashed rice or soft energy biscuits if available. Avoid stagnant floodwater contact completely.",
        meds: "Paracetamol syrup (as per weight), ORS packets, clean oral rehydration.",
        disease: "High risk of water-borne diarrhea and cholera. Keep warm and dry."
      }
    } else if (userAgeGroup === "Elderly") {
      return {
        food: "Easy-to-digest soft cooked grains, high-sodium broths, and safe drinking water with electrolyte balance.",
        meds: "Keep regular prescriptions dry in plastic pouches. Carry emergency blood pressure/diabetes kits.",
        disease: "Monitor for hypothermia, joint dampness, and respiratory congestion."
      }
    }
    return {
      food: "Wild edible shoots (if verified safe), boiled roots, emergency ration bars, or packaged dry provisions. Avoid raw river fish/vegetables.",
      meds: "Water purification chlorine tablets, antiseptic ointment for cuts, oral antibiotics for water infection.",
      disease: "Watch out for Leptospirosis (mud fever), skin fungal infections, and mosquito-borne dengue/malaria."
    }
  }

  const advice = getSurvivalAdvice()

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-white shadow-xl">
      {/* Sub-tab Navigation */}
      <div className="flex border-b border-slate-800 pb-3 mb-4 gap-2">
        <button
          onClick={() => setActiveSubTab("rescue")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
            activeSubTab === "rescue" ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <Navigation size={14} /> Rescue & Safe Zones
        </button>
        <button
          onClick={() => setActiveSubTab("survival")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
            activeSubTab === "survival" ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <LifeBuoy size={14} /> Survival & Triage Guide
        </button>
      </div>

      {/* Tab 1: Rescue & Safe Zones */}
      {activeSubTab === "rescue" && (
        <div className="space-y-4">
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex justify-between items-center">
            <div>
              <span className="text-xs text-cyan-400 font-mono">NE-SDRF TEAM ALPHA-4</span>
              <h4 className="text-sm font-bold text-white mt-0.5">Assam Flood Response Unit</h4>
              <p className="text-xs text-slate-400">Status: Dispatched toward your sector</p>
            </div>
            <div className="text-right">
              <span className="text-lg font-extrabold text-amber-400">1.4 km</span>
              <p className="text-[10px] text-slate-400">Estimated arrival: 12 mins</p>
            </div>
          </div>

          <div>
            <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Nearest Evacuation & Relief Shelters</h5>
            <div className="space-y-2">
              <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-700 flex justify-between items-center text-xs">
                <div>
                  <p className="font-bold text-white flex items-center gap-1.5"><MapPin size={12} className="text-emerald-400" /> IIT Guwahati High-Altitude Shelter</p>
                  <p className="text-slate-400 mt-0.5">Capacity: 450 people • Medical aid available</p>
                </div>
                <span className="text-emerald-400 font-bold bg-emerald-950/60 px-2 py-1 rounded border border-emerald-800">0.8 km Away</span>
              </div>

              <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-700 flex justify-between items-center text-xs">
                <div>
                  <p className="font-bold text-white flex items-center gap-1.5"><MapPin size={12} className="text-emerald-400" /> Dispur Community Stadium Relief Camp</p>
                  <p className="text-slate-400 mt-0.5">Capacity: 1200 people • Food & Water supply active</p>
                </div>
                <span className="text-emerald-400 font-bold bg-emerald-950/60 px-2 py-1 rounded border border-emerald-800">2.1 km Away</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Survival & Triage Lesson */}
      {activeSubTab === "survival" && (
        <div className="space-y-3">
          <p className="text-xs text-slate-300">Select demographic context for customized survival medical and nutrition insights during isolation:</p>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-slate-400 uppercase font-mono block mb-1">Target Age Group</label>
              <select 
                value={userAgeGroup} 
                onChange={(e) => setUserAgeGroup(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded p-1.5 text-xs text-white"
              >
                <option value="Adult">Adult (18-60 yrs)</option>
                <option value="Child">Child / Infant</option>
                <option value="Elderly">Elderly (60+ yrs)</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] text-slate-400 uppercase font-mono block mb-1">Gender Focus</label>
              <select 
                value={userGender} 
                onChange={(e) => setUserGender(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded p-1.5 text-xs text-white"
              >
                <option value="All">All Categories</option>
                <option value="Female">Female Specific Care</option>
                <option value="Male">General Adult Care</option>
              </select>
            </div>
          </div>

          {/* Dynamic Advice Display Box */}
          <div className="space-y-2 mt-3 bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs">
            <div className="flex items-start gap-2">
              <Utensils size={14} className="text-cyan-400 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-bold text-white">Emergency Food & Water Protocol:</span>
                <p className="text-slate-300 mt-0.5">{advice.food}</p>
              </div>
            </div>

            <div className="flex items-start gap-2 pt-2 border-t border-slate-900">
              <HeartPulse size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-bold text-white">Medication & First Aid:</span>
                <p className="text-slate-300 mt-0.5">{advice.meds}</p>
              </div>
            </div>

            <div className="flex items-start gap-2 pt-2 border-t border-slate-900">
              <AlertCircle size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-bold text-white">Disease Prevention & Warnings:</span>
                <p className="text-slate-300 mt-0.5">{advice.disease}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
