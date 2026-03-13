"use client";

import { useState, useRef, useEffect } from "react";
import type { Color, ColorGroup } from "@/lib/types";

interface SwatchDropdownProps {
  groups: ColorGroup[];
  selectedColor: Color | null;
  onSelect: (color: Color) => void;
  category: string;
}

export function SwatchDropdown({ groups, selectedColor, onSelect, category }: SwatchDropdownProps) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (anchorRef.current && !anchorRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="cdd-anchor" ref={anchorRef}>
      <div
        className={`cdd-btn ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <div
          className="cdd-preview"
          style={{ background: selectedColor ? selectedColor.hex : "#999" }}
        />
        <span className={`cdd-label ${selectedColor ? "has" : ""}`}>
          {selectedColor ? selectedColor.name : `Select ${category} color...`}
        </span>
        <span className="cdd-arrow">&#9660;</span>
      </div>

      <div className={`cdd-panel ${open ? "show" : ""}`}>
        {groups.map((group, gi) => (
          <div key={gi}>
            {group.label && (
              <div className="grp-label" style={{ marginTop: 6 }}>{group.label}</div>
            )}
            <div className="grid-swatches">
              {group.colors.map((c) => (
                <div
                  key={c.name}
                  className={`csw ${c.light ? "lc" : ""} ${selectedColor?.name === c.name ? "active" : ""}`}
                  style={{ background: c.hex, borderRadius: 5 }}
                  onClick={() => {
                    onSelect(c);
                    setTimeout(() => setOpen(false), 120);
                  }}
                >
                  <div className="csw-tip">{c.name}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
