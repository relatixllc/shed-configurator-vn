"use client";

import { useMemo } from "react";
import type { Color, ColorCategory as ColorCat, ColorDisplayMode, ColorSortMode, ColorGroupMode, ChipSize } from "@/lib/types";
import { COLOR_CATEGORIES } from "@/lib/data/colors";
import { getGroupedColors } from "@/lib/utils/color-utils";
import { ColorCategory } from "./color-category";

interface ColorPickerProps {
  colorMode: ColorDisplayMode;
  colorSort: ColorSortMode;
  colorGroup: ColorGroupMode;
  chipSize: ChipSize;
  selectedColors: Record<ColorCat, Color | null>;
  onColorModeChange: (mode: ColorDisplayMode) => void;
  onColorSortChange: (sort: ColorSortMode) => void;
  onColorGroupChange: (group: ColorGroupMode) => void;
  onChipSizeChange: (size: ChipSize) => void;
  onColorSelect: (category: ColorCat, color: Color) => void;
}

export function ColorPicker({
  colorMode, colorSort, colorGroup, chipSize,
  selectedColors,
  onColorModeChange, onColorSortChange, onColorGroupChange, onChipSizeChange,
  onColorSelect,
}: ColorPickerProps) {
  const groups = useMemo(
    () => getGroupedColors(colorSort, colorGroup),
    [colorSort, colorGroup]
  );

  return (
    <div className={`mt-6 chip-${chipSize}`}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-2.5 flex-wrap">
        <span className="font-sans text-[clamp(1.2rem,4vw,1.5rem)] font-semibold text-[var(--color-text)]">
          Colors
        </span>
        <select
          className="tb-sel ml-auto"
          value={colorMode}
          onChange={(e) => onColorModeChange(e.target.value as ColorDisplayMode)}
        >
          <option value="grid">Swatch grid</option>
          <option value="strip">Color strip</option>
          <option value="pills">Labeled pills</option>
          <option value="dropdown">Dropdown</option>
        </select>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-1.5 mb-2.5 flex-wrap">
        <div className="flex items-center gap-0.5 min-w-0">
          <span className="cc-label">Sort</span>
          <select
            className="cc-sel"
            value={colorSort}
            onChange={(e) => onColorSortChange(e.target.value as ColorSortMode)}
          >
            <option value="default">Default</option>
            <option value="name-az">Name A–Z</option>
            <option value="name-za">Name Z–A</option>
            <option value="light">Light → Dark</option>
            <option value="dark">Dark → Light</option>
            <option value="hue">By hue</option>
          </select>
        </div>
        <div className="flex items-center gap-0.5 min-w-0">
          <span className="cc-label">Group</span>
          <select
            className="cc-sel"
            value={colorGroup}
            onChange={(e) => onColorGroupChange(e.target.value as ColorGroupMode)}
          >
            <option value="none">None</option>
            <option value="family">By family</option>
          </select>
        </div>
        <div className="flex items-center gap-0.5 min-w-0">
          <span className="cc-label">Chips</span>
          <select
            className="cc-sel"
            value={chipSize}
            onChange={(e) => onChipSizeChange(e.target.value as ChipSize)}
          >
            <option value="sm">Small</option>
            <option value="md">Medium</option>
            <option value="lg">Large</option>
          </select>
        </div>
      </div>

      {/* Categories */}
      {COLOR_CATEGORIES.map((cat) => (
        <ColorCategory
          key={cat}
          category={cat}
          mode={colorMode}
          groups={groups}
          selectedColor={selectedColors[cat]}
          onSelect={(color) => onColorSelect(cat, color)}
        />
      ))}
    </div>
  );
}
