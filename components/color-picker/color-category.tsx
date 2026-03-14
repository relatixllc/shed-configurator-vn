"use client";

import type { Color, ColorGroup, ColorDisplayMode, ColorCategory as ColorCat } from "@/lib/types";
import { SwatchGrid } from "./swatch-grid";
import { SwatchStrip } from "./swatch-strip";
import { SwatchPills } from "./swatch-pills";
import { SwatchDropdown } from "./swatch-dropdown";

interface ColorCategoryProps {
  category: ColorCat;
  mode: ColorDisplayMode;
  groups: ColorGroup[];
  selectedColor: Color | null;
  onSelect: (color: Color) => void;
}

export function ColorCategory({ category, mode, groups, selectedColor, onSelect }: ColorCategoryProps) {
  const label = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="mt-2">
      <div className="font-sans text-[clamp(0.72rem,2.5vw,0.82rem)] font-semibold text-[var(--color-text)] mb-1">
        {label}
      </div>

      {mode === "grid" && <SwatchGrid groups={groups} selectedColor={selectedColor} onSelect={onSelect} />}
      {mode === "strip" && <SwatchStrip groups={groups} selectedColor={selectedColor} onSelect={onSelect} />}
      {mode === "pills" && <SwatchPills groups={groups} selectedColor={selectedColor} onSelect={onSelect} />}
      {mode === "dropdown" && <SwatchDropdown groups={groups} selectedColor={selectedColor} onSelect={onSelect} category={category} />}

      {selectedColor && mode !== "dropdown" && (
        <div className="font-mono text-[clamp(0.65rem,2.2vw,0.75rem)] text-[var(--color-text)] mt-0.5 min-h-[1.2em] break-words">
          {selectedColor.name}
        </div>
      )}
    </div>
  );
}
