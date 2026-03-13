"use client";

import { useState, type ReactNode } from "react";

interface SizeGroupProps {
  label: string;
  rangeText: string;
  badge?: ReactNode;
  children: ReactNode;
}

export function SizeGroup({ label, rangeText, badge, children }: SizeGroupProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="wg">
      <div
        className={`wg-head ${expanded ? "exp" : ""}`}
        onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
      >
        <span className="chev">&#9654;</span>
        <span className="wlabel">{label}</span>
        {badge || <span className="wrange">{rangeText}</span>}
      </div>
      <div className={`wg-body ${expanded ? "show" : ""}`}>
        {children}
      </div>
    </div>
  );
}
