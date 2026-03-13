import type { Color, ColorSortMode, ColorGroupMode, ColorGroup } from "@/lib/types";
import { ALL_COLORS, COLOR_GROUP_DEFS } from "@/lib/data/colors";

export function hexToHsl(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }

  return { h: h * 360, s, l };
}

export function luminance(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

export function getSortedColors(sortMode: ColorSortMode): Color[] {
  const sorted = ALL_COLORS.slice();
  switch (sortMode) {
    case "name-az":
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-za":
      sorted.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "light":
      sorted.sort((a, b) => luminance(b.hex) - luminance(a.hex));
      break;
    case "dark":
      sorted.sort((a, b) => luminance(a.hex) - luminance(b.hex));
      break;
    case "hue":
      sorted.sort((a, b) => hexToHsl(a.hex).h - hexToHsl(b.hex).h);
      break;
  }
  return sorted;
}

export function getGroupedColors(
  sortMode: ColorSortMode,
  groupMode: ColorGroupMode
): ColorGroup[] {
  const sorted = getSortedColors(sortMode);
  if (groupMode === "none") return [{ label: null, colors: sorted }];

  const map: Record<string, Color[]> = {};
  sorted.forEach((c) => {
    if (!map[c.group]) map[c.group] = [];
    map[c.group].push(c);
  });

  const order = COLOR_GROUP_DEFS.map((g) => g.key);
  return order
    .filter((k) => map[k])
    .map((k) => {
      const def = COLOR_GROUP_DEFS.find((g) => g.key === k);
      return { label: def ? def.label : k, colors: map[k] };
    });
}
