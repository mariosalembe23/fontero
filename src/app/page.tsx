"use client";

import React, { useEffect, useRef, useState } from "react";
import LeftPannel from "./components/Areas/LeftPannel";
import CentralPannel from "./components/Areas/CentralPannel";
import RightPannel from "./components/Areas/RightPannel";
import { useDispatch, useSelector } from "react-redux";
import loadDefaultFont from "./components/MainFunc/LoadDefaultFont";
import { RootState } from "./Redux/store";

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
  const texts = useSelector((state: RootState) => state.texts);
  const fonts = useSelector((state: RootState) => state.fonts);
  
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


  console.log("texts", texts);
  console.log("fonts", fonts);

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
