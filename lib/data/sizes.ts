import type { EquivTier } from "@/lib/types";

export const SIZES: [number, number[]][] = [
  [8, [8, 10, 12, 14, 16, 20, 24]],
  [10, [8, 10, 12, 14, 16, 20, 24, 28, 30]],
  [12, [12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52]],
  [14, [12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52]],
  [16, [16, 20, 24, 28, 32, 36, 40, 44, 48, 52]],
];

export const ALL_PAIRS: [number, number][] = [];
SIZES.forEach(([w, lengths]) => {
  lengths.forEach((l) => ALL_PAIRS.push([w, l]));
});

export const MAX_AREA = 16 * 52;

export const EQUIV_TIERS: EquivTier[] = [
  { max: 80, label: "Walk-in closet", cls: "teal" },
  { max: 130, label: "Small bedroom", cls: "teal" },
  { max: 200, label: "Large bedroom", cls: "blue" },
  { max: 320, label: "1-car garage", cls: "amber" },
  { max: 500, label: "2-car garage", cls: "purple" },
  { max: 9999, label: "3-car garage+", cls: "coral" },
];

export const STORAGE_OPTIONS = [
  { sf: 60, name: "Walk-in closet" },
  { sf: 110, name: "Small bedroom" },
  { sf: 170, name: "Large bedroom" },
  { sf: 250, name: "1-car garage" },
  { sf: 400, name: "2-car garage" },
  { sf: 600, name: "3-car garage+" },
];

export const MOWER_OPTIONS = [
  { sf: 0, name: "None" },
  { sf: 48, name: "Small" },
  { sf: 60, name: "Medium" },
  { sf: 80, name: "Zero-Turn" },
];

export const BENCH_OPTIONS = [0, 48, 54, 60, 66, 72];

export const SHELVING_OPTIONS = [
  { value: "0", label: "None", width: 0, depth: 0, sf: 0, cf: 0 },
  { value: "36x18", label: '36×18 — 4.5sf', width: 36, depth: 18, sf: 4.5, cf: 26 },
  { value: "36x24", label: '36×24 — 6sf', width: 36, depth: 24, sf: 6, cf: 35 },
  { value: "48x18", label: '48×18 — 6sf', width: 48, depth: 18, sf: 6, cf: 35 },
  { value: "48x24", label: '48×24 — 8sf', width: 48, depth: 24, sf: 8, cf: 46 },
  { value: "60x18", label: '60×18 — 7.5sf', width: 60, depth: 18, sf: 7.5, cf: 43 },
  { value: "72x24", label: '72×24 — 12sf', width: 72, depth: 24, sf: 12, cf: 69 },
];

export const DOOR_OPTIONS = {
  front: [
    { key: "6dbl-front", label: "6' Double door" },
    { key: "6gar", label: "6' Garage door" },
    { key: "8roll", label: "8' Rollup door" },
  ],
  side: [
    { key: "6dbl-side", label: "6' Double door" },
  ],
};

export const DOOR_DESCS: Record<string, string> = {
  "6dbl-front": "Front 6' double door — swings open for easy mower access",
  "6gar": "Front 6' garage door — lifts overhead, no swing clearance needed",
  "8roll": "Front 8' rollup door — widest opening, fits any mower",
  "6dbl-side": "Side 6' double door — enter from the long wall",
};
