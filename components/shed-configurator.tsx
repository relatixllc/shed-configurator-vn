"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import type {
  Color,
  ColorCategory,
  ColorDisplayMode,
  ColorSortMode,
  ColorGroupMode,
  ChipSize,
  SizeDisplayMode,
  ThemeMode,
  TextSize,
} from "@/lib/types";
import { hexToHsl } from "@/lib/utils/color-utils";
import { ThemeModeSelector } from "./ui/theme-mode-selector";
import { StyleSelector } from "./style-selector/style-selector";
import { SizePicker } from "./size-picker/size-picker";
import { ColorPicker } from "./color-picker/color-picker";

export default function ShedConfigurator() {
  // ── Theme state ──
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");
  const [textSize, setTextSize] = useState<TextSize>("md");

  // ── Style state ──
  const [selectedStyle, setSelectedStyle] = useState<number | null>(null);
  const [recommendedStyle, setRecommendedStyle] = useState<number | null>(null);
  const [helpChoice, setHelpChoice] = useState<"affordable" | "space" | null>(null);

  // ── Size state ──
  const [wallHeight, setWallHeight] = useState<6 | 8>(6);
  const [sizeMode, setSizeMode] = useState<SizeDisplayMode>("all");
  const [showArea, setShowArea] = useState(true);
  const [showVolume, setShowVolume] = useState(false);
  const [showEquiv, setShowEquiv] = useState(true);
  const [selectedSize, setSelectedSize] = useState<[number, number] | null>(null);
  const [minSqFt, setMinSqFt] = useState(0);

  // ── Color state ──
  const [colorMode, setColorMode] = useState<ColorDisplayMode>("grid");
  const [colorSort, setColorSort] = useState<ColorSortMode>("default");
  const [colorGroup, setColorGroup] = useState<ColorGroupMode>("none");
  const [chipSize, setChipSize] = useState<ChipSize>("sm");
  const [selectedColors, setSelectedColors] = useState<Record<ColorCategory, Color | null>>({
    siding: null,
    roof: null,
    trim: null,
  });

  // ── Handlers ──
  const handleSelectStyle = useCallback((index: number) => {
    setSelectedStyle(index);
    setRecommendedStyle(null);
    setHelpChoice(null);
  }, []);

  const handleHelpChoose = useCallback((choice: "affordable" | "space") => {
    setHelpChoice(choice);
    if (choice === "affordable") {
      setSelectedStyle(0);
      setRecommendedStyle(0);
      setWallHeight(6);
    } else {
      setSelectedStyle(3);
      setRecommendedStyle(3);
      setWallHeight(8);
    }
  }, []);

  const handleSelectSize = useCallback((w: number, l: number) => {
    setSelectedSize([w, l]);
  }, []);

  const handleColorSelect = useCallback((category: ColorCategory, color: Color) => {
    setSelectedColors((prev) => ({ ...prev, [category]: color }));
  }, []);

  // ── Theme effects ──
  const isDark = themeMode === "dark" || themeMode === "adaptive-dark";
  const isAdaptive = themeMode === "adaptive-light" || themeMode === "adaptive-dark";

  useEffect(() => {
    document.body.setAttribute("data-theme", isDark ? "dark" : "light");
    return () => document.body.removeAttribute("data-theme");
  }, [isDark]);

  useEffect(() => {
    document.documentElement.setAttribute("data-text", textSize);
    return () => document.documentElement.removeAttribute("data-text");
  }, [textSize]);

  const tintColor = useMemo(() => {
    return selectedColors.siding ?? selectedColors.roof ?? selectedColors.trim;
  }, [selectedColors]);

  useEffect(() => {
    const props = [
      "--color-bg", "--color-bg-hover", "--color-bg-muted",
      "--color-surface", "--color-surface-dim", "--color-border", "--color-primary-light",
    ];

    if (!isAdaptive || !tintColor) {
      props.forEach((p) => document.body.style.removeProperty(p));
      return;
    }

    const { h, s } = hexToHsl(tintColor.hex);
    const cap = (max: number) => Math.round(Math.min(s * 100, max));

    if (isDark) {
      document.body.style.setProperty("--color-bg", `hsl(${h}, ${cap(15)}%, 12%)`);
      document.body.style.setProperty("--color-bg-hover", `hsl(${h}, ${cap(15)}%, 16%)`);
      document.body.style.setProperty("--color-bg-muted", `hsl(${h}, ${cap(12)}%, 14%)`);
      document.body.style.setProperty("--color-surface", `hsl(${h}, ${cap(12)}%, 18%)`);
      document.body.style.setProperty("--color-surface-dim", `hsl(${h}, ${cap(10)}%, 15%)`);
      document.body.style.setProperty("--color-border", `hsl(${h}, ${cap(10)}%, 25%)`);
      document.body.style.setProperty("--color-primary-light", `hsl(${h}, ${cap(20)}%, 22%)`);
    } else {
      document.body.style.setProperty("--color-bg", `hsl(${h}, ${cap(30)}%, 97%)`);
      document.body.style.setProperty("--color-bg-hover", `hsl(${h}, ${cap(25)}%, 94%)`);
      document.body.style.setProperty("--color-bg-muted", `hsl(${h}, ${cap(20)}%, 96%)`);
      document.body.style.setProperty("--color-surface", `hsl(${h}, ${cap(25)}%, 99%)`);
      document.body.style.setProperty("--color-surface-dim", `hsl(${h}, ${cap(20)}%, 95%)`);
      document.body.style.setProperty("--color-border", `hsl(${h}, ${cap(15)}%, 88%)`);
      document.body.style.setProperty("--color-primary-light", `hsl(${h}, ${cap(35)}%, 93%)`);
    }
  }, [isAdaptive, isDark, tintColor]);

  return (
    <div className="max-w-[420px] mx-auto overflow-hidden" style={{ contain: "inline-size" }}>
      <ThemeModeSelector mode={themeMode} textSize={textSize} onChange={setThemeMode} onTextSizeChange={setTextSize} />

      <StyleSelector
        selectedIndex={selectedStyle}
        recommendedIndex={recommendedStyle}
        helpChoice={helpChoice}
        onSelectStyle={handleSelectStyle}
        onHelpChoose={handleHelpChoose}
      />

      <SizePicker
        wallHeight={wallHeight}
        sizeMode={sizeMode}
        showArea={showArea}
        showVolume={showVolume}
        showEquiv={showEquiv}
        selectedSize={selectedSize}
        minSqFt={minSqFt}
        onWallHeightChange={setWallHeight}
        onSizeModeChange={setSizeMode}
        onShowAreaChange={setShowArea}
        onShowVolumeChange={setShowVolume}
        onShowEquivChange={setShowEquiv}
        onSelectSize={handleSelectSize}
        onMinSqFtChange={setMinSqFt}
      />

      <ColorPicker
        colorMode={colorMode}
        colorSort={colorSort}
        colorGroup={colorGroup}
        chipSize={chipSize}
        selectedColors={selectedColors}
        onColorModeChange={setColorMode}
        onColorSortChange={setColorSort}
        onColorGroupChange={setColorGroup}
        onChipSizeChange={setChipSize}
        onColorSelect={handleColorSelect}
      />
    </div>
  );
}
