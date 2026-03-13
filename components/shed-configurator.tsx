"use client";

import { useState, useCallback } from "react";
import type {
  Color,
  ColorCategory,
  ColorDisplayMode,
  ColorSortMode,
  ColorGroupMode,
  ChipSize,
  SizeDisplayMode,
} from "@/lib/types";
import { StyleSelector } from "./style-selector/style-selector";
import { SizePicker } from "./size-picker/size-picker";
import { ColorPicker } from "./color-picker/color-picker";

export default function ShedConfigurator() {
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

  return (
    <div className="w-full min-w-0 overflow-hidden break-words" style={{ maxWidth: "min(420px, calc(100vw - 1rem))" }}>
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
