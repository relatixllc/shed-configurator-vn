import type { EquivTier } from "@/lib/types";
import { EQUIV_TIERS } from "@/lib/data/sizes";

export function getEquiv(area: number): EquivTier {
  return EQUIV_TIERS.find((e) => area <= e.max)!;
}

export function fmtN(n: number): string {
  return n.toLocaleString();
}

export function metaStr(
  w: number,
  l: number,
  wallHeight: number,
  showArea: boolean,
  showVolume: boolean
): string {
  const a = w * l;
  const v = a * wallHeight;
  const parts: string[] = [];
  if (showArea) parts.push(fmtN(a) + " sf");
  if (showVolume) parts.push(fmtN(v) + " cf");
  return parts.join(" / ");
}

export function meetsMin(w: number, l: number, minSf: number): boolean {
  return minSf <= 0 || w * l >= minSf;
}
