"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import PickerModal from "./components/PickerModal";

interface ItemTextProps {
  text: string;
}

const ItemText: React.FC<ItemTextProps> = ({ text }) => {
  return (
    <button className="w-full cursor-pointer px-3 border-zinc-200 rounded-lg border transition-all py-2 flex items-center justify-between">
      <div className="w-full truncate ps-1 text-start">
        <p className="truncate text-zinc-800 text-[15px]">{text}</p>
      </div>
      <div className="flex items-center justify-center">
        <button className="text-zinc-500 cursor-pointer transition-all hover:text-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 22 22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-category"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 4h6v6h-6z" />
            <path d="M14 4h6v6h-6z" />
            <path d="M4 14h6v6h-6z" />
            <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          </svg>
        </button>
      </div>
    </button>
  );
};

export default function Home() {
  const [color, setColor] = useState<string>("#f5f5f5");
  const [showPicker, setShowPicker] = useState<string>("none");
  const pickerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

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
      <div className="border-r h-full border-zinc-200 flex items-start flex-col justify-between  py-8">
        <section className="w-full">
          <header className="px-5">
            <h2 className=" font-semibold text-lg text-zinc-900">fonteiro</h2>
          </header>
          <section className="border-t px-5 w-full border-zinc-200 mt-4 pt-4">
            <h2 className="text-zinc-600 font-medium text-[15px]">Página</h2>
            <div className="mt-3">
              <button
                ref={buttonRef}
                onClick={() => showPicker !== "on" && setShowPicker("on")}
                className="cursor-pointer outline-none flex items-center gap-2"
              >
                <div
                  style={{
                    backgroundColor: color,
                  }}
                  className="w-5 h-5 border border-zinc-300 rounded-sm"
                ></div>
                <p className="uppercase text-[13px] text-zinc-700">{color}</p>
              </button>
            </div>
          </section>
          <section className="border-t px-5 w-full border-zinc-200 mt-10 pt-4">
            <h2 className="text-zinc-600 font-medium text-[15px]">Designs</h2>
            <div className="mt-5">
              <header className="mb-2 flex flex-col gap-2">
                <ItemText text="Texto 1" />
                <ItemText text="Texto 1" />
              </header>
              <footer>
                <button className="w-full transition-all hover:bg-blue-600 cursor-pointer bg-blue-500 py-2 gap-2 text-[15px] text-white rounded-lg flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon size-5 icon-tabler icons-tabler-outline icon-tabler-texture"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M6 3l-3 3" />
                    <path d="M21 18l-3 3" />
                    <path d="M11 3l-8 8" />
                    <path d="M16 3l-13 13" />
                    <path d="M21 3l-18 18" />
                    <path d="M21 8l-13 13" />
                    <path d="M21 13l-8 8" />
                  </svg>
                  Adicionar Texto
                </button>
              </footer>
            </div>
          </section>
        </section>
        <footer className="px-7">
          <header className="flex items-center gap-2 ">
            <Link
              href={"/"}
              className="flex text-zinc-700 border transition-all hover:text-blue-500 border-zinc-300 items-center w-8 h-8 rounded-full bg-zinc-100 justify-center"
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
              href={"/"}
              className="flex text-zinc-700 transition-all hover:text-blue-500 border border-zinc-300 items-center w-8 h-8 rounded-full bg-zinc-100 justify-center"
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
          </header>
          <footer className="mt-3">
            <p className="text-[15px] text-zinc-600">Mário Salembe</p>
          </footer>
        </footer>
      </div>
      <div
        style={{
          backgroundColor: color,
        }}
        className="relative h-full"
      >
        <PickerModal
          ref={pickerRef}
          showPicker={showPicker}
          setShowPicker={setShowPicker}
          color={color}
          setColor={setColor}
        />
      </div>
      <div className="border-l h-full flex items-start flex-col justify-between border-zinc-200 px-7 py-8">
        <header>
          <h2 className=" font-medium text-zinc-900">Fontes</h2>
          <small className="text-zinc-500">
            Aqui estarão listadas todas as fontes que você adicionou ao sistema.
          </small>
          <div className="mt-4">
            <button className="w-full transition-all hover:bg-blue-600 cursor-pointer bg-blue-500 py-2 gap-2 text-[15px] text-white rounded-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon size-5 icon-tabler icons-tabler-outline icon-tabler-typeface"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
                <path d="M17 17a2 2 0 0 1 -2 -2v-8h-5a2 2 0 0 0 -2 2" />
                <path d="M7 17a2.775 2.775 0 0 0 2.632 -1.897l.368 -1.103a13.4 13.4 0 0 1 3.236 -5.236l1.764 -1.764" />
                <path d="M10 14h5" />
              </svg>
              Adicionar fonte
            </button>
          </div>
          <div></div>
        </header>
        <footer className="w-full">
          <Link
            href={"/"}
            className="flex text-[15px] transition-all hover:text-black text-zinc-600 items-center justify-between w-full"
          >
            Suporte
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-help"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                <path d="M12 17l0 .01" />
                <path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4" />
              </svg>
            </span>
          </Link>
        </footer>
      </div>
    </div>
  );
}
