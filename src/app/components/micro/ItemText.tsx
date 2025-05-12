import { removeText, updateText } from "@/app/Redux/slices/textsSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import PickerModal from "../PickerModal";

interface UploadFontsProps {
  id: number;
  fontFamily: string;
  fontData: string;
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

export default ItemText;
