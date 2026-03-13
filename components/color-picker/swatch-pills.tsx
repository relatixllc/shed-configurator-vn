"use client";

import type { Color, ColorGroup } from "@/lib/types";

interface SwatchPillsProps {
  groups: ColorGroup[];
  selectedColor: Color | null;
  onSelect: (color: Color) => void;
}

export function SwatchPills({ groups, selectedColor, onSelect }: SwatchPillsProps) {
  return (
    <>
      {groups.map((group, gi) => (
        <div key={gi} className={group.label ? "grp-wrap" : undefined}>
          {group.label && <div className="grp-label">{group.label}</div>}
          <div className="flex flex-wrap gap-1">
            {group.colors.map((c) => (
              <div
                key={c.name}
                className={`cpill ${selectedColor?.name === c.name ? "active" : ""}`}
                onClick={() => onSelect(c)}
              >
                <div
                  className={`cpill-dot ${c.light ? "lc" : ""}`}
                  style={{ background: c.hex }}
                />
                <span className="cpill-name">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
