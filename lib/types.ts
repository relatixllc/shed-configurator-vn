export type ColorGroupKey =
  | "whites" | "yellows" | "neutrals" | "darks" | "reds"
  | "oranges" | "pinks" | "greens" | "teals" | "blues"
  | "purples" | "coolgrays";

export interface Color {
  name: string;
  hex: string;
  light: boolean;
  group: ColorGroupKey;
}

export interface ColorGroupDef {
  key: ColorGroupKey;
  label: string;
}

export type ColorCategory = "siding" | "roof" | "trim";
export type ColorDisplayMode = "grid" | "strip" | "pills" | "dropdown";
export type ColorSortMode = "default" | "name-az" | "name-za" | "light" | "dark" | "hue";
export type ColorGroupMode = "none" | "family";
export type ChipSize = "sm" | "md" | "lg";

export interface ColorGroup {
  label: string | null;
  colors: Color[];
}

export interface ShedStyle {
  name: string;
  key: string;
}

export type ThemeMode = "light" | "dark" | "adaptive-light" | "adaptive-dark";
export type TextSize = "sm" | "md" | "lg";
export type SizeDisplayMode = "all" | "a" | "b" | "c" | "d";

export interface EquivTier {
  max: number;
  label: string;
  cls: "teal" | "blue" | "amber" | "purple" | "coral";
}

export interface SizeState {
  wallHeight: 6 | 8;
  showArea: boolean;
  showVolume: boolean;
  showEquiv: boolean;
  selectedSize: [number, number] | null;
  sizeMode: SizeDisplayMode;
  minSqFt: number;
}
