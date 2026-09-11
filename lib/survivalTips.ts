export type AgeBand = "child" | "teen" | "adult" | "senior";
export type Gender = "any" | "female" | "male";
export type TipCategory = "survival" | "foraging" | "hydration" | "disease";

export interface SurvivalTip {
  category: TipCategory;
  ageBands: AgeBand[];
  genders: Gender[];
  tip: string;
}

export const AGE_BANDS: { value: AgeBand; label: string }[] = [
  { value: "child", label: "Child (0–12)" },
  { value: "teen", label: "Teen (13–19)" },
  { value: "adult", label: "Adult (20–59)" },
  { value: "senior", label: "Senior (60+)" }
];

export const GENDERS: { value: Gender; label: string }[] = [
  { value: "any", label: "Any / prefer not to say" },
  { value: "female", label: "Female" },
  { value: "male", label: "Male" }
];

export const SURVIVAL_TIPS: SurvivalTip[] = [
  // SURVIVAL
  {
    category: "survival",
    ageBands: ["child"],
    genders: ["any"],
    tip: "Stay with a trusted adult at all times; memorise a family member's phone number or keep it written on a wristband."
  },
  {
    category: "survival",
    ageBands: ["teen", "adult"],
    genders: ["any"],
    tip: "Move to higher ground immediately if water is rising faster than a slow walk; do not wait to gather belongings."
  },
  {
    category: "survival",
    ageBands: ["senior"],
    genders: ["any"],
    tip: "Keep essential medicines, spectacles, and mobility aids in one grab-bag near the door at all times during flood season."
  },
  {
    category: "survival",
    ageBands: ["adult", "teen"],
    genders: ["any"],
    tip: "Avoid walking or driving through moving water — 15 cm of fast current can knock an adult off their feet."
  },
  {
    category: "survival",
    ageBands: ["adult"],
    genders: ["female"],
    tip: "If pregnant or nursing, prioritise evacuation early and inform camp coordinators so a medical post can be reserved nearby."
  },

  // FORAGING
  {
    category: "foraging",
    ageBands: ["adult", "teen"],
    genders: ["any"],
    tip: "Only eat plants you can positively identify; banana stem pith and bamboo shoots (boiled) are safe regional staples if unsure."
  },
  {
    category: "foraging",
    ageBands: ["child"],
    genders: ["any"],
    tip: "Never eat wild berries, mushrooms, or unfamiliar plants without an adult checking them first."
  },
  {
    category: "foraging",
    ageBands: ["senior"],
    genders: ["any"],
    tip: "Stick to distributed relief rations where possible — foraging is best left to younger, mobile members of the group."
  },
  {
    category: "foraging",
    ageBands: ["adult", "teen", "senior"],
    genders: ["any"],
    tip: "Avoid any fish or livestock found dead in floodwater; it may carry disease even if cooked."
  },

  // HYDRATION
  {
    category: "hydration",
    ageBands: ["child"],
    genders: ["any"],
    tip: "Give small, frequent sips of safe water rather than large amounts at once to avoid stomach upset in young children."
  },
  {
    category: "hydration",
    ageBands: ["adult", "teen", "senior"],
    genders: ["any"],
    tip: "Boil floodwater for at least one full minute, or use chlorine tablets if provided by relief workers, before drinking."
  },
  {
    category: "hydration",
    ageBands: ["adult"],
    genders: ["female"],
    tip: "Pregnant and nursing women need roughly 300–700 ml more safe water per day than usual — request extra rations at camps."
  },
  {
    category: "hydration",
    ageBands: ["senior"],
    genders: ["any"],
    tip: "Older adults may feel thirst less strongly; set reminders to drink safe water every 1–2 hours even without feeling thirsty."
  },
  {
    category: "hydration",
    ageBands: ["teen", "adult", "senior"],
    genders: ["male"],
    tip: "Avoid alcohol during relief periods — it accelerates dehydration and impairs judgement in fast-changing conditions."
  },

  // DISEASE PREVENTION
  {
    category: "disease",
    ageBands: ["child"],
    genders: ["any"],
    tip: "Keep children's feet dry and covered; wade-related skin infections and diarrhoeal disease spread fastest among young children."
  },
  {
    category: "disease",
    ageBands: ["adult", "teen"],
    genders: ["any"],
    tip: "Wash hands with soap before eating and after any contact with floodwater to prevent cholera and diarrhoeal outbreaks."
  },
  {
    category: "disease",
    ageBands: ["senior"],
    genders: ["any"],
    tip: "Seek priority medical screening at relief camps — seniors are at higher risk from waterborne disease and respiratory infection."
  },
  {
    category: "disease",
    ageBands: ["adult", "teen", "senior", "child"],
    genders: ["any"],
    tip: "Use mosquito nets or repellent where available; stagnant floodwater increases dengue and malaria risk sharply after 5–7 days."
  },
  {
    category: "disease",
    ageBands: ["adult"],
    genders: ["female"],
    tip: "Request private sanitation and hygiene supplies at relief camps; flag menstrual hygiene needs to camp coordinators without hesitation."
  }
];

export function filterTips(age: AgeBand, gender: Gender): SurvivalTip[] {
  return SURVIVAL_TIPS.filter(
    (t) => t.ageBands.includes(age) && (t.genders.includes("any") || t.genders.includes(gender) || gender === "any")
  );
}
