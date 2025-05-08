import Link from "next/link";
import React, { useEffect } from "react";
import PickerModal from "../PickerModal";
import "tippy.js/dist/tippy.css";

type TextProps = "off" | "on" | "none";

interface ItemTextArrProps {
  id: number;
  text: string;
  size: string;
  fontFamily: string;
  color: string;
  weight: string;
  setTexts: React.Dispatch<React.SetStateAction<TextArrProps[]>>;
  fonts: UploadFontsProps[];
}

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

interface LeftPannelProps {
  color: string;
  showPicker: string;
  setShowPicker: React.Dispatch<React.SetStateAction<string>>;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  setAddText: React.Dispatch<React.SetStateAction<TextProps>>;
  showAddText: string;
  buttonRefAddText: React.RefObject<HTMLButtonElement | null>;
  texts: TextArrProps[];
  setTexts: React.Dispatch<React.SetStateAction<TextArrProps[]>>;
  fonts: UploadFontsProps[];
  spaceBetweenTexts: string;
  setSpaceBetweenTexts: React.Dispatch<React.SetStateAction<string>>;
}

const ItemText: React.FC<ItemTextArrProps> = ({
  id,
  text,
  color,
  fontFamily,
  size,
  weight,
  setTexts,
  fonts,
}) => {
  const [newColor, setNewColor] = React.useState<string>(color);
  const [newFontFamily, setNewFontFamily] = React.useState<string>(fontFamily);
  const [newSize, setNewSize] = React.useState<string>(size);
  const [newWeight, setNewWeight] = React.useState<string>(weight);
  const [showPicker, setShowPicker] = React.useState<string>("none");
  const refAddColor = React.useRef<HTMLDivElement | null>(null);
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (newColor !== color) {
      setTexts((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, color: newColor } : item
        )
      );
    }
    if (newFontFamily !== fontFamily) {
      setTexts((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, fontFamily: newFontFamily } : item
        )
      );
    }
    if (newSize !== size) {
      setTexts((prev) =>
        prev.map((item) => (item.id === id ? { ...item, size: newSize } : item))
      );
    }
    if (newWeight !== weight) {
      setTexts((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, weight: newWeight } : item
        )
      );
    }
  }, [
    newColor,
    color,
    id,
    setTexts,
    newFontFamily,
    fontFamily,
    newSize,
    size,
    newWeight,
    weight,
  ]);

  const handleDelete = () => {
    setTexts((prev) => prev.filter((item) => item.id !== id));
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
    <div className="w-full cursor-pointer px-3 border-zinc-200 bg-gray-50 rounded-lg border transition-all py-2">
      <PickerModal
        ref={refAddColor}
        showPicker={showPicker}
        setShowPicker={setShowPicker}
        color={newColor}
        setColor={setNewColor}
      />

      <div className=" flex items-center justify-between">
        <div className="w-[70%] truncate ps-1 text-start">
          <p className="truncate text-zinc-600 text-[15px]">{text}</p>
        </div>
        <div className="flex items-center justify-center">
          <button className="text-zinc-400 cursor-pointer transition-all hover:text-zinc-700">
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
      <footer className="border-t border-zinc-200 mt-2">
        <div className="border mt-2 px-2 py-1  rounded-md border-zinc-200">
          <select
            name="font"
            id="font"
            value={newFontFamily}
            onChange={(e) => setNewFontFamily(e.target.value)}
            className="text-[14px] outline-none w-full"
          >
            {fonts.map((font) => (
              <option key={font.id} value={font.fontFamily}>
                {font.fontFamily}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <input
            className="border outline-none py-1 border-zinc-200 text-[14px] px-2 rounded-md"
            type="text"
            name="size"
            id="size"
            value={newSize}
            onChange={(e) => setNewSize(e.target.value)}
          />

          <div className="border  px-3 py-1  rounded-md border-zinc-200">
            <select
              name="font"
              id="font"
              value={newWeight}
              onChange={(e) => setNewWeight(e.target.value)}
              className="text-[14px] outline-none w-full"
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

          <div className="border flex items-center gap-1 px-1 py-1  rounded-md border-zinc-200">
            <button
              ref={buttonRef}
              onClick={() => showPicker !== "on" && setShowPicker("on")}
              style={{
                backgroundColor: newColor,
              }}
              className="w-5 h-5 border border-zinc-300  rounded-sm"
            ></button>
            <p className="uppercase text-[13px] text-zinc-700">{newColor}</p>
          </div>
          <div>
            <button
              onClick={handleDelete}
              type="button"
              className="text-[13px] border cursor-pointer bg-red-400/30 border-red-300 transition-all hover:bg-red-400/50 text-red-500 font-medium py-1 w-full rounded-md"
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
  texts,
  setTexts,
  fonts,
  setSpaceBetweenTexts,
  spaceBetweenTexts,
}) => {
  return (
    <div className="border-r h-screen border-zinc-200 flex items-start flex-col justify-between  py-8">
      <section className="w-full">
        <header className="px-5 flex items-center justify-between">
          <h2 className=" font-semibold text-lg text-zinc-900">fonteiro</h2>
          <button className="w-7 h-7 rounded-full border text-blue-500 border-zinc-200 flex items-center justify-center bg-zinc-50">
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
        </header>
        <section className="border-t px-5 w-full border-zinc-200 mt-4 pt-4">
          <h2 className="text-zinc-700 font-medium text-[15px]">Página</h2>
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
          <div>
            <label
              htmlFor="space-bet"
              className="text-zinc-700 text-[14px] font-medium mt-4 flex items-center gap-2"
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
              className="border outline-none py-1 border-zinc-200 text-[14px] px-2 rounded-md mt-2 w-[30%]"
            />
          </div>
        </section>
      </section>
      <section className="border-t pb-5 px-5 h-full overflow-y-auto w-full border-zinc-200 mt-7 pt-4">
        <h2 className="text-zinc-700 font-medium text-[15px]">Designs</h2>
        {texts.length === 0 && (
          <p className="text-zinc-500 text-[13px] pe-4">
            Sem textos adicionados, tente adicionar um texto.
          </p>
        )}
        <div className="mt-3 ">
          <header className="mb-2 flex flex-col gap-2">
            {texts.length > 0 &&
              texts.map((text) => (
                <ItemText
                  key={text.id}
                  text={text.text}
                  size={text.size}
                  fontFamily={text.fontFamily}
                  color={text.color}
                  weight={text.weight}
                  id={text.id}
                  setTexts={setTexts}
                  fonts={fonts}
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
      <footer className="px-7 pt-4 border-t border-zinc-200 w-full">
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
          <Link
            href={"/"}
            className="flex text-zinc-700 transition-all hover:text-blue-500 border border-zinc-300 items-center w-8 h-8 rounded-full bg-zinc-100 justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="icon icon-tabler icons-tabler-filled icon-tabler-brand-dribbble"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M14.384 14.38a22.877 22.877 0 0 1 1.056 4.863l.064 .644l.126 1.431a10 10 0 0 1 -9.15 -.98l2.08 -2.087l.246 -.24c1.793 -1.728 3.41 -2.875 5.387 -3.566l.191 -.065zm6.09 -.783l.414 .003l.981 .014a9.997 9.997 0 0 1 -4.319 6.704l-.054 -.605c-.18 -2.057 -.55 -3.958 -1.163 -5.814c1.044 -.182 2.203 -.278 3.529 -.298l.611 -.004zm-7.869 -3.181a24.91 24.91 0 0 1 1.052 2.098c-2.276 .77 -4.142 2.053 -6.144 3.967l-.355 .344l-2.236 2.24a10 10 0 0 1 -2.917 -6.741l-.005 -.324l.004 -.25h1.096l.467 -.002c3.547 -.026 6.356 -.367 8.938 -1.295l.1 -.037zm9.388 1.202l-1.515 -.02c-1.86 -.003 -3.45 .124 -4.865 .402a26.112 26.112 0 0 0 -1.163 -2.38c1.393 -.695 2.757 -1.597 4.179 -2.75l.428 -.354l.816 -.682a10 10 0 0 1 2.098 5.409l.022 .375zm-14.663 -8.46l1.266 1.522c1.145 1.398 2.121 2.713 2.949 3.985c-2.26 .766 -4.739 1.052 -7.883 1.081l-.562 .004h-.844a10 10 0 0 1 5.074 -6.593zm9.67 .182c.53 .306 1.026 .657 1.483 1.046l-1.025 .857c-1.379 1.128 -2.688 1.993 -4.034 2.649c-.89 -1.398 -1.943 -2.836 -3.182 -4.358l-.474 -.574l-.485 -.584a10 10 0 0 1 7.717 .964z" />
            </svg>
          </Link>
        </header>
        <footer className="mt-3">
          <p className="text-[15px] text-zinc-600">Mário Salembe</p>
        </footer>
      </footer>
    </div>
  );
};

export default LeftPannel;
