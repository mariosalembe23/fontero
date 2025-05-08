"use client";

import React, { useEffect, useRef, useState } from "react";
import LeftPannel from "./components/Areas/LeftPannel";
import CentralPannel from "./components/Areas/CentralPannel";
import RightPannel from "./components/Areas/RightPannel";

type TextProps = "off" | "on" | "none";

interface TextArrProps {
  id: number;
  text: string;
  size: string;
  fontFamily: string;
  color: string;
  weight: string;
}

interface UploadFontsProps {
  id: number;
  fontFamily: string;
  fontData: string;
}

export default function Home() {
  const [color, setColor] = useState<string>("#f5f5f5");
  const [showPicker, setShowPicker] = useState<string>("none");
  const pickerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [showAddText, setShowAddText] = useState<TextProps>("none");
  const buttonRefAddText = useRef<HTMLButtonElement>(null);
  const [texts, setTexts] = useState<TextArrProps[]>([]);
  const [importedFonts, setImportedFonts] = useState<UploadFontsProps[]>([
    {
      id: 0,
      fontFamily: "sans-serif",
      fontData: "",
    },
  ]);
  const [selectedElement, setSelectedElement] = useState<TextArrProps | null>(
    null
  );
  const [spaceBetweenTexts, setSpaceBetweenTexts] = useState<string>("0");

  console.log("Texts", texts);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node) &&
        showPicker === "on"
      ) {
        setShowPicker("off");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPicker]);

  return (
    <div className="grid grid-cols-[15%_70%_15%] w-full h-screen">
      <LeftPannel
        buttonRef={buttonRef}
        color={color}
        showPicker={showPicker}
        setShowPicker={setShowPicker}
        setAddText={setShowAddText}
        showAddText={showAddText}
        buttonRefAddText={buttonRefAddText}
        texts={texts}
        setTexts={setTexts}
        fonts={importedFonts}
        spaceBetweenTexts={spaceBetweenTexts}
        setSpaceBetweenTexts={setSpaceBetweenTexts}
      />
      <CentralPannel
        ref={pickerRef}
        showPicker={showPicker}
        setShowPicker={setShowPicker}
        color={color}
        setColor={setColor}
        setAddText={setShowAddText}
        showAddText={showAddText}
        buttonRef={buttonRefAddText}
        texts={texts}
        setTexts={setTexts}
        setSelectedElement={setSelectedElement}
        spaceBetweenTexts={spaceBetweenTexts}
      />
      <RightPannel
        fonts={importedFonts}
        setFonts={setImportedFonts}
        selectedElement={selectedElement}
        setTexts={setTexts}
        setSelectedElement={setSelectedElement}
      />
    </div>
  );
}
