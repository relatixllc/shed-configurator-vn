const MOWER_WALK = 24;
const BENCH_DEPTH = 30;
const SHELF_WALK = 18;

export function mowerDesc(sf: number): string {
  if (sf === 48) return `Small mower (~6'x8') + ${MOWER_WALK} sf walkway`;
  if (sf === 60) return `Medium mower (~5'x7' deck) + ${MOWER_WALK} sf walkway`;
  if (sf === 80) return `Zero-turn (~6'x8' deck) + ${MOWER_WALK} sf walkway`;
  return "";
}

export function calcBench(w: number) {
  if (w === 0) return { bench: 0, walk: 0 };
  const benchSf = Math.round((w * BENCH_DEPTH) / 144);
  const totalSf = Math.round(((w + 24) * (BENCH_DEPTH + 36)) / 144);
  return { bench: benchSf, walk: totalSf - benchSf };
}

export function benchDesc(w: number): string {
  if (w === 0) return "";
  const b = calcBench(w);
  return `${w}"W x ${BENCH_DEPTH}"D bench = ${b.bench} sf + ${b.walk} sf to work around it`;
}

export function calcShelf(shelfW: number, shelfD: number, qty: number) {
  if (shelfW === 0) return { shelf: 0, walk: 0, total: 0 };
  const unitSf = Math.round((shelfW * shelfD) / 144);
  const walkSf = Math.round((shelfW * SHELF_WALK) / 144);
  return {
    shelf: unitSf * qty,
    walk: walkSf * qty,
    total: (unitSf + walkSf) * qty,
  };
}

export function shelfDesc(shelfW: number, shelfD: number, qty: number): string {
  if (shelfW === 0) return "";
  const s = calcShelf(shelfW, shelfD, qty);
  return `${qty}x ${shelfW}"x${shelfD}" shelf = ${s.shelf} sf + ${s.walk} sf access space`;
}

export function computeTally(
  useSf: number,
  useName: string,
  mowerSf: number,
  mowerName: string,
  selectedDoor: string | null,
  benchW: number,
  shelfW: number,
  shelfD: number,
  shelfQty: number
) {
  const b = calcBench(benchW);
  const s = calcShelf(shelfW, shelfD, shelfQty);

  if (!useSf && !mowerSf && !benchW && !shelfW) {
    return { rows: [], total: 0 };
  }

  const totalMower = mowerSf > 0 ? mowerSf + MOWER_WALK : 0;
  const totalBench = b.bench + b.walk;
  const totalShelf = s.total;
  const total = useSf + totalMower + totalBench + totalShelf;

  const rows: Array<{ label: string; value: string; isTotal?: boolean; isCheck?: boolean }> = [];

  if (useSf) rows.push({ label: useName, value: `${useSf} sf` });
  if (mowerSf > 0) {
    rows.push({ label: `${mowerName} mower`, value: `${mowerSf} sf` });
    rows.push({ label: "Mower walkway", value: `+ ${MOWER_WALK} sf` });
    if (selectedDoor) {
      const doorLabel =
        selectedDoor === "6dbl-front" ? "Front 6' double door" :
        selectedDoor === "6gar" ? "Front 6' garage door" :
        selectedDoor === "8roll" ? "Front 8' rollup door" :
        selectedDoor === "6dbl-side" ? "Side 6' double door" : "";
      rows.push({ label: doorLabel, value: "\u2713", isCheck: true });
    }
  }
  if (benchW > 0) {
    rows.push({ label: `Workbench ${benchW}"x${BENCH_DEPTH}"`, value: `${b.bench} sf` });
    rows.push({ label: "Bench work area", value: `+ ${b.walk} sf` });
  }
  if (shelfW > 0) {
    rows.push({ label: `Shelving ${shelfQty}x ${shelfW}"x${shelfD}"`, value: `${s.shelf} sf` });
    rows.push({ label: "Shelf access space", value: `+ ${s.walk} sf` });
  }
  rows.push({ label: "Minimum needed", value: `${total} sf`, isTotal: true });

  return { rows, total };
}
