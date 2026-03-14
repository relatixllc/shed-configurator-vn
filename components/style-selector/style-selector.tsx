"use client";

import { SHED_STYLES } from "@/lib/data/styles";
import { SHED_ICONS } from "./shed-icons";
import { StyleCard } from "./style-card";

interface StyleSelectorProps {
  selectedIndex: number | null;
  recommendedIndex: number | null;
  helpChoice: "affordable" | "space" | null;
  onSelectStyle: (index: number) => void;
  onHelpChoose: (choice: "affordable" | "space") => void;
}

export function StyleSelector({
  selectedIndex,
  recommendedIndex,
  helpChoice,
  onSelectStyle,
  onHelpChoose,
}: StyleSelectorProps) {
  return (
    <div id="Style">
      <div className="font-sans text-[clamp(1.2rem,4vw,1.5rem)] font-semibold text-[var(--color-text)] mb-2.5">
        Style
      </div>

      <div className="styles">
        {SHED_STYLES.map((style, i) => (
          <StyleCard
            key={style.key}
            name={style.name}
            Icon={SHED_ICONS[i]}
            active={selectedIndex === i}
            recommended={recommendedIndex === i}
            onClick={() => onSelectStyle(i)}
          />
        ))}
      </div>

      <div className="mb-6 -mt-2">
        <div className="font-sans text-[clamp(0.62rem,2.2vw,0.72rem)] font-semibold text-[var(--color-text-faint)] mb-1.5">
          Help me choose:
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            className={`help-btn ${helpChoice === "affordable" ? "active" : ""}`}
            onClick={() => onHelpChoose("affordable")}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke={helpChoice === "affordable" ? "currentColor" : "#1D9E75"} strokeWidth="1.5">
              <path d="M12 2v20M6 6h8a4 4 0 010 8H6" />
              <path d="M8 14h8a4 4 0 010 8H6" />
            </svg>
            More affordable
          </button>
          <button
            className={`help-btn ${helpChoice === "space" ? "active" : ""}`}
            onClick={() => onHelpChoose("space")}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke={helpChoice === "space" ? "currentColor" : "#1D9E75"} strokeWidth="1.5">
              <path d="M3 21V7l9-5 9 5v14" />
              <path d="M9 21V12h6v9" />
            </svg>
            More space
          </button>
        </div>
      </div>
    </div>
  );
}
