"use client";

import { useState, useRef, useCallback } from "react";
import toolRackImg from "@/lib/assets/gallery/tool-rack-on-shed-wall.png";
import bicycleRackImg from "@/lib/assets/gallery/bicycle-rack-on-shed-wall.png";
import shelfWithTotesImg from "@/lib/assets/gallery/shelf-with-totes.png";

export function LB1636() {
  const [rotated, setRotated] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const planGroupRef = useRef<SVGGElement>(null);
  const shelfTipRef = useRef<SVGGElement>(null);
  const tipBgRef = useRef<SVGRectElement>(null);
  const tipTxtRef = useRef<SVGTextElement>(null);
  const wbTipRef = useRef<SVGGElement>(null);
  const mowerTipRef = useRef<SVGGElement>(null);
  const bikeTipRef = useRef<SVGGElement>(null);
  const toolTipRef = useRef<SVGGElement>(null);

  const tipActiveRef = useRef(false);
  const wbTipOnRef = useRef(false);
  const mowerTipOnRef = useRef(false);
  const bikeTipOnRef = useRef(false);
  const toolTipOnRef = useRef(false);
  const activeShelfRef = useRef<SVGRectElement | null>(null);
  const activeLoftRef = useRef<SVGGElement | null>(null);

  const showTipAt = useCallback((cx: number, ty: number, label: string, isRotated: boolean) => {
    const tip = shelfTipRef.current;
    const bg = tipBgRef.current;
    const txt = tipTxtRef.current;
    if (!tip || !bg || !txt) return;
    const tw = label.length * 13 + 36;
    bg.setAttribute("width", String(tw));
    bg.setAttribute("height", "52");
    txt.setAttribute("x", String(tw / 2));
    txt.setAttribute("y", "33");
    txt.textContent = label;
    let sx = cx, sy = ty;
    if (isRotated) { sx = 390 - (ty - 265); sy = 265 + (cx - 390); }
    const s = isRotated ? 0.72 : 1;
    tip.setAttribute("transform", `translate(${sx - tw * s / 2},${sy}) scale(${s})`);
    tip.setAttribute("opacity", "1");
    tipActiveRef.current = true;
  }, []);

  const hideTip = useCallback(() => {
    shelfTipRef.current?.setAttribute("opacity", "0");
    tipActiveRef.current = false;
    wbTipRef.current?.setAttribute("opacity", "0");
    wbTipOnRef.current = false;
    mowerTipRef.current?.setAttribute("opacity", "0");
    mowerTipOnRef.current = false;
    bikeTipRef.current?.setAttribute("opacity", "0");
    bikeTipOnRef.current = false;
    toolTipRef.current?.setAttribute("opacity", "0");
    toolTipOnRef.current = false;
    document.querySelectorAll(".shelf-hl").forEach((r) => {
      r.setAttribute("stroke", "#000");
      r.setAttribute("stroke-width", "1.2");
    });
  }, []);

  const handleRotate = useCallback(() => {
    setRotated((prev) => {
      const next = !prev;
      const svg = svgRef.current;
      const g = planGroupRef.current;
      if (svg && g) {
        if (next) {
          svg.setAttribute("viewBox", "110 -50 560 680");
          g.style.transform = "rotate(90deg)";
        } else {
          svg.setAttribute("viewBox", "0 0 780 540");
          g.style.transform = "rotate(0deg)";
        }
      }
      hideTip();
      return next;
    });
  }, [hideTip]);

  const handleShelfEnter = useCallback((e: React.MouseEvent<SVGRectElement>) => {
    const rect = e.currentTarget;
    rect.setAttribute("stroke", "#c8553d");
    rect.setAttribute("stroke-width", "2.5");
    const x = +rect.getAttribute("x")!;
    const y = +rect.getAttribute("y")!;
    const w = +rect.getAttribute("width")!;
    const h = +rect.getAttribute("height")!;
    const cx = x + w / 2;
    let ty = y - 60;
    if (ty < 60) ty = y + h + 10;
    showTipAt(cx, ty, '24" × 72" Shelf — 12 sq ft', rotated);
  }, [showTipAt, rotated]);

  const handleShelfLeave = useCallback((e: React.MouseEvent<SVGRectElement>) => {
    const rect = e.currentTarget;
    rect.setAttribute("stroke", "#000");
    rect.setAttribute("stroke-width", "1.2");
    shelfTipRef.current?.setAttribute("opacity", "0");
    tipActiveRef.current = false;
  }, []);

  const handleShelfTouch = useCallback((e: React.TouchEvent<SVGRectElement>) => {
    e.stopPropagation();
    const rect = e.currentTarget;
    if (activeShelfRef.current === rect) {
      rect.setAttribute("stroke", "#000");
      rect.setAttribute("stroke-width", "1.2");
      shelfTipRef.current?.setAttribute("opacity", "0");
      tipActiveRef.current = false;
      activeShelfRef.current = null;
    } else {
      hideTip();
      document.querySelectorAll(".shelf-hl").forEach((r) => {
        r.setAttribute("stroke", "#000");
        r.setAttribute("stroke-width", "1.2");
      });
      rect.setAttribute("stroke", "#c8553d");
      rect.setAttribute("stroke-width", "2.5");
      const x = +rect.getAttribute("x")!;
      const y = +rect.getAttribute("y")!;
      const w = +rect.getAttribute("width")!;
      const h = +rect.getAttribute("height")!;
      const cx = x + w / 2;
      let ty = y - 60;
      if (ty < 60) ty = y + h + 10;
      showTipAt(cx, ty, '24" × 72" Shelf — 12 sq ft', rotated);
      activeShelfRef.current = rect;
    }
  }, [hideTip, showTipAt, rotated]);

  const handleLoftEnter = useCallback((g: SVGGElement) => {
    const dr = g.querySelectorAll("rect")[1];
    if (dr) { dr.setAttribute("stroke", "#c8553d"); dr.setAttribute("stroke-width", "3"); }
    const r = g.querySelector("rect")!;
    const x = +r.getAttribute("x")!;
    const y = +r.getAttribute("y")!;
    const w = +r.getAttribute("width")!;
    const h = +r.getAttribute("height")!;
    const sqft = g.getAttribute("data-sqft");
    const cx = x + w / 2;
    const ty = y + h / 2 - 26;
    showTipAt(cx, ty, `Loft — ${sqft} sq ft`, rotated);
    activeLoftRef.current = g;
  }, [showTipAt, rotated]);

  const handleLoftLeave = useCallback((g: SVGGElement) => {
    shelfTipRef.current?.setAttribute("opacity", "0");
    tipActiveRef.current = false;
    const dr = g.querySelectorAll("rect")[1];
    if (dr) { dr.setAttribute("stroke", "#000"); dr.setAttribute("stroke-width", "1.8"); }
    activeLoftRef.current = null;
  }, []);

  const handleLoftTouch = useCallback((e: React.TouchEvent<SVGGElement>, g: SVGGElement) => {
    e.stopPropagation();
    if (activeLoftRef.current === g) {
      handleLoftLeave(g);
    } else {
      if (activeLoftRef.current) handleLoftLeave(activeLoftRef.current);
      hideTip();
      handleLoftEnter(g);
    }
  }, [handleLoftEnter, handleLoftLeave, hideTip]);

  const showWbTip = useCallback(() => {
    const tip = wbTipRef.current;
    if (!tip) return;
    const tw = 310, lcx = 400, lty = 42;
    let sx = lcx, sy = lty;
    if (rotated) { sx = 390 - (lty - 265); sy = 265 + (lcx - 390); }
    const s = rotated ? 0.72 : 1;
    tip.setAttribute("transform", `translate(${sx - tw * s / 2},${sy}) scale(${s})`);
    tip.setAttribute("opacity", "1");
    wbTipOnRef.current = true;
  }, [rotated]);

  const hideWbTip = useCallback(() => {
    wbTipRef.current?.setAttribute("opacity", "0");
    wbTipOnRef.current = false;
  }, []);

  const showMowerTip = useCallback(() => {
    const tip = mowerTipRef.current;
    if (!tip) return;
    const tw = 290, lcx = 400, lty = 182;
    let sx = lcx, sy = lty;
    if (rotated) { sx = 390 - (lty - 265); sy = 265 + (lcx - 390); }
    const s = rotated ? 0.72 : 1;
    tip.setAttribute("transform", `translate(${sx - tw * s / 2},${sy}) scale(${s})`);
    tip.setAttribute("opacity", "1");
    mowerTipOnRef.current = true;
  }, [rotated]);

  const hideMowerTip = useCallback(() => {
    mowerTipRef.current?.setAttribute("opacity", "0");
    mowerTipOnRef.current = false;
  }, []);

  const showBikeTip = useCallback(() => {
    const tip = bikeTipRef.current;
    if (!tip) return;
    const tw = 180, lcx = 280, lty = 315;
    let sx = lcx, sy = lty;
    if (rotated) { sx = 390 - (lty - 265); sy = 265 + (lcx - 390); }
    const s = rotated ? 0.72 : 1;
    tip.setAttribute("transform", `translate(${sx - tw * s / 2},${sy}) scale(${s})`);
    tip.setAttribute("opacity", "1");
    bikeTipOnRef.current = true;
  }, [rotated]);

  const hideBikeTip = useCallback(() => {
    bikeTipRef.current?.setAttribute("opacity", "0");
    bikeTipOnRef.current = false;
  }, []);

  const showToolTip = useCallback(() => {
    const tip = toolTipRef.current;
    if (!tip) return;
    const tw = 150, lcx = 518, lty = 315;
    let sx = lcx, sy = lty;
    if (rotated) { sx = 390 - (lty - 265); sy = 265 + (lcx - 390); }
    const s = rotated ? 0.72 : 1;
    tip.setAttribute("transform", `translate(${sx - tw * s / 2},${sy}) scale(${s})`);
    tip.setAttribute("opacity", "1");
    toolTipOnRef.current = true;
  }, [rotated]);

  const hideToolTip = useCallback(() => {
    toolTipRef.current?.setAttribute("opacity", "0");
    toolTipOnRef.current = false;
  }, []);

  const handleSvgClick = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const target = e.target as Element;
    if (tipActiveRef.current && !target.classList.contains("shelf-hl") && !target.closest(".wb-area") && !target.closest(".mower-area") && !target.closest(".bike-area") && !target.closest(".tool-area")) {
      hideTip();
    }
    if (wbTipOnRef.current && !target.closest(".wb-area")) hideWbTip();
    if (mowerTipOnRef.current && !target.closest(".mower-area")) hideMowerTip();
    if (bikeTipOnRef.current && !target.closest(".bike-area")) hideBikeTip();
    if (toolTipOnRef.current && !target.closest(".tool-area")) hideToolTip();
  }, [hideTip, hideWbTip, hideMowerTip, hideBikeTip, hideToolTip]);

  // Shelf data: [x, y, width, height] pairs for all 12 shelf rects
  const shelfColumns = [
    { x: 133, shelves: [[133, 97, 32, 100], [133, 202, 32, 103]] },
    { x: 211, shelves: [[211, 97, 32, 100], [211, 202, 32, 103]] },
    { x: 289, shelves: [[289, 97, 32, 100], [289, 202, 32, 103]] },
    { x: 480, shelves: [[480, 97, 32, 100], [480, 202, 32, 103]] },
    { x: 558, shelves: [[558, 97, 32, 100], [558, 202, 32, 103]] },
    { x: 636, shelves: [[636, 97, 32, 100], [636, 202, 32, 103]] },
  ];

  const shelfLines = [
    [133, 122], [133, 147], [133, 172],
    [133, 227], [133, 252], [133, 277],
    [211, 122], [211, 147], [211, 172],
    [211, 227], [211, 252], [211, 277],
    [289, 122], [289, 147], [289, 172],
    [289, 227], [289, 252], [289, 277],
    [480, 122], [480, 147], [480, 172],
    [480, 227], [480, 252], [480, 277],
    [558, 122], [558, 147], [558, 172],
    [558, 227], [558, 252], [558, 277],
    [636, 122], [636, 147], [636, 172],
    [636, 227], [636, 252], [636, 277],
  ];

  return (
    <div className="fp-page">
      <header className="fp-header">
        <h1>16&apos; × 36&apos; Lofted Barn - 2 Lofts 2 Windows</h1>
        <p>Floor plan with shelving, workbench, riding mower, and lofts</p>
        <div className="fp-badge-row">
          <span className="fp-badge">2×6 FRAMING</span>
          <span className="fp-badge">16&quot; O.C.</span>
          <span className="fp-badge">6×6 DBL DOOR</span>
          <span className="fp-badge">6/12 PITCH</span>
          <span className="fp-badge">2 LOFTS</span>
        </div>
      </header>

      <div className="fp-plan-section">
        <button
          className={`fp-rotate-btn ${rotated ? "on" : ""}`}
          onClick={handleRotate}
        >
          <svg className="fp-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 4v6h6" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
          Rotate building
        </button>

        <div className="fp-plan-wrap">
          <svg
            ref={svgRef}
            viewBox={rotated ? "110 -50 560 680" : "0 0 780 540"}
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleSvgClick}
          >
            <defs>
              <pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="8" stroke="#000" strokeWidth="0.6" opacity="0.12" />
              </pattern>
            </defs>

            <g
              ref={planGroupRef}
              id="planGroup"
              style={{ transform: rotated ? "rotate(90deg)" : "rotate(0deg)", transformOrigin: "390px 265px", transition: "transform .4s ease" }}
            >
              {/* Grid */}
              <g opacity="0.05" stroke="#000" strokeWidth="0.5">
                {[40,80,120,160,200,240,280,320,360,400,440,480,520,560,600,640,680,720,760].map(x => (
                  <line key={`gv${x}`} x1={x} y1="0" x2={x} y2="540" />
                ))}
                {[40,80,120,160,200,240,280,320,360,400,440,480,520].map(y => (
                  <line key={`gh${y}`} x1="0" y1={y} x2="780" y2={y} />
                ))}
              </g>

              {/* Walls */}
              <rect x="120" y="90" width="560" height="300" fill="none" stroke="#000" strokeWidth="3" />
              <rect x="127" y="97" width="546" height="286" fill="none" stroke="#000" strokeWidth="0.6" />
              {/* Corner blocks */}
              <rect x="120" y="90" width="7" height="7" fill="#000" opacity="0.3" />
              <rect x="673" y="90" width="7" height="7" fill="#000" opacity="0.3" />
              <rect x="120" y="383" width="7" height="7" fill="#000" opacity="0.3" />
              <rect x="673" y="383" width="7" height="7" fill="#000" opacity="0.3" />

              {/* Studs top */}
              <g stroke="#000" strokeWidth="0.4" opacity="0.4">
                {[142,164,186,208,230,252,274,296,318,340,362,384,406,428,450,472,494,516,538,560,582,604,626,648,670].map(x => (
                  <line key={`st${x}`} x1={x} y1="90" x2={x} y2="97" />
                ))}
              </g>
              {/* Studs bottom */}
              <g stroke="#000" strokeWidth="0.4" opacity="0.4">
                {[142,230,252,274,296,494,516,538,560,670].map(x => (
                  <line key={`sb${x}`} x1={x} y1="383" x2={x} y2="390" />
                ))}
              </g>
              {/* Studs left */}
              <g stroke="#000" strokeWidth="0.4" opacity="0.4">
                {[112,134,156,178,200,222,244,266,288,310,332,354,376].map(y => (
                  <line key={`sl${y}`} x1="120" y1={y} x2="127" y2={y} />
                ))}
              </g>
              {/* Studs right */}
              <g stroke="#000" strokeWidth="0.4" opacity="0.4">
                {[112,134,156,178,200,222,244,266,288,310,332,354,376].map(y => (
                  <line key={`sr${y}`} x1="673" y1={y} x2="680" y2={y} />
                ))}
              </g>

              {/* Window left */}
              <rect x="165" y="380" width="46" height="14" fill="#fff" />
              <line x1="164" y1="383" x2="164" y2="390" stroke="#000" strokeWidth="2" />
              <line x1="208" y1="383" x2="208" y2="390" stroke="#000" strokeWidth="2" />
              <line x1="167" y1="383" x2="167" y2="390" stroke="#000" strokeWidth="1.2" />
              <line x1="205" y1="383" x2="205" y2="390" stroke="#000" strokeWidth="1.2" />
              <line x1="164" y1="381" x2="208" y2="381" stroke="#000" strokeWidth="2.2" />
              <line x1="167" y1="389" x2="205" y2="389" stroke="#000" strokeWidth="1.2" />
              <line x1="170" y1="384" x2="202" y2="384" stroke="#000" strokeWidth="0.6" />
              <line x1="170" y1="386.5" x2="202" y2="386.5" stroke="#000" strokeWidth="0.6" />
              <line x1="186" y1="382" x2="186" y2="388" stroke="#000" strokeWidth="0.5" opacity="0.5" />

              {/* Window right */}
              <rect x="589" y="380" width="46" height="14" fill="#fff" />
              <line x1="582" y1="383" x2="582" y2="390" stroke="#000" strokeWidth="2" />
              <line x1="636" y1="383" x2="636" y2="390" stroke="#000" strokeWidth="2" />
              <line x1="590" y1="383" x2="590" y2="390" stroke="#000" strokeWidth="1.2" />
              <line x1="633" y1="383" x2="633" y2="390" stroke="#000" strokeWidth="1.2" />
              <line x1="582" y1="381" x2="636" y2="381" stroke="#000" strokeWidth="2.2" />
              <line x1="590" y1="389" x2="633" y2="389" stroke="#000" strokeWidth="1.2" />
              <line x1="592" y1="384" x2="631" y2="384" stroke="#000" strokeWidth="0.6" />
              <line x1="592" y1="386.5" x2="631" y2="386.5" stroke="#000" strokeWidth="0.6" />
              <line x1="611" y1="382" x2="611" y2="388" stroke="#000" strokeWidth="0.5" opacity="0.5" />

              {/* Door */}
              <rect x="350" y="380" width="100" height="14" fill="#fff" />
              <line x1="348" y1="383" x2="348" y2="390" stroke="#000" strokeWidth="2.5" />
              <line x1="452" y1="383" x2="452" y2="390" stroke="#000" strokeWidth="2.5" />
              <line x1="351" y1="383" x2="351" y2="390" stroke="#000" strokeWidth="1.4" />
              <line x1="449" y1="383" x2="449" y2="390" stroke="#000" strokeWidth="1.4" />
              <line x1="348" y1="381" x2="452" y2="381" stroke="#000" strokeWidth="2.8" />
              <line x1="348" y1="379" x2="452" y2="379" stroke="#000" strokeWidth="0.7" opacity="0.5" />
              {/* Door swing arcs */}
              <path d="M400 390 L400 440" stroke="#000" strokeWidth="0.5" strokeDasharray="5 4" opacity="0.25" fill="none" />
              <path d="M351 390 A49 49 0 0 0 400 440" fill="none" stroke="#000" strokeWidth="0.7" strokeDasharray="4 3" opacity="0.3" />
              <path d="M449 390 A49 49 0 0 1 400 440" fill="none" stroke="#000" strokeWidth="0.7" strokeDasharray="4 3" opacity="0.3" />
              <line x1="351" y1="390" x2="376" y2="434" stroke="#000" strokeWidth="0.5" opacity="0.35" />
              <line x1="449" y1="390" x2="424" y2="434" stroke="#000" strokeWidth="0.5" opacity="0.35" />

              {/* Workbench */}
              <g
                className="wb-area"
                onMouseEnter={showWbTip}
                onMouseLeave={hideWbTip}
                onTouchStart={(e) => { e.stopPropagation(); if (wbTipOnRef.current) hideWbTip(); else { hideTip(); showWbTip(); } }}
              >
                <rect x="350" y="97" width="100" height="45" fill="#d4c9a8" stroke="#000" strokeWidth="2" />
                <rect x="350" y="110" width="10" height="16" fill="#aaa" stroke="#000" strokeWidth="0.8" />
              </g>

              {/* Shelving */}
              {shelfColumns.map((col) =>
                col.shelves.map(([sx, sy, sw, sh]) => (
                  <rect
                    key={`s${sx}-${sy}`}
                    x={sx} y={sy} width={sw} height={sh}
                    fill="#eee" stroke="#000" strokeWidth="1.2"
                    className="shelf-hl"
                    style={{ cursor: "pointer" }}
                    onMouseEnter={handleShelfEnter}
                    onMouseLeave={handleShelfLeave}
                    onTouchStart={handleShelfTouch}
                  />
                ))
              )}
              {/* Shelf lines */}
              {shelfLines.map(([sx, sy]) => (
                <line key={`sl${sx}-${sy}`} x1={sx} y1={sy} x2={sx + 32} y2={sy} stroke="#000" strokeWidth="0.4" opacity="0.3" />
              ))}

              {/* Alignment line */}
              <line x1="128" y1="305" x2="672" y2="305" stroke="#000" strokeWidth="0.5" strokeDasharray="3 5" opacity="0.15" />

              {/* Bicycle rack */}
              <g
                className="bike-area"
                onMouseEnter={showBikeTip}
                onMouseLeave={hideBikeTip}
                onTouchStart={(e) => { e.stopPropagation(); if (bikeTipOnRef.current) hideBikeTip(); else { hideTip(); showBikeTip(); } }}
              >
                <rect x="225" y="338" width="110" height="52" fill="rgba(0,0,0,0)" stroke="none" />
                <line x1="230" y1="385" x2="330" y2="385" stroke="#000" strokeWidth="2.5" />
                <circle cx="240" cy="385" r="2" fill="#000" />
                <circle cx="270" cy="385" r="2" fill="#000" />
                <circle cx="300" cy="385" r="2" fill="#000" />
                <circle cx="330" cy="385" r="2" fill="#000" />
                {/* 4 bikes */}
                {[240, 270, 300, 330].map(bx => (
                  <g key={`bike${bx}`}>
                    <ellipse cx={bx} cy="366" rx="3.5" ry="18" fill="none" stroke="#000" strokeWidth="1.2" />
                    <circle cx={bx} cy="352" r="4" fill="none" stroke="#000" strokeWidth="0.8" />
                    <circle cx={bx} cy="380" r="4" fill="none" stroke="#000" strokeWidth="0.8" />
                    <line x1={bx} y1="356" x2={bx} y2="376" stroke="#000" strokeWidth="0.6" />
                  </g>
                ))}
              </g>

              {/* Tool rack */}
              <g
                className="tool-area"
                onMouseEnter={showToolTip}
                onMouseLeave={hideToolTip}
                onTouchStart={(e) => { e.stopPropagation(); if (toolTipOnRef.current) hideToolTip(); else { hideTip(); showToolTip(); } }}
              >
                <rect x="462" y="338" width="110" height="52" fill="rgba(0,0,0,0)" stroke="none" />
                {/* Rack board */}
                <rect x="468" y="380" width="100" height="8" rx="1" fill="#c4a87a" stroke="#000" strokeWidth="1.2" />
                {/* Hooks */}
                <line x1="478" y1="380" x2="478" y2="375" stroke="#000" strokeWidth="1" />
                <line x1="498" y1="380" x2="498" y2="375" stroke="#000" strokeWidth="1" />
                <line x1="518" y1="380" x2="518" y2="375" stroke="#000" strokeWidth="1" />
                <line x1="538" y1="380" x2="538" y2="375" stroke="#000" strokeWidth="1" />
                <line x1="558" y1="380" x2="558" y2="375" stroke="#000" strokeWidth="1" />
                {/* Hammer */}
                <rect x="474" y="356" width="4" height="22" rx="1" fill="#a07040" stroke="#000" strokeWidth="0.6" />
                <rect x="471" y="350" width="10" height="8" rx="1" fill="#888" stroke="#000" strokeWidth="0.8" />
                {/* Saw */}
                <path d="M494 374 L494 348 L504 348 L504 358 Z" fill="#ccc" stroke="#000" strokeWidth="0.6" />
                <rect x="494" y="358" width="4" height="16" rx="1" fill="#a07040" stroke="#000" strokeWidth="0.6" />
                {/* Wrench */}
                <rect x="515" y="350" width="3" height="26" rx="1" fill="#999" stroke="#000" strokeWidth="0.6" />
                <circle cx="516" cy="350" r="4" fill="none" stroke="#000" strokeWidth="0.8" />
                {/* Pliers */}
                <rect x="535" y="354" width="3" height="22" rx="1" fill="#888" stroke="#000" strokeWidth="0.6" />
                <rect x="539" y="354" width="3" height="22" rx="1" fill="#888" stroke="#000" strokeWidth="0.6" />
                <ellipse cx="538" cy="352" rx="5" ry="3" fill="none" stroke="#000" strokeWidth="0.8" />
                {/* Screwdriver */}
                <rect x="556" y="358" width="2.5" height="18" rx="0.5" fill="#d44" stroke="#000" strokeWidth="0.5" />
                <rect x="555" y="348" width="4" height="12" rx="1" fill="#ccc" stroke="#000" strokeWidth="0.5" />
              </g>

              {/* Mower */}
              <g
                className="mower-area"
                onMouseEnter={showMowerTip}
                onMouseLeave={hideMowerTip}
                onTouchStart={(e) => { e.stopPropagation(); if (mowerTipOnRef.current) hideMowerTip(); else { hideTip(); showMowerTip(); } }}
              >
                <rect x="355" y="215" width="90" height="100" fill="rgba(0,0,0,0)" stroke="none" />
                <rect x="378" y="218" width="44" height="20" rx="4" fill="#ccc" stroke="#000" strokeWidth="1.8" />
                <circle cx="384" cy="221" r="3" fill="#fff" stroke="#000" strokeWidth="1" />
                <circle cx="416" cy="221" r="3" fill="#fff" stroke="#000" strokeWidth="1" />
                <rect x="370" y="218" width="11" height="16" rx="4" fill="#111" stroke="#000" strokeWidth="1.4" />
                <rect x="419" y="218" width="11" height="16" rx="4" fill="#111" stroke="#000" strokeWidth="1.4" />
                <rect x="360" y="226" width="80" height="34" rx="3" fill="none" stroke="#000" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.4" />
                <rect x="374" y="234" width="52" height="58" rx="5" fill="#ddd" stroke="#000" strokeWidth="2" />
                <rect x="394" y="240" width="12" height="14" rx="1" fill="#bbb" stroke="#000" strokeWidth="0.6" />
                <circle cx="400" cy="248" r="9" fill="none" stroke="#000" strokeWidth="2" />
                <circle cx="400" cy="248" r="2.5" fill="#000" />
                <rect x="386" y="258" width="28" height="18" rx="6" fill="#999" stroke="#000" strokeWidth="1.2" />
                <rect x="388" y="276" width="24" height="9" rx="3" fill="#777" stroke="#000" strokeWidth="1" />
                <rect x="376" y="282" width="48" height="8" rx="1" fill="#555" stroke="#000" strokeWidth="0.8" />
                <rect x="376" y="288" width="5" height="5" rx="1" fill="#333" stroke="#000" strokeWidth="0.6" />
                <rect x="419" y="288" width="5" height="5" rx="1" fill="#333" stroke="#000" strokeWidth="0.6" />
                <line x1="378" y1="290" x2="422" y2="290" stroke="#000" strokeWidth="1.5" />
                <rect x="362" y="280" width="16" height="25" rx="6" fill="#111" stroke="#000" strokeWidth="1.8" />
                <rect x="422" y="280" width="16" height="25" rx="6" fill="#111" stroke="#000" strokeWidth="1.8" />
                <path d="M374 280 Q374 274 368 274 L368 308 Q374 308 374 302" fill="none" stroke="#000" strokeWidth="0.8" opacity="0.6" />
                <path d="M426 280 Q426 274 432 274 L432 308 Q426 308 426 302" fill="none" stroke="#000" strokeWidth="0.8" opacity="0.6" />
                <circle cx="426" cy="286" r="3" fill="#666" stroke="#000" strokeWidth="0.6" />
              </g>

              {/* Loft left */}
              <g
                className="loft-area"
                data-sqft="64"
                onMouseEnter={(e) => handleLoftEnter(e.currentTarget)}
                onMouseLeave={(e) => handleLoftLeave(e.currentTarget)}
                onTouchStart={(e) => handleLoftTouch(e, e.currentTarget)}
              >
                <rect x="127" y="97" width="60" height="286" fill="url(#hatch)" stroke="none" />
                <rect x="127" y="97" width="60" height="286" fill="rgba(0,0,0,0)" stroke="#000" strokeWidth="1.8" strokeDasharray="10 5" />
                <text x="157" y="230" textAnchor="middle" fill="#000" fontSize="13" fontWeight="600" opacity="0.45" transform="rotate(-90 157 230)">4&apos; × 16&apos; LOFT ABOVE</text>
              </g>

              {/* Loft right */}
              <g
                className="loft-area"
                data-sqft="64"
                onMouseEnter={(e) => handleLoftEnter(e.currentTarget)}
                onMouseLeave={(e) => handleLoftLeave(e.currentTarget)}
                onTouchStart={(e) => handleLoftTouch(e, e.currentTarget)}
              >
                <rect x="613" y="97" width="60" height="286" fill="url(#hatch)" stroke="none" />
                <rect x="613" y="97" width="60" height="286" fill="rgba(0,0,0,0)" stroke="#000" strokeWidth="1.8" strokeDasharray="10 5" />
                <text x="643" y="230" textAnchor="middle" fill="#000" fontSize="13" fontWeight="600" opacity="0.45" transform="rotate(-90 643 230)">4&apos; × 16&apos; LOFT ABOVE</text>
              </g>

              {/* Light paths */}
              <line x1="186" y1="380" x2="186" y2="97" stroke="#daa520" strokeWidth="2" strokeDasharray="8 5" opacity="0.2" />
              <line x1="611" y1="380" x2="611" y2="97" stroke="#daa520" strokeWidth="2" strokeDasharray="8 5" opacity="0.2" />

              {/* Walk paths */}
              <path d="M380 430 L380 330 Q380 318 340 318 L320 318 Q310 318 310 308 L310 306" fill="none" stroke="#000" strokeWidth="1.2" strokeDasharray="6 5" opacity="0.2" />
              <path d="M420 430 L420 330 Q420 318 460 318 L480 318 Q490 318 490 308 L490 306" fill="none" stroke="#000" strokeWidth="1.2" strokeDasharray="6 5" opacity="0.2" />

              {/* Dimensions */}
              {/* Top: 36' */}
              <line x1="120" y1="52" x2="680" y2="52" stroke="#000" strokeWidth="1" />
              <line x1="120" y1="42" x2="120" y2="62" stroke="#000" strokeWidth="1" />
              <line x1="680" y1="42" x2="680" y2="62" stroke="#000" strokeWidth="1" />
              <text x="400" y="46" textAnchor="middle" fill="#000" fontSize="18" fontWeight="700">36&apos;-0&quot;</text>

              {/* Left: 16' */}
              <line x1="100" y1="90" x2="100" y2="390" stroke="#000" strokeWidth="1" />
              <line x1="92" y1="90" x2="108" y2="90" stroke="#000" strokeWidth="1" />
              <line x1="92" y1="390" x2="108" y2="390" stroke="#000" strokeWidth="1" />
              <text x="94" y="245" textAnchor="middle" fill="#000" fontSize="18" fontWeight="700" transform="rotate(-90 94 245)">16&apos;-0&quot;</text>

              {/* Loft dims */}
              <line x1="127" y1="72" x2="187" y2="72" stroke="#000" strokeWidth="0.8" />
              <line x1="127" y1="66" x2="127" y2="78" stroke="#000" strokeWidth="0.8" />
              <line x1="187" y1="66" x2="187" y2="78" stroke="#000" strokeWidth="0.8" />
              <text x="157" y="66" textAnchor="middle" fill="#000" fontSize="15" fontWeight="600">4&apos;-0&quot;</text>

              <line x1="613" y1="72" x2="673" y2="72" stroke="#000" strokeWidth="0.8" />
              <line x1="613" y1="66" x2="613" y2="78" stroke="#000" strokeWidth="0.8" />
              <line x1="673" y1="66" x2="673" y2="78" stroke="#000" strokeWidth="0.8" />
              <text x="643" y="66" textAnchor="middle" fill="#000" fontSize="15" fontWeight="600">4&apos;-0&quot;</text>

              {/* Stud spacing dim */}
              <line x1="208" y1="72" x2="230" y2="72" stroke="#000" strokeWidth="0.6" />
              <line x1="208" y1="66" x2="208" y2="78" stroke="#000" strokeWidth="0.6" />
              <line x1="230" y1="66" x2="230" y2="78" stroke="#000" strokeWidth="0.6" />
              <text x="219" y="66" textAnchor="middle" fill="#000" fontSize="14" fontWeight="600">16&quot; O.C.</text>

              {/* Door dim */}
              <line x1="351" y1="462" x2="449" y2="462" stroke="#000" strokeWidth="1" />
              <line x1="351" y1="452" x2="351" y2="472" stroke="#000" strokeWidth="1" />
              <line x1="449" y1="452" x2="449" y2="472" stroke="#000" strokeWidth="1" />
              <text x="400" y="492" textAnchor="middle" fill="#000" fontSize="16" fontWeight="600">6&apos;-0&quot; DBL DOOR</text>

              {/* Window dims */}
              <line x1="167" y1="412" x2="205" y2="412" stroke="#000" strokeWidth="0.8" />
              <line x1="167" y1="404" x2="167" y2="420" stroke="#000" strokeWidth="0.8" />
              <line x1="205" y1="404" x2="205" y2="420" stroke="#000" strokeWidth="0.8" />
              <text x="186" y="438" textAnchor="middle" fill="#000" fontSize="15" fontWeight="600">2&apos; × 3&apos;</text>

              <line x1="590" y1="412" x2="633" y2="412" stroke="#000" strokeWidth="0.8" />
              <line x1="590" y1="404" x2="590" y2="420" stroke="#000" strokeWidth="0.8" />
              <line x1="633" y1="404" x2="633" y2="420" stroke="#000" strokeWidth="0.8" />
              <text x="611" y="438" textAnchor="middle" fill="#000" fontSize="15" fontWeight="600">2&apos; × 3&apos;</text>

              {/* Aisle dims */}
              {[[165, 211], [243, 289], [321, 362], [438, 480], [512, 558], [590, 636]].map(([a, b]) => (
                <g key={`ad${a}`}>
                  <line x1={a} y1="320" x2={b} y2="320" stroke="#000" strokeWidth="0.6" />
                  <line x1={a} y1="313" x2={a} y2="327" stroke="#000" strokeWidth="0.6" />
                  <line x1={b} y1="313" x2={b} y2="327" stroke="#000" strokeWidth="0.6" />
                  <text x={(a + b) / 2} y="308" textAnchor="middle" fill="#000" fontSize="14" fontWeight="600">3&apos;-0&quot;</text>
                </g>
              ))}

              {/* Mower clearance dim */}
              <line x1="400" y1="305" x2="400" y2="383" stroke="#000" strokeWidth="0.6" />
              <line x1="392" y1="305" x2="408" y2="305" stroke="#000" strokeWidth="0.6" />
              <line x1="392" y1="383" x2="408" y2="383" stroke="#000" strokeWidth="0.6" />
              <text x="418" y="348" fill="#000" fontSize="14" fontWeight="600" transform="rotate(-90 418 348)">~3&apos;-3&quot;</text>

              {/* Workbench label */}
              <text x="400" y="122" textAnchor="middle" fill="#000" fontSize="14" fontWeight="500" opacity="0.5">WORKBENCH</text>
            </g>

            {/* Tooltips (outside planGroup so they don't rotate) */}
            <g ref={shelfTipRef} opacity="0" pointerEvents="none">
              <rect ref={tipBgRef} x="0" y="0" width="240" height="52" rx="8" fill="#fff" stroke="#000" strokeWidth="1.5" />
              <text ref={tipTxtRef} x="120" y="32" textAnchor="middle" fill="#000" fontSize="22" fontWeight="700">24&quot; × 72&quot; Shelf</text>
            </g>
            <g ref={wbTipRef} opacity="0" pointerEvents="none">
              <rect x="0" y="0" width="310" height="52" rx="8" fill="#fff" stroke="#000" strokeWidth="1.5" />
              <text x="155" y="32" textAnchor="middle" fill="#000" fontSize="20" fontWeight="700">Workbench: 72&quot;×30&quot; 15 sq ft</text>
            </g>
            <g ref={mowerTipRef} opacity="0" pointerEvents="none">
              <rect x="0" y="0" width="290" height="52" rx="8" fill="#fff" stroke="#000" strokeWidth="1.5" />
              <text x="145" y="32" textAnchor="middle" fill="#000" fontSize="20" fontWeight="700">Riding Mower: 5&apos;×3.5&apos; 18 sq ft</text>
            </g>
            <g ref={bikeTipRef} opacity="0" pointerEvents="none">
              <rect x="0" y="0" width="180" height="52" rx="8" fill="#fff" stroke="#000" strokeWidth="1.5" />
              <text x="90" y="32" textAnchor="middle" fill="#000" fontSize="20" fontWeight="700">Bicycle Rack</text>
            </g>
            <g ref={toolTipRef} opacity="0" pointerEvents="none">
              <rect x="0" y="0" width="150" height="52" rx="8" fill="#fff" stroke="#000" strokeWidth="1.5" />
              <text x="75" y="32" textAnchor="middle" fill="#000" fontSize="20" fontWeight="700">Tool Rack</text>
            </g>
          </svg>
        </div>

        <div className="fp-footer-plan">
          <div className="fp-footer-plan-t">16&apos; × 36&apos; LOFTED BARN - 2 LOFTS 2 WINDOWS — FLOOR PLAN</div>
          <div className="fp-footer-plan-s">2×6 FRAMING @ 16&quot; O.C. · HOVER OVER ITEMS FOR DETAILS</div>
        </div>

        <div className="fp-legend-row">
          <span><div className="fp-legend-sw" style={{ background: "repeating-linear-gradient(45deg,transparent,transparent 2px,rgba(0,0,0,.1) 2px,rgba(0,0,0,.1) 3px)", borderStyle: "dashed" }} />LOFT ABOVE</span>
          <span><div className="fp-legend-sw" style={{ background: "#eee" }} />SHELF</span>
          <span><div className="fp-legend-sw" style={{ background: "#d4c9a8" }} />WORKBENCH</span>
          <span><div className="fp-legend-sw" style={{ background: "#ddd", borderColor: "#000" }} />MOWER</span>
          <span><div className="fp-legend-sw" style={{ background: "#fff", borderColor: "#000" }} />BICYCLE RACK</span>
          <span><div className="fp-legend-sw" style={{ background: "#c4a87a", borderColor: "#000" }} />TOOL RACK</span>
        </div>
      </div>

      <section className="fp-section">
        <h2>Options for the 16&apos; × 36&apos; Lofted Barn</h2>
        <div className="fp-gallery">
          <div className="fp-gallery-card">
            <img src={toolRackImg} alt="Tool rack mounted on shed wall" loading="lazy" />
            <div className="fp-gallery-label">Tool Rack on Wall</div>
          </div>
          <div className="fp-gallery-card">
            <img src={bicycleRackImg} alt="Bicycle rack in shed" loading="lazy" />
            <div className="fp-gallery-label">Bicycle Rack</div>
          </div>
          <div className="fp-gallery-card">
            <img src={shelfWithTotesImg} alt="Mobile shelf with storage totes" loading="lazy" />
            <div className="fp-gallery-label">Mobile Shelf with Totes</div>
          </div>
        </div>
      </section>

      <section className="fp-section">
        <h2>Specifications</h2>
        <div className="fp-specs-grid">
          {[
            ["Building", "16' × 36'"],
            ["Wall framing", '2×6 @ 16" O.C.'],
            ["Door opening", "6' × 6'-8\""],
            ["Roof pitch", "6/12"],
            ["Windows", "2' × 3' (×2)"],
            ["Workbench", '72" × 30"'],
            ["Shelving", '24" × 72" (×12)'],
            ["Lofts", "4' × 16' (×2)"],
          ].map(([label, value]) => (
            <div key={label} className="fp-spec-card">
              <div className="fp-spec-label">{label}</div>
              <div className="fp-spec-value">{value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="fp-section">
        <h2>Layout notes</h2>
        <ol className="fp-notes-list">
          <li>All wall framing is 2×6 SPF lumber at 16&quot; on center with double top plate.</li>
          <li>6×6 double door centered on the long wall with double 2×6 header, king studs, and jack studs.</li>
          <li>Riding mower backed in — rear tires aligned with shelf ends. Drive straight out to mow.</li>
          <li>12 shelving units (24&quot; × 72&quot; each) in 6 columns, flush against the back wall.</li>
          <li>All aisles are a full 3 feet wide for comfortable walk-through access.</li>
          <li>Two 2&apos;×3&apos; windows positioned in aisle gaps between shelves for natural light penetration.</li>
          <li>Window frames fit between existing 16&quot; O.C. studs — no extra framing needed.</li>
          <li>72&quot; × 30&quot; workbench with vise centered on the back wall opposite the door.</li>
          <li>Two 4&apos;×16&apos; lofts at each gable end for overhead storage.</li>
          <li>Approximately 3&apos;-3&quot; walk clearance between mower and door wall.</li>
          <li>Wall-mounted bicycle rack for 4 bicycles between left window and door.</li>
          <li>Wall-mounted tool rack between door and right window.</li>
        </ol>
      </section>

      <footer className="fp-footer">
        16&apos; × 36&apos; Lofted Barn - 2 Lofts 2 Windows — Floor Plan · Not to scale · For planning purposes only
      </footer>
    </div>
  );
}
