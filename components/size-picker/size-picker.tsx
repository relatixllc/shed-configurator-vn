"use client";

import { useCallback } from "react";
import type { SizeDisplayMode } from "@/lib/types";
import { ToggleSwitch } from "@/components/ui/toggle-switch";
import { SizeDropdown } from "./size-dropdown";
import { SizeHelper } from "./size-helper";

interface SizePickerProps {
  wallHeight: 6 | 8;
  sizeMode: SizeDisplayMode;
  showArea: boolean;
  showVolume: boolean;
  showEquiv: boolean;
  selectedSize: [number, number] | null;
  minSqFt: number;
  onWallHeightChange: (h: 6 | 8) => void;
  onSizeModeChange: (mode: SizeDisplayMode) => void;
  onShowAreaChange: (v: boolean) => void;
  onShowVolumeChange: (v: boolean) => void;
  onShowEquivChange: (v: boolean) => void;
  onSelectSize: (w: number, l: number) => void;
  onMinSqFtChange: (sf: number) => void;
}

export function SizePicker({
  wallHeight, sizeMode, showArea, showVolume, showEquiv,
  selectedSize, minSqFt,
  onWallHeightChange, onSizeModeChange,
  onShowAreaChange, onShowVolumeChange, onShowEquivChange,
  onSelectSize, onMinSqFtChange,
}: SizePickerProps) {
  const handleMinSqFt = useCallback((sf: number) => {
    onMinSqFtChange(sf);
  }, [onMinSqFtChange]);

  return (
    <div id="Size">
      <div className="font-sans text-[clamp(1.2rem,4vw,1.5rem)] font-semibold text-[var(--color-text)] mb-2.5">
        Size
      </div>

      <SizeHelper onMinSqFtChange={handleMinSqFt} />

      {/* Top row: Walls toggle + mode selector */}
      <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
        <span id="Walls" className="font-sans text-[clamp(0.7rem,2.5vw,0.82rem)] font-semibold text-[var(--color-text-muted)]">
          Walls:
        </span>
        <div className="wall-toggle">
          {([6, 8] as const).map((h) => (
            <div
              key={h}
              className={`wt-btn ${wallHeight === h ? "active" : ""}`}
              onClick={() => onWallHeightChange(h)}
            >
              {h}&apos;
            </div>
          ))}
        </div>
        <select
          className="tb-sel ml-auto"
          value={sizeMode}
          onChange={(e) => onSizeModeChange(e.target.value as SizeDisplayMode)}
        >
          <option value="all">All sizes</option>
          <option value="a">By width</option>
          <option value="b">Pill badge</option>
          <option value="c">Capacity</option>
          <option value="d">By room</option>
        </select>
      </div>

      {/* Toggle row */}
      <div className="flex items-center gap-2 flex-wrap mb-2">
        <ToggleSwitch label="Area" checked={showArea} onChange={onShowAreaChange} />
        <ToggleSwitch label="Volume" checked={showVolume} onChange={onShowVolumeChange} />
        <ToggleSwitch label="Uses" checked={showEquiv} onChange={onShowEquivChange} />
      </div>

      <SizeDropdown
        wallHeight={wallHeight}
        showArea={showArea}
        showVolume={showVolume}
        showEquiv={showEquiv}
        selectedSize={selectedSize}
        sizeMode={sizeMode}
        minSqFt={minSqFt}
        onSelectSize={onSelectSize}
      />
    </div>
  );
}
