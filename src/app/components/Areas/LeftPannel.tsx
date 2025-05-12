"use client";

import React, { useContext } from "react";
import "tippy.js/dist/tippy.css";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import Link from "next/link";
import { ThemeContext } from "../MainFunc/ThemeProvider";
import ItemText from "../micro/ItemText";

type TextProps = "off" | "on" | "none";

interface TextArrProps {
  id: number;
  text: string;
  size: string;
  fontFamily: string;
  color: string;
  weight: string;
}

interface LeftPannelProps {
  color: string;
  showPicker: string;
  setShowPicker: React.Dispatch<React.SetStateAction<string>>;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  setAddText: React.Dispatch<React.SetStateAction<TextProps>>;
  showAddText: string;
  buttonRefAddText: React.RefObject<HTMLButtonElement | null>;
  spaceBetweenTexts: string;
  setSpaceBetweenTexts: React.Dispatch<React.SetStateAction<string>>;
  selectedElement: TextArrProps | null;
}

const LeftPannel: React.FC<LeftPannelProps> = ({
  color,
  showPicker,
  setShowPicker,
  buttonRef,
  setAddText,
  buttonRefAddText,
  spaceBetweenTexts,
  setSpaceBetweenTexts,
  selectedElement,
}) => {
  const texts = useSelector((state: RootState) => state.texts);
  const fonts = useSelector((state: RootState) => state.fonts);
  const { toggleTheme } = useContext(ThemeContext)!;

  return (
    <div className="border-r h-screen bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 flex items-start flex-col justify-between py-8">
      <section className="w-full">
        <header className="det:px-5 pot:px-3 flex items-center justify-between">
          <h2 className="font-semibold flex items-center gap-2 text-lg dark:text-white text-zinc-900">
            <svg
              viewBox="0 0 62 57 "
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 text-blue-500"
            >
              <path
                d="M52 0C57.5228 8.37535e-07 62 4.47715 62 10V47C62 52.5228 57.5228 57 52 57H10C4.47715 57 4.02673e-08 52.5228 0 47V10C0 4.47715 4.47715 0 10 0H52ZM10.75 13.3721V20.5479H6V25.3115H10.75V44.4033H15.5225V25.3096H22.6602V20.5459H15.5225V15.7627H25.0469V11H13.1357L10.75 13.3721ZM34.5605 22.918V42.0322L36.9248 44.4033H51.2207L53.6074 42.0322V22.918L51.2207 20.5459H36.9248L34.5605 22.918ZM48.835 39.6416H39.3105V25.3115H48.835V39.6416Z"
                fill="currentColor"
              />
            </svg>
            <p>fonteiro</p>
          </h2>
          <div className="">
            <button
              onClick={toggleTheme}
              className="flex items-center cursor-pointer transition-all hover:opacity-75 text-blue-500 justify-center w-7 h-7 gap-2 rounded-full border border-blue-500 dark:bg-zinc-800 bg-white text-[14px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="icon size-5 icon-tabler icons-tabler-filled icon-tabler-bulb"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 11a1 1 0 0 1 .117 1.993l-.117 .007h-1a1 1 0 0 1 -.117 -1.993l.117 -.007h1z" />
                <path d="M12 2a1 1 0 0 1 .993 .883l.007 .117v1a1 1 0 0 1 -1.993 .117l-.007 -.117v-1a1 1 0 0 1 1 -1z" />
                <path d="M21 11a1 1 0 0 1 .117 1.993l-.117 .007h-1a1 1 0 0 1 -.117 -1.993l.117 -.007h1z" />
                <path d="M4.893 4.893a1 1 0 0 1 1.32 -.083l.094 .083l.7 .7a1 1 0 0 1 -1.32 1.497l-.094 -.083l-.7 -.7a1 1 0 0 1 0 -1.414z" />
                <path d="M17.693 4.893a1 1 0 0 1 1.497 1.32l-.083 .094l-.7 .7a1 1 0 0 1 -1.497 -1.32l.083 -.094l.7 -.7z" />
                <path d="M14 18a1 1 0 0 1 1 1a3 3 0 0 1 -6 0a1 1 0 0 1 .883 -.993l.117 -.007h4z" />
                <path d="M12 6a6 6 0 0 1 3.6 10.8a1 1 0 0 1 -.471 .192l-.129 .008h-6a1 1 0 0 1 -.6 -.2a6 6 0 0 1 3.6 -10.8z" />
              </svg>
            </button>
          </div>
        </header>
        <section className="border-t det:px-5 pot:px-3 w-full dark:border-zinc-800 border-zinc-200 mt-4 pt-4">
          <h2 className="text-zinc-700 dark:text-zinc-100 font-medium text-[15px]">
            Página
          </h2>
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
                className="w-5 h-5 border dark:border-zinc-600 border-zinc-300 rounded-sm"
              ></div>
              <p className="uppercase text-[13px] dark:text-white text-zinc-700">
                {color}
              </p>
            </button>
          </div>
          <div>
            <label
              htmlFor="space-bet"
              className="text-zinc-700 dark:text-white text-[14px] font-medium mt-4 flex items-center gap-2"
            >
              Espaço entre os textos
            </label>
            <input
              inputMode="numeric"
              pattern="[0-9]*"
              type="text"
              value={spaceBetweenTexts}
              onChange={(e) => {
                setSpaceBetweenTexts(e.target.value.replace(/[^0-9]/g, ""));
              }}
              className="border outline-none py-1 dark:text-white dark:border-zinc-700 border-zinc-200 text-[14px] px-2 rounded-md mt-2 w-[30%]"
            />
          </div>
        </section>
      </section>
      <section className="border-t pb-5 det:px-5 px-3 h-full overflow-y-auto w-full dark:border-zinc-800 border-zinc-200 mt-7 pt-4">
        <h2 className="text-zinc-700 dark:text-zinc-100 font-medium text-[15px]">
          Designs
        </h2>
        {texts.length === 0 && (
          <p className="text-zinc-500 dark:text-zinc-500 text-[13px] pe-4">
            Sem textos adicionados, tente adicionar um texto.
          </p>
        )}
        <div className="mt-3">
          <header className="mb-2 flex flex-col gap-2">
            {texts.map((text) => (
              <ItemText
                key={text.id}
                id={text.id}
                text={text.text}
                size={text.size}
                fontFamily={text.fontFamily}
                color={text.color}
                weight={text.weight}
                fonts={fonts}
                isSelected={selectedElement?.id === text.id ? true : false}
              />
            ))}
          </header>
          <footer>
            <button
              ref={buttonRefAddText}
              onClick={() => setAddText("on")}
              className="w-full transition-all hover:bg-blue-600 cursor-pointer bg-blue-500 py-2 gap-2 text-[15px] text-white rounded-lg flex items-center justify-center"
            >
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
                className="icon icon-tabler icons-tabler-outline icon-tabler-texture"
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
      <footer className="det:px-5 px-3 flex flex-col items-start">
        <div className="flex items-center justify-center gap-2">
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
        <div className="text-zinc-600 dark:text-zinc-500 mt-4">
          <p className="leading-none">Mário Salembe</p>
          <small>2023 © Todos os direitos reservados</small>
        </div>
      </footer>
    </div>
  );
};

export default LeftPannel;
