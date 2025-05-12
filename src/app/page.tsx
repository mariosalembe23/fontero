"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import LeftPannel from "./components/Areas/LeftPannel";
import CentralPannel from "./components/Areas/CentralPannel";
import RightPannel from "./components/Areas/RightPannel";
import { useDispatch } from "react-redux";
import loadDefaultFont from "./components/MainFunc/LoadDefaultFont";
import { ThemeContext } from "./components/MainFunc/ThemeProvider";
import Link from "next/link";
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

  const { theme, isLoading, isRestricted } = useContext(ThemeContext)!;
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
    if (theme === "dark") setColor("#09090b");
    else setColor("#f5f5f5");
  }, [theme]);

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

  if (!isRestricted && isLoading)
    return (
      <aside className="fixed personalBack top-0 left-0 w-full h-screen bg-blue-500 flex flex-col gap-2 items-center justify-center">
        <h2 className="font-semibold text-lg dark:text-white text-zinc-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="7.99497802734375 23.9994189453125 321 57"
            className="w-96 text-white"
          >
            <g fill="currentColor">
              <path d="M23.998 79.999L23.998 47.989L35.995 47.989L35.995 40.003L23.998 40.003L23.998 31.983L40.005 31.983L40.005 23.999L19.988 23.999L15.978 27.976L15.978 40.006L7.995 40.006L7.995 47.992L15.978 47.992L15.978 79.999ZM83.995 79.999L88.005 76.023L88.005 43.979L83.995 40.003L59.968 40.003L55.995 43.979L55.995 76.023L59.968 79.999ZM63.978 72.016L63.978 47.992L79.985 47.992L79.985 72.016ZM103.995 80.002L111.978 80.002L111.978 47.992L127.985 47.992L127.985 79.999L136.005 79.999L136.005 43.979L131.995 40.003L107.968 40.003L103.995 43.979ZM165.993 79.996L182 79.996L182 72.013L170.003 72.013L170.003 47.989L182 47.989L182 40.003L170.003 40.003L170.003 23.999L161.983 23.999L161.983 40.006L154 40.006L154 47.992L161.983 47.992L161.983 76.023L165.993 79.999ZM232.005 79.999L232.005 72.016L207.978 72.016L207.978 63.996L227.995 63.996L232.005 60.020L232.005 43.979L227.995 40.003L203.968 40.003L199.995 43.979L199.995 76.023L203.968 79.999ZM207.978 56.009L207.978 47.989L223.985 47.989L223.985 56.009ZM257.983 79.999L257.983 47.989L269.980 47.989L269.980 56.009L278 56.009L278 40.003L253.973 40.003L250 43.979L250 79.999ZM323.995 79.999L328.005 76.023L328.005 43.979L323.995 40.003L299.968 40.003L295.995 43.979L295.995 76.023L299.968 79.999ZM303.978 72.016L303.978 47.992L319.985 47.992L319.985 72.016Z" />
            </g>
          </svg>
        </h2>
        <p className="text-white pt-2">
          Preparando o ambiente, isso pode levar alguns segundos
        </p>
      </aside>
    );

  return !isRestricted ? (
    <div className="grid pot:grid-cols-[25%_50%_25%] det:grid-cols-[15%_70%_15%] w-full h-screen">
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
        selectedElement={selectedElement}
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
  ) : (
    <aside className="pot:hidden personalBackAside flex items-center justify-center fixed top-0 left-0 w-full h-screen bg-zinc-900">
      <div className="flex flex-col gap-2 items-center justify-center text-center px-7">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="7.99497802734375 23.9994189453125 321 57"
            className="det:w-96 pot:w-60 w-52 text-blue-500"
          >
            <g fill="currentColor">
              <path d="M23.998 79.999L23.998 47.989L35.995 47.989L35.995 40.003L23.998 40.003L23.998 31.983L40.005 31.983L40.005 23.999L19.988 23.999L15.978 27.976L15.978 40.006L7.995 40.006L7.995 47.992L15.978 47.992L15.978 79.999ZM83.995 79.999L88.005 76.023L88.005 43.979L83.995 40.003L59.968 40.003L55.995 43.979L55.995 76.023L59.968 79.999ZM63.978 72.016L63.978 47.992L79.985 47.992L79.985 72.016ZM103.995 80.002L111.978 80.002L111.978 47.992L127.985 47.992L127.985 79.999L136.005 79.999L136.005 43.979L131.995 40.003L107.968 40.003L103.995 43.979ZM165.993 79.996L182 79.996L182 72.013L170.003 72.013L170.003 47.989L182 47.989L182 40.003L170.003 40.003L170.003 23.999L161.983 23.999L161.983 40.006L154 40.006L154 47.992L161.983 47.992L161.983 76.023L165.993 79.999ZM232.005 79.999L232.005 72.016L207.978 72.016L207.978 63.996L227.995 63.996L232.005 60.020L232.005 43.979L227.995 40.003L203.968 40.003L199.995 43.979L199.995 76.023L203.968 79.999ZM207.978 56.009L207.978 47.989L223.985 47.989L223.985 56.009ZM257.983 79.999L257.983 47.989L269.980 47.989L269.980 56.009L278 56.009L278 40.003L253.973 40.003L250 43.979L250 79.999ZM323.995 79.999L328.005 76.023L328.005 43.979L323.995 40.003L299.968 40.003L295.995 43.979L295.995 76.023L299.968 79.999ZM303.978 72.016L303.978 47.992L319.985 47.992L319.985 72.016Z" />
            </g>
          </svg>
        </span>

        <p className="text-white text-[15px] pt-3">
          Estamos trabalhando para melhorar a experiência do usuário em telas
          menores! Tente aumentar a tela ou use um dispositivo maior.
        </p>
        <div className="flex items-center mt-4 justify-center gap-2">
          <Link
            href={"https://github.com/mariosalembe23"}
            target="_blank"
            className="w-8 h-8 flex items-center justify-center rounded-full border dark:bg-zinc-800 dark:border-zinc-700 dark:text-white border-zinc-200 bg-white text-zinc-500 transition-all hover:bg-zinc-200 hover:text-zinc-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon size-5 icon-tabler icons-tabler-outline icon-tabler-brand-github"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
            </svg>
          </Link>
          <Link
            href={"https://www.linkedin.com/in/m%C3%A1rio-salembe-5211792a6/"}
            target="_blank"
            className="w-8 h-8 flex items-center justify-center rounded-full border dark:bg-zinc-800 dark:border-zinc-700 dark:text-white border-zinc-200 bg-white text-zinc-500 transition-all hover:bg-zinc-200 hover:text-zinc-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon size-5 icon-tabler icons-tabler-outline icon-tabler-brand-linkedin"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M8 11v5" />
              <path d="M8 8v.01" />
              <path d="M12 16v-5" />
              <path d="M16 16v-3a2 2 0 1 0 -4 0" />
              <path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z" />
            </svg>
          </Link>
          <Link
            href={"https://dribbble.com/mariosalembe_"}
            target="_blank"
            className="w-8 h-8 flex items-center justify-center rounded-full border dark:bg-zinc-800 dark:border-zinc-700 dark:text-white border-zinc-200 bg-white text-zinc-500 transition-all hover:bg-zinc-200 hover:text-zinc-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon size-5 icon-tabler icons-tabler-outline icon-tabler-brand-dribbble"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
              <path d="M9 3.6c5 6 7 10.5 7.5 16.2" />
              <path d="M6.4 19c3.5 -3.5 6 -6.5 14.5 -6.4" />
              <path d="M3.1 10.75c5 0 9.814 -.38 15.314 -5" />
            </svg>
          </Link>
        </div>
      </div>
    </aside>
  );
}
