"use client";

import { useState, useEffect, useMemo } from "react";
import { STORAGE_OPTIONS, MOWER_OPTIONS, BENCH_OPTIONS, SHELVING_OPTIONS, DOOR_OPTIONS, DOOR_DESCS, ALL_PAIRS } from "@/lib/data/sizes";
import { mowerDesc, benchDesc, shelfDesc, computeTally } from "@/lib/utils/calc";
import { fmtN } from "@/lib/utils/size-utils";
import { QuantityStepper } from "@/components/ui/quantity-stepper";

interface SizeHelperProps {
  onMinSqFtChange: (minSf: number) => void;
}

export function SizeHelper({ onMinSqFtChange }: SizeHelperProps) {
  const [open, setOpen] = useState(false);

  const [storageSf, setStorageSf] = useState(0);
  const [storageName, setStorageName] = useState("");
  const [mowerSf, setMowerSf] = useState(0);
  const [mowerName, setMowerName] = useState("");
  const [selectedDoor, setSelectedDoor] = useState<string | null>(null);
  const [benchW, setBenchW] = useState(0);
  const [shelfValue, setShelfValue] = useState("0");
  const [shelfQty, setShelfQty] = useState(1);

  const shelf = useMemo(() => {
    const opt = SHELVING_OPTIONS.find((o) => o.value === shelfValue);
    return opt || SHELVING_OPTIONS[0];
  }, [shelfValue]);

  const tally = useMemo(() => {
    return computeTally(storageSf, storageName, mowerSf, mowerName, selectedDoor, benchW, shelf.width, shelf.depth, shelfQty);
  }, [storageSf, storageName, mowerSf, mowerName, selectedDoor, benchW, shelf, shelfQty]);

  useEffect(() => {
    onMinSqFtChange(tally.total);
  }, [tally.total, onMinSqFtChange]);

  const matchingCount = useMemo(() => {
    if (tally.total <= 0) return { count: 0, best: null as [number, number] | null };
    const matching = ALL_PAIRS.filter(([w, l]) => w * l >= tally.total);
    return { count: matching.length, best: matching[0] || null };
  }, [tally.total]);

  return (
    <div className="mb-2.5">
      <div className="sh-toggle" onClick={() => setOpen(!open)}>
        <span className={`sh-chev ${open ? "open" : ""}`}>&#9654;</span>
        <span className="sh-label">Help me choose a size</span>
      </div>

      <div className={`sh-body ${open ? "open" : ""}`}>
        {/* Storage needs */}
        <div id="Storage" className="mb-2">
          <div className="sh-grp-label">What are you storing?</div>
          <div className="flex gap-1 flex-wrap">
            {STORAGE_OPTIONS.map((opt) => (
              <button
                key={opt.sf}
                className={`sh-btn sh-btn-fit ${storageSf === opt.sf && storageName === opt.name ? "active" : ""}`}
                onClick={() => { setStorageSf(opt.sf); setStorageName(opt.name); }}
              >
                {opt.name}
              </button>
            ))}
          </div>
        </div>

        {/* Mower */}
        <div id="RidingMower" className="mb-2">
          <div className="sh-grp-label">Add a riding mower?</div>
          <div className="flex gap-1">
            {MOWER_OPTIONS.map((opt) => (
              <button
                key={opt.sf}
                className={`sh-btn sh-btn-fit flex-1 ${mowerSf === opt.sf && mowerName === opt.name ? "active" : ""}`}
                onClick={() => {
                  setMowerSf(opt.sf);
                  setMowerName(opt.name);
                  if (opt.sf === 0) {
                    setSelectedDoor(null);
                  }
                }}
              >
                {opt.name}
              </button>
            ))}
          </div>
          {mowerSf > 0 && (
            <div className="sh-mower-note">{mowerDesc(mowerSf)}</div>
          )}
        </div>

        {/* Door (only when mower selected) */}
        {mowerSf > 0 && (
          <div id="MowerDoor" className="mb-2">
            <div className="sh-grp-label">Door for mower access</div>
            <div className="font-sans text-[clamp(0.58rem,2vw,0.65rem)] font-semibold text-[var(--color-text-muted)] mb-0.5">
              Front door
            </div>
            <div className="flex gap-1">
              {DOOR_OPTIONS.front.map((opt) => (
                <button
                  key={opt.key}
                  className={`sh-btn sh-btn-fit flex-1 ${selectedDoor === opt.key ? "active" : ""}`}
                  onClick={() => setSelectedDoor(opt.key)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <div className="font-sans text-[clamp(0.58rem,2vw,0.65rem)] font-semibold text-[var(--color-text-muted)] mb-0.5 mt-1.5">
              Side door
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {DOOR_OPTIONS.side.map((opt) => (
                <button
                  key={opt.key}
                  className={`sh-btn ${selectedDoor === opt.key ? "active" : ""}`}
                  onClick={() => setSelectedDoor(opt.key)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {selectedDoor && (
              <div className="sh-door-note">{DOOR_DESCS[selectedDoor]}</div>
            )}
          </div>
        )}

        {/* Workbench */}
        <div id="Workbench" className="mb-2">
          <div className="sh-grp-label">Add a workbench?</div>
          <div className="flex gap-1">
            {BENCH_OPTIONS.map((w) => (
              <button
                key={w}
                className={`sh-btn sh-btn-fit flex-1 ${benchW === w ? "active" : ""}`}
                onClick={() => setBenchW(w)}
              >
                {w === 0 ? "No" : `${w}"`}
              </button>
            ))}
          </div>
          {benchW > 0 && (
            <div className="sh-bench-detail">{benchDesc(benchW)}</div>
          )}
        </div>

        {/* Shelving */}
        <div id="Shelving" className="mb-2">
          <div className="sh-grp-label">Add shelving?</div>
          <div>
            <select
              className="cc-sel w-full"
              value={shelfValue}
              onChange={(e) => setShelfValue(e.target.value)}
            >
              {SHELVING_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {shelf.width > 0 && (
              <div className="mt-1.5">
                <QuantityStepper value={shelfQty} onChange={setShelfQty} />
              </div>
            )}
          </div>
          {shelf.width > 0 && (
            <div className="sh-bench-detail">{shelfDesc(shelf.width, shelf.depth, shelfQty)}</div>
          )}
        </div>

        {/* Tally */}
        {tally.rows.length > 0 && (
          <div className="sh-tally">
            {tally.rows.map((row, i) => (
              <div key={i} className={`sh-tally-row ${row.isTotal ? "sh-tally-total" : ""}`}>
                <span className={row.isTotal ? "" : "sh-tally-label"}>{row.label}</span>
                <span
                  className="sh-tally-val"
                  style={row.isCheck ? { color: "#1D9E75" } : undefined}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Result */}
        {tally.total > 0 && (
          <div className="sh-result">
            {matchingCount.count > 0 && matchingCount.best ? (
              <>
                <span className="sh-count">{matchingCount.count} sizes fit</span>
                {" \u2014 smallest is "}
                {matchingCount.best[0]}&apos;x{matchingCount.best[1]}&apos;
                {" ("}
                {fmtN(matchingCount.best[0] * matchingCount.best[1])}
                {" sf)"}
              </>
            ) : (
              "No sizes large enough \u2014 consider our biggest buildings"
            )}
          </div>
        )}
      </div>
    </div>
  );
}
