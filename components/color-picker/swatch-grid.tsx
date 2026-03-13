"use client";

import type { Color, ColorGroup } from "@/lib/types";

interface SwatchGridProps {
  groups: ColorGroup[];
  selectedColor: Color | null;
  onSelect: (color: Color) => void;
}

export function SwatchGrid({ groups, selectedColor, onSelect }: SwatchGridProps) {
  return (
    <>
      {groups.map((group, gi) => (
        <div key={gi} className={group.label ? "grp-wrap" : undefined}>
          {group.label && <div className="grp-label">{group.label}</div>}
          <div className={group.label ? "grp-swatches" : "grid-swatches"}>
            {group.colors.map((c) => (
              <div
                key={c.name}
                className={`csw ${c.light ? "lc" : ""} ${selectedColor?.name === c.name ? "active" : ""}`}
                style={{ background: c.hex }}
                onClick={() => onSelect(c)}
              >
                <div className="csw-tip">{c.name}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
