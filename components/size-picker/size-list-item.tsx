"use client";

import { getEquiv, metaStr } from "@/lib/utils/size-utils";

interface SizeListItemProps {
  width: number;
  length: number;
  wallHeight: number;
  showArea: boolean;
  showVolume: boolean;
  showEquiv: boolean;
  onClick: () => void;
}

export function SizeListItem({
  width, length, wallHeight, showArea, showVolume, showEquiv, onClick,
}: SizeListItemProps) {
  const area = width * length;
  const eq = getEquiv(area);
  const meta = metaStr(width, length, wallHeight, showArea, showVolume);

  return (
    <div className="li" style={{ paddingLeft: 12 }} onClick={onClick}>
      <div className="li-left">
        <span className="li-dim">{width}&apos;x{length}&apos;</span>
        {showEquiv && <span className="li-equiv">{eq.label}</span>}
      </div>
      <div className="li-right">
        {meta && <span className="li-meta">{meta}</span>}
      </div>
    </div>
  );
}
