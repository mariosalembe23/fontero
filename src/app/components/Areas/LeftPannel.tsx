"use client";

import React, { useContext, useEffect } from "react";
import PickerModal from "../PickerModal";
import "tippy.js/dist/tippy.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Redux/store";
import { updateText, removeText } from "../../Redux/slices/textsSlice";
import Link from "next/link";
import { ThemeContext } from "../MainFunc/ThemeProvider";

type TextProps = "off" | "on" | "none";

interface UploadFontsProps {
  id: number;
  fontFamily: string;
  fontData: string;
}

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

const ItemText: React.FC<{
  id: number;
  text: string;
  size: string;
  fontFamily: string;
  color: string;
  weight: string;
  fonts: UploadFontsProps[];
  isSelected: boolean;
}> = ({ id, text, color, fontFamily, size, weight, fonts, isSelected }) => {
  const dispatch = useDispatch();
  const [newColor, setNewColor] = React.useState<string>(color);
  const [newFontFamily, setNewFontFamily] = React.useState<string>(fontFamily);
  const [newSize, setNewSize] = React.useState<string>(size);
  const [newWeight, setNewWeight] = React.useState<string>(weight);
  const [showPicker, setShowPicker] = React.useState<string>("none");
  const refAddColor = React.useRef<HTMLDivElement | null>(null);
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (
      newColor !== color ||
      newFontFamily !== fontFamily ||
      newSize !== size ||
      newWeight !== weight
    ) {
      dispatch(
        updateText({
          id,
          text,
          color: newColor,
          fontFamily: fonts.some(
            (font: UploadFontsProps) => font.fontFamily === newFontFamily
          )
            ? newFontFamily
            : "Roboto",
          size: newSize,
          weight: newWeight,
        })
      );
    }
  }, [
    newColor,
    newFontFamily,
    newSize,
    newWeight,
    color,
    fontFamily,
    size,
    weight,
    id,
    text,
    fonts,
    dispatch,
  ]);

  const handleDelete = () => {
    dispatch(removeText(id));
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        refAddColor.current &&
        !refAddColor.current.contains(event.target as Node) &&
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
    <div
      className={`w-full cursor-pointer px-3 ${
        isSelected && "!border-blue-500"
      } border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 bg-gray-50 rounded-lg border transition-all py-2`}
    >
      <PickerModal
        ref={refAddColor}
        showPicker={showPicker}
        setShowPicker={setShowPicker}
        color={newColor}
        setColor={setNewColor}
      />

      <div className="flex items-center justify-between">
        <div className="w-[70%] truncate ps-1 text-start">
          <p className="truncate dark:text-zinc-200 text-zinc-600 text-[15px]">
            {text}
          </p>
        </div>
        <div className="flex items-center justify-center">
          <button className="text-zinc-400 dark:text-white cursor-pointer transition-all hover:text-zinc-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon size-5 icon-tabler icons-tabler-outline icon-tabler-eye"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
              <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
            </svg>
          </button>
        </div>
      </div>
      <footer className="border-t dark:border-zinc-800 border-zinc-200 mt-2">
        <div className="border mt-2 px-2 py-1 dark:border-zinc-800 text-black dark:text-white rounded-md border-zinc-200">
          <select
            name="font"
            id="font"
            value={newFontFamily}
            onChange={(e) => setNewFontFamily(e.target.value)}
            className="text-[14px] outline-none bg-white dark:bg-zinc-900 w-full"
          >
            {fonts.map((font) => (
              <option
                key={font.id}
                className="capitalize"
                value={font.fontFamily}
              >
                {font.fontFamily}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <input
            className="border outline-none py-1 dark:border-zinc-800 dark:text-white text-black border-zinc-200 text-[14px] px-2 rounded-md"
            type="text"
            name="size"
            id="size"
            value={newSize}
            onChange={(e) => setNewSize(e.target.value)}
          />
          <div className="border px-3 py-1 rounded-md dark:border-zinc-800 text-black dark:text-white border-zinc-200">
            <select
              name="font"
              id="font"
              value={newWeight}
              onChange={(e) => setNewWeight(e.target.value)}
              className="text-[14px] bg-white dark:bg-zinc-900 outline-none w-full"
            >
              <option value="100">Thin</option>
              <option value="200">Extra Light</option>
              <option value="300">Light</option>
              <option value="400">Regular</option>
              <option value="500">Medium</option>
              <option value="600">Semi Bold</option>
              <option value="700">Bold</option>
              <option value="800">Extra Bold</option>
              <option value="900">Black</option>
            </select>
          </div>
          <div className="border col-span-full flex items-center gap-2 px-2 py-1.5 rounded-md dark:border-zinc-800 border-zinc-200">
            <button
              ref={buttonRef}
              onClick={() => showPicker !== "on" && setShowPicker("on")}
              style={{
                backgroundColor: newColor,
              }}
              className="w-5 h-5 border dark:border-zinc-600 border-zinc-300 rounded-sm"
            ></button>
            <p className="uppercase text-[13px] dark:text-white text-zinc-700">
              {newColor}
            </p>
          </div>
          <div className="col-span-full">
            <button
              onClick={handleDelete}
              type="button"
              className="text-[13px] border cursor-pointer dark:text-white bg-red-400/30 border-red-300 transition-all hover:bg-red-400/50 text-red-500 font-medium py-1 w-full rounded-md"
            >
              Deletar
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

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
          <h2 className="font-semibold text-lg dark:text-white text-zinc-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="7.99497802734375 23.9994189453125 321 57"
              className="w-24"
            >
              <g fill="currentColor">
                <path d="M23.998 79.999L23.998 47.989L35.995 47.989L35.995 40.003L23.998 40.003L23.998 31.983L40.005 31.983L40.005 23.999L19.988 23.999L15.978 27.976L15.978 40.006L7.995 40.006L7.995 47.992L15.978 47.992L15.978 79.999ZM83.995 79.999L88.005 76.023L88.005 43.979L83.995 40.003L59.968 40.003L55.995 43.979L55.995 76.023L59.968 79.999ZM63.978 72.016L63.978 47.992L79.985 47.992L79.985 72.016ZM103.995 80.002L111.978 80.002L111.978 47.992L127.985 47.992L127.985 79.999L136.005 79.999L136.005 43.979L131.995 40.003L107.968 40.003L103.995 43.979ZM165.993 79.996L182 79.996L182 72.013L170.003 72.013L170.003 47.989L182 47.989L182 40.003L170.003 40.003L170.003 23.999L161.983 23.999L161.983 40.006L154 40.006L154 47.992L161.983 47.992L161.983 76.023L165.993 79.999ZM232.005 79.999L232.005 72.016L207.978 72.016L207.978 63.996L227.995 63.996L232.005 60.020L232.005 43.979L227.995 40.003L203.968 40.003L199.995 43.979L199.995 76.023L203.968 79.999ZM207.978 56.009L207.978 47.989L223.985 47.989L223.985 56.009ZM257.983 79.999L257.983 47.989L269.980 47.989L269.980 56.009L278 56.009L278 40.003L253.973 40.003L250 43.979L250 79.999ZM323.995 79.999L328.005 76.023L328.005 43.979L323.995 40.003L299.968 40.003L295.995 43.979L295.995 76.023L299.968 79.999ZM303.978 72.016L303.978 47.992L319.985 47.992L319.985 72.016Z" />
              </g>
            </svg>
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
