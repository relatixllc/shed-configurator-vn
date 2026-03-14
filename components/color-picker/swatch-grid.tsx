"use client";

import { useRef, useState, useEffect } from "react";
import type { Color, ColorGroup } from "@/lib/types";

interface SwatchGridProps {
  groups: ColorGroup[];
  selectedColor: Color | null;
  onSelect: (color: Color) => void;
}

function tipAlign(el: HTMLElement | null): string {
  if (!el) return "-50%";
  const parent = el.closest(".grid-swatches, .grp-swatches") as HTMLElement | null;
  if (!parent) return "-50%";
  const cols = getComputedStyle(parent).gridTemplateColumns.split(" ").length;
  const idx = Array.from(parent.children).indexOf(el);
  const col = idx % cols;
  if (col === 0) return "0%";
  if (col === 1) return "-25%";
  if (col === cols - 1) return "-100%";
  if (col === cols - 2) return "-75%";
  return "-50%";
}

function Swatch({ c, active, onSelect }: { c: Color; active: boolean; onSelect: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [align, setAlign] = useState("-50%");

  useEffect(() => {
    setAlign(tipAlign(ref.current));
  }, []);

  return (
    <div
      ref={ref}
      className={`csw ${c.light ? "lc" : ""} ${active ? "active" : ""}`}
      style={{ background: c.hex }}
      onClick={onSelect}
    >
      <div className="csw-tip" style={{ left: col0(align), transform: `translateX(${align})` }}>{c.name}</div>
    </div>
  );
}

function col0(align: string): string {
  if (align === "0%") return "0";
  if (align === "-100%") return "100%";
  return "50%";
}

export function SwatchGrid({ groups, selectedColor, onSelect }: SwatchGridProps) {
  return (
    <>
      {groups.map((group, gi) => (
        <div key={gi} className={group.label ? "grp-wrap" : undefined}>
          {group.label && <div className="grp-label">{group.label}</div>}
          <div className={group.label ? "grp-swatches" : "grid-swatches"}>
            {group.colors.map((c) => (
              <Swatch
                key={c.name}
                c={c}
                active={selectedColor?.name === c.name}
                onSelect={() => onSelect(c)}
              />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
