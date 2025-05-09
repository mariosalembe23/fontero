"use client";

import React, { useEffect, useRef, useState } from "react";
import LeftPannel from "./components/Areas/LeftPannel";
import CentralPannel from "./components/Areas/CentralPannel";
import RightPannel from "./components/Areas/RightPannel";
import { useDispatch } from "react-redux";
import loadDefaultFont from "./components/MainFunc/LoadDefaultFont";
// import { RootState } from "./Redux/store";

type TextProps = "off" | "on" | "none";

interface TextArrProps {
  id: number;
  text: string;
  size: string;
  fontFamily: string;
  color: string;
  weight: string;
}

export default function Home() {
  const dispatch = useDispatch();
  // const texts = useSelector((state: RootState) => state.texts);
  // const fonts = useSelector((state: RootState) => state.fonts);

  const [color, setColor] = useState<string>("#f5f5f5");
  const [showPicker, setShowPicker] = useState<string>("none");
  const pickerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [showAddText, setShowAddText] = useState<TextProps>("none");
  const buttonRefAddText = useRef<HTMLButtonElement>(null);
  const [spaceBetweenTexts, setSpaceBetweenTexts] = useState<string>("0");
  const [selectedElement, setSelectedElement] = useState<TextArrProps | null>(
    null
  );

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

  useEffect(() => {
    loadDefaultFont({
      fontFamily: "Roboto",
      path: "/fonts/Roboto.ttf",
      dispatch,
    });
  }, [dispatch]);

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
    localStorage.theme = "light";
    localStorage.theme = "dark";
    localStorage.removeItem("theme");
  }, []);

  return (
    <div className="grid pot:grid-cols-[20%_60%_20%] det:grid-cols-[15%_70%_15%] w-full h-screen">
      <aside className="pot:hidden inline-flex fixed top-0 left-0 w-full h-screen bg-white"></aside>

      <LeftPannel
        buttonRef={buttonRef}
        color={color}
        showPicker={showPicker}
        setShowPicker={setShowPicker}
        setAddText={setShowAddText}
        showAddText={showAddText}
        buttonRefAddText={buttonRefAddText}
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
        spaceBetweenTexts={spaceBetweenTexts}
        setSelectedElement={setSelectedElement}
        selectedElement={selectedElement}
      />
      <RightPannel
        setSelectedElement={setSelectedElement}
        selectedElement={selectedElement}
      />
    </div>
  );
}
