"use client";

import type { Color, ColorGroup } from "@/lib/types";

interface SwatchStripProps {
  groups: ColorGroup[];
  selectedColor: Color | null;
  onSelect: (color: Color) => void;
}

export function SwatchStrip({ groups, selectedColor, onSelect }: SwatchStripProps) {
  return (
    <>
      {groups.map((group, gi) => (
        <div key={gi} className={group.label ? "grp-wrap" : undefined}>
          {group.label && <div className="grp-label">{group.label}</div>}
          <div className="strip">
            {group.colors.map((c) => (
              <div
                key={c.name}
                className={`strip-sw ${selectedColor?.name === c.name ? "active" : ""}`}
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
