"use client";

import { useEffect, useRef, useState } from "react";
import PickerModal from "../PickerModal";
import AddTextArea from "../micro/AddTextArea";

type TextProps = "off" | "on" | "none";

interface TextArrProps {
  id: number;
  text: string;
  size: string;
  fontFamily: string;
  color: string;
  weight: string;
}

interface CentralPannelProps {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  showPicker: string;
  setShowPicker: React.Dispatch<React.SetStateAction<string>>;
  ref: React.RefObject<HTMLDivElement | null>;
  setAddText: React.Dispatch<React.SetStateAction<TextProps>>;
  showAddText: string;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  texts: TextArrProps[];
  setTexts: React.Dispatch<React.SetStateAction<TextArrProps[]>>;
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
  texts,
  setTexts,
}) => {
  const addTextRef = useRef<HTMLTextAreaElement | null>(null);
  const [selected, setSelected] = useState<boolean>(false);
  const refBoxText = useRef<HTMLDivElement | null>(null);
  const [idSelected, setIdSelected] = useState<number | null>(null);

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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        refBoxText.current &&
        !refBoxText.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node) &&
        selected
      ) {
        setSelected(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refBoxText, selected, buttonRef]);

  const addNewText = (text: string) => {
    const newText = {
      id: texts.length > 0 ? texts[texts.length - 1].id + 1 : 1,
      text: text,
      size: "16",
      fontFamily: "sans-serif",
      color: "#000000",
      weight: "400",
    };

    setTexts((prevTexts) => [...prevTexts, newText]);
    setAddText("off");
  };

  return (
    <div
      style={{
        backgroundColor: color,
      }}
      className="relative h-screen"
    >
      <PickerModal
        ref={ref}
        showPicker={showPicker}
        setShowPicker={setShowPicker}
        color={color}
        setColor={setColor}
      />

      <AddTextArea
        addNewText={addNewText}
        showAddText={showAddText}
        setAddText={setAddText}
        addTextRef={addTextRef}
      />

      <div className="h-screen overflow-y-auto w-full flex flex-col gap-2 items-center justify-center">
        {texts.map((text, index) => (
          <div
            ref={refBoxText}
            key={index}
            style={{
              fontSize: parseInt(text.size) + "px",
              fontFamily: text.fontFamily,
              color: text.color,
              fontWeight: parseInt(text.weight),
            }}
            className={`select-none cursor-pointer relative py-1 px-3 ${
              selected && idSelected === text.id ? "border border-zinc-200 rounded-lg" : ""
            }`}
            onClick={() => {
              setSelected(true)
              setIdSelected(text.id)
            }}
          >
            {text.text}
            {selected && idSelected === text.id && (
              <button className="absolute text-[13px] font-normal -top-5 -right-16 transition-all hover:opacity-90 text-white border bg-blue-500 rounded-lg py-1 px-2">
                Editar texto
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CentralPannel;
