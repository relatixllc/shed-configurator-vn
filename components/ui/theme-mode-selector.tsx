"use client";

import type { ThemeMode, TextSize } from "@/lib/types";

interface ThemeModeSelectorProps {
  mode: ThemeMode;
  textSize: TextSize;
  onChange: (mode: ThemeMode) => void;
  onTextSizeChange: (size: TextSize) => void;
}

const MODES: { value: ThemeMode; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "adaptive-light", label: "Adaptive Light" },
  { value: "adaptive-dark", label: "Adaptive Dark" },
];

const TEXT_SIZES: { value: TextSize; label: string }[] = [
  { value: "sm", label: "Small" },
  { value: "md", label: "Medium" },
  { value: "lg", label: "Large" },
];

export function ThemeModeSelector({ mode, textSize, onChange, onTextSizeChange }: ThemeModeSelectorProps) {
  return (
    <div className="mb-3">
      <div className="font-sans text-[clamp(0.6rem,2vw,0.68rem)] font-semibold text-[var(--color-text-faint)] uppercase tracking-[0.04em] mb-1">
        Color Mode
      </div>
      <div className="tm-bar">
        {MODES.map((m) => (
          <button
            key={m.value}
            className={`tm-btn ${mode === m.value ? "active" : ""}`}
            onClick={() => onChange(m.value)}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="font-sans text-[clamp(0.6rem,2vw,0.68rem)] font-semibold text-[var(--color-text-faint)] uppercase tracking-[0.04em] mb-1 mt-2">
        Text
      </div>
      <div className="tm-bar">
        {TEXT_SIZES.map((t) => (
          <button
            key={t.value}
            className={`tm-btn ${textSize === t.value ? "active" : ""}`}
            onClick={() => onTextSizeChange(t.value)}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
