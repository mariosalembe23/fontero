"use client";

import { useEffect, useRef } from "react";
import PickerModal from "../PickerModal";

type TextProps = "off" | "on" | "none";

interface CentralPannelProps {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  showPicker: string;
  setShowPicker: React.Dispatch<React.SetStateAction<string>>;
  ref: React.RefObject<HTMLDivElement | null>;
  setAddText: React.Dispatch<React.SetStateAction<TextProps>>;
  showAddText: string;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
}

const CentralPannel: React.FC<CentralPannelProps> = ({
  color,
  setColor,
  showPicker,
  setShowPicker,
  ref,
  setAddText,
  showAddText,
  buttonRef,
}) => {
  const addTextRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        addTextRef.current &&
        !addTextRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node) &&
        showAddText === "on"
      ) {
        setAddText("off");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [addTextRef, showAddText, buttonRef, setAddText]);

  return (
    <div
      style={{
        backgroundColor: color,
      }}
      className="relative h-full"
    >
      <PickerModal
        ref={ref}
        showPicker={showPicker}
        setShowPicker={setShowPicker}
        color={color}
        setColor={setColor}
      />

      <aside
        ref={addTextRef}
        className={`fixed ${showAddText === "off" && "addTextOff"} ${
          showAddText === "none" && "addTextNone"
        } ${showAddText === "on" && "addTextOn"}  ${
          showAddText !== "none" &&
          showAddText !== "on" &&
          showAddText !== "off" &&
          "translate-y-[200%]"
        }  bottom-5 p-3 left-1/2 -translate-x-1/2 bg-white gap-2 flex flex-col border border-zinc-200 rounded-xl shadow-md w-[23%]`}
      >
        <div className="flex items-center justify-between">
          <label
            htmlFor="new_text"
            className="text-[14px] font-medium text-zinc-700"
          >
            Adicione um texto
          </label>
        </div>
        <textarea
          placeholder="Escreva um texto..."
          className="border-zinc-300 text-[15px] outline-none border rounded-md resize-none p-3"
          name="new_text"
          id="new_text"
        ></textarea>
        <button className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition-colors duration-200 cursor-pointer">
          Adicionar
        </button>
      </aside>

      <div className="h-full w-full flex items-center justify-center overflow-y-auto"></div>
    </div>
  );
};

export default CentralPannel;
