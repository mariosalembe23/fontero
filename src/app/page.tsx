"use client";

import Link from "next/link";
import ColorPicker from "./components/ColorPicket";
import React, { useEffect, useRef, useState } from "react";

const PickerModal: React.FC<{
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  ref: React.RefObject<HTMLDivElement | null>;
  showPicker: string;
  setShowPicker: React.Dispatch<React.SetStateAction<string>>;
}> = ({ color, setColor, ref, showPicker, setShowPicker }) => {
  useEffect(() => {
    if (showPicker === "off") {
      setTimeout(() => {
        setShowPicker("none");
      }, 150);
    }
  }, [showPicker, setShowPicker]);

  return (
    <aside
      ref={ref}
      className={`
        absolute top-6 ${showPicker === "off" && "offAnPicker"} ${
        showPicker === "none" && "offPicker"
      } ${showPicker === "on" && "onPicker"}  ${
        showPicker !== "none" &&
        showPicker !== "on" &&
        showPicker !== "off" &&
        "translate-y-[-200%]"
      }  left-6 bg-white border flex-col border-zinc-200 rounded-lg  w-[15rem] flex items-center justify-center shadow-lg
        `}
    >
      <ColorPicker color={color} setColor={setColor} />
      <div className=" mx-4 flex items-center justify-between border border-zinc-300 rounded-md mb-3">
        <div className="border-r px-2 py-1 border-zinc-300">
          <p className="text-zinc-400">#</p>
        </div>
        <input
          type="text"
          name="color"
          onChange={(e) => setColor(e.target.value)}
          className="w-full px-3 outline-none text-[15px] text-zinc-800"
          id="color"
          value={color.length > 0 && color[0] !== "#" ? `#${color}` : color}
        />
      </div>
    </aside>
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
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setShowPicker("off");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="grid grid-cols-[15%_70%_15%] w-full h-screen">
      <div className="border-r h-full border-zinc-200 flex items-start flex-col justify-between  py-8">
        <section className="w-full">
          <header className="px-7">
            <h2 className=" font-semibold text-lg text-zinc-900">fonteiro</h2>
          </header>
          <section className="border-t px-7 w-full border-zinc-200 mt-4 pt-4">
            <h2 className="text-zinc-600 text-[15px]">Página</h2>
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
        </section>
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
