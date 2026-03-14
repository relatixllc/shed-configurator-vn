"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import type { SizeDisplayMode } from "@/lib/types";
import { SIZES, ALL_PAIRS, MAX_AREA } from "@/lib/data/sizes";
import { getEquiv, fmtN, metaStr, meetsMin } from "@/lib/utils/size-utils";
import { SizeGroup } from "./size-group";

interface SizeDropdownProps {
  wallHeight: number;
  showArea: boolean;
  showVolume: boolean;
  showEquiv: boolean;
  selectedSize: [number, number] | null;
  sizeMode: SizeDisplayMode;
  minSqFt: number;
  onSelectSize: (w: number, l: number) => void;
}

export function SizeDropdown({
  wallHeight, showArea, showVolume, showEquiv,
  selectedSize, sizeMode, minSqFt, onSelectSize,
}: SizeDropdownProps) {
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

  const displayText = useMemo(() => {
    if (!selectedSize) return null;
    const [w, l] = selectedSize;
    const a = w * l;
    const eq = getEquiv(a);
    const m = metaStr(w, l, wallHeight, showArea, showVolume);
    const parts = [`${w}'x${l}'`];
    if (m) parts.push(m);
    if (showEquiv) parts.push(eq.label);
    return parts.join("  \u00B7  ");
  }, [selectedSize, wallHeight, showArea, showVolume, showEquiv]);

  function handleSelect(w: number, l: number) {
    onSelectSize(w, l);
    setOpen(false);
  }

  const meta = (w: number, l: number) => metaStr(w, l, wallHeight, showArea, showVolume);

  return (
    <div>
      {minSqFt > 0 && (
        <div className="size-filter">
          Showing sizes &ge; {fmtN(minSqFt)} sf
        </div>
      )}

      <div className="dd-anchor" ref={anchorRef}>
        <div
          className={`dd-btn ${open ? "open" : ""}`}
          onClick={() => setOpen(!open)}
        >
          <span className={`val ${displayText ? "has" : ""}`}>
            {displayText || "Select size..."}
          </span>
          <span className="arrow">&#9660;</span>
        </div>

        <div className={`dd-panel ${open ? "show" : ""}`}>
          {sizeMode === "all" && <RenderAll wallHeight={wallHeight} showArea={showArea} showVolume={showVolume} showEquiv={showEquiv} minSqFt={minSqFt} onSelect={handleSelect} meta={meta} />}
          {sizeMode === "a" && <RenderByWidth wallHeight={wallHeight} showArea={showArea} showVolume={showVolume} showEquiv={showEquiv} minSqFt={minSqFt} onSelect={handleSelect} meta={meta} />}
          {sizeMode === "b" && <RenderPillBadge wallHeight={wallHeight} showArea={showArea} showVolume={showVolume} showEquiv={showEquiv} minSqFt={minSqFt} onSelect={handleSelect} meta={meta} />}
          {sizeMode === "c" && <RenderCapacity wallHeight={wallHeight} showArea={showArea} showVolume={showVolume} showEquiv={showEquiv} minSqFt={minSqFt} onSelect={handleSelect} meta={meta} />}
          {sizeMode === "d" && <RenderByRoom wallHeight={wallHeight} showArea={showArea} showVolume={showVolume} showEquiv={showEquiv} minSqFt={minSqFt} onSelect={handleSelect} meta={meta} />}
        </div>
      </div>

      {selectedSize && (
        <div className="font-mono text-[clamp(0.82rem,3vw,0.95rem)] font-semibold text-[var(--color-text)] min-h-[1.4em] mt-1 break-words">
          {(() => {
            const [w, l] = selectedSize;
            const parts = [`${w}'x${l}'`];
            if (showArea) parts.push(fmtN(w * l) + " sf");
            if (showVolume) parts.push(fmtN(w * l * wallHeight) + " cf");
            if (showEquiv) parts.push(getEquiv(w * l).label);
            return parts.join("  \u00B7  ");
          })()}
        </div>
      )}
    </div>
  );
}

// ── Render modes ──────────────────────────────────────────────

interface RenderProps {
  wallHeight: number;
  showArea: boolean;
  showVolume: boolean;
  showEquiv: boolean;
  minSqFt: number;
  onSelect: (w: number, l: number) => void;
  meta: (w: number, l: number) => string;
}

function RenderAll({ showEquiv, minSqFt, onSelect, meta }: RenderProps) {
  const fp = ALL_PAIRS.filter(([w, l]) => meetsMin(w, l, minSqFt));
  if (!fp.length) return <EmptyMessage />;
  return (
    <>
      {fp.map(([w, l]) => {
        const eq = getEquiv(w * l);
        const m = meta(w, l);
        return (
          <div key={`${w}x${l}`} className="li" style={{ paddingLeft: 12 }} onClick={(e) => { e.stopPropagation(); onSelect(w, l); }}>
            <div className="li-left">
              <span className="li-dim">{w}&apos;x{l}&apos;</span>
              {showEquiv && <span className="li-equiv">{eq.label}</span>}
            </div>
            <div className="li-right">
              {m && <span className="li-meta">{m}</span>}
            </div>
          </div>
        );
      })}
    </>
  );
}

function RenderByWidth({ showEquiv, minSqFt, onSelect, meta }: RenderProps) {
  return (
    <>
      {SIZES.map(([w, lengths]) => {
        const ls = lengths.filter((l) => meetsMin(w, l, minSqFt));
        if (!ls.length) return null;
        const eF = getEquiv(w * ls[0]);
        const eL = getEquiv(w * ls[ls.length - 1]);
        const rl = showEquiv
          ? eF.label === eL.label ? eF.label : `${eF.label} \u2013 ${eL.label}`
          : `${ls.length} sizes`;

        return (
          <SizeGroup key={w} label={`${w}' wide`} rangeText={rl}>
            {ls.map((l) => {
              const eq = getEquiv(w * l);
              const m = meta(w, l);
              return (
                <div key={l} className="li" onClick={(e) => { e.stopPropagation(); onSelect(w, l); }}>
                  <div className="li-left">
                    <span className="li-dim">{w}&apos;x{l}&apos;</span>
                    {showEquiv && <span className="li-equiv">{eq.label}</span>}
                  </div>
                  <div className="li-right">
                    {m && <span className="li-meta">{m}</span>}
                  </div>
                </div>
              );
            })}
          </SizeGroup>
        );
      })}
    </>
  );
}

function RenderPillBadge({ showEquiv, minSqFt, onSelect, meta }: RenderProps) {
  return (
    <>
      {SIZES.map(([w, lengths]) => {
        const ls = lengths.filter((l) => meetsMin(w, l, minSqFt));
        if (!ls.length) return null;
        return (
          <SizeGroup key={w} label={`${w}' wide`} rangeText={`${ls.length} sizes`}>
            {ls.map((l) => {
              const eq = getEquiv(w * l);
              const m = meta(w, l);
              return (
                <div key={l} className="li" style={{ gap: 6 }} onClick={(e) => { e.stopPropagation(); onSelect(w, l); }}>
                  <span className="li-dim">{w}&apos;x{l}&apos;</span>
                  <div className="li-right">
                    {m && <span className="li-meta">{m}</span>}
                    {showEquiv && <span className={`pill pill-${eq.cls}`}>{eq.label}</span>}
                  </div>
                </div>
              );
            })}
          </SizeGroup>
        );
      })}
    </>
  );
}

function RenderCapacity({ showEquiv, minSqFt, onSelect, meta }: RenderProps) {
  return (
    <>
      {SIZES.map(([w, lengths]) => {
        const ls = lengths.filter((l) => meetsMin(w, l, minSqFt));
        if (!ls.length) return null;
        return (
          <SizeGroup key={w} label={`${w}' wide`} rangeText="">
            {ls.map((l) => {
              const a = w * l;
              const eq = getEquiv(a);
              const m = meta(w, l);
              const pct = Math.round((a / MAX_AREA) * 100);
              return (
                <div
                  key={l}
                  className="li"
                  style={{ flexDirection: "column", alignItems: "stretch", gap: 3, padding: "6px 8px 6px 10px" }}
                  onClick={(e) => { e.stopPropagation(); onSelect(w, l); }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span className="li-dim">{w}&apos;x{l}&apos;</span>
                    {m && <span className="li-meta" style={{ marginLeft: "auto" }}>{m}</span>}
                  </div>
                  {showEquiv && (
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div className="bar-track">
                        <div className={`bar-fill bar-${eq.cls}`} style={{ width: `${pct}%` }} />
                      </div>
                      <span className="li-meta" style={{ minWidth: 0, fontFamily: "var(--font-sans)", fontSize: "0.62rem" }}>
                        {eq.label}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </SizeGroup>
        );
      })}
    </>
  );
}

function RenderByRoom({ minSqFt, onSelect, meta }: RenderProps) {
  const fp = ALL_PAIRS.filter(([w, l]) => meetsMin(w, l, minSqFt));

  const groups: Record<string, { eq: ReturnType<typeof getEquiv>; items: [number, number][] }> = {};
  fp.forEach(([w, l]) => {
    const eq = getEquiv(w * l);
    if (!groups[eq.label]) groups[eq.label] = { eq, items: [] };
    groups[eq.label].items.push([w, l]);
  });

  if (!fp.length) return <EmptyMessage />;

  return (
    <>
      {Object.values(groups).map(({ eq, items }) => (
        <SizeGroup
          key={eq.label}
          label={eq.label}
          rangeText=""
          badge={<span className={`pill pill-${eq.cls}`} style={{ marginLeft: "auto" }}>{items.length}</span>}
        >
          {items.map(([w, l]) => {
            const m = meta(w, l);
            return (
              <div key={`${w}x${l}`} className="li" onClick={(e) => { e.stopPropagation(); onSelect(w, l); }}>
                <span className="li-dim">{w}&apos;x{l}&apos;</span>
                {m && <span className="li-meta" style={{ marginLeft: "auto" }}>{m}</span>}
              </div>
            );
          })}
        </SizeGroup>
      ))}
    </>
  );
}

function EmptyMessage() {
  return (
    <div style={{ padding: 12, textAlign: "center", color: "#999", fontSize: "0.78rem" }}>
      No sizes match the minimum
    </div>
  );
}
