"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Redux/store";
import { addText } from "../../Redux/slices/textsSlice";
import PickerModal from "../PickerModal";
import AddTextArea from "../micro/AddTextArea";
import { ThemeContext } from "../MainFunc/ThemeProvider";

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
  spaceBetweenTexts: string;
  setSelectedElement: React.Dispatch<React.SetStateAction<TextArrProps | null>>;
  selectedElement: TextArrProps | null;
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
  spaceBetweenTexts,
  setSelectedElement,
  selectedElement,
}) => {
  const dispatch = useDispatch();
  const texts = useSelector((state: RootState) => state.texts);

  const addTextRef = useRef<HTMLTextAreaElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const refs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const [editMode, setEditMode] = useState(false);

  const [selected, setSelected] = useState(false);
  const [idSelected, setIdSelected] = useState<number | null>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

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
      const target = event.target as HTMLElement;

      if (target.tagName === "A" || target.classList.contains("ignore-click")) {
        return;
      }

      const clickedOutside = Object.values(refs.current).every(
        (ref) => ref && !ref.contains(event.target as Node)
      );

      if (clickedOutside && selected && idSelected !== null) {
        setSelected(false);
        setIdSelected(null);
        setSelectedElement(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refs, selected, idSelected, setSelected, setSelectedElement]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function handleWheel(e: WheelEvent) {
      if (!e.ctrlKey) return;

      e.preventDefault();

      const rect = container?.getBoundingClientRect();
      if (!rect) return;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const zoomIntensity = 0.001;
      const delta = -e.deltaY * zoomIntensity;
      const newScale = Math.min(3, Math.max(0.5, scale + delta));

      const scaleRatio = newScale / scale;

      setPosition((prev) => ({
        x: mouseX - (mouseX - prev.x) * scaleRatio,
        y: mouseY - (mouseY - prev.y) * scaleRatio,
      }));

      setScale(parseFloat(newScale.toFixed(3)));
    }

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [scale]);

  useEffect(() => {}, [selectedElement]);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMousePos.x;
    const dy = e.clientY - lastMousePos.y;
    setPosition((prev) => ({
      x: prev.x + dx,
      y: prev.y + dy,
    }));
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const { theme } = useContext(ThemeContext)!;

  const addNewText = (text: string) => {
    dispatch(
      addText({
        id: Date.now(),
        text: text,
        size: "16",
        fontFamily: "Roboto",
        color: theme === "dark" ? "#ffffff" : "#000000",
        weight: "400",
      })
    );
    setAddText("off");
  };

  return (
    <div
      style={{ backgroundColor: color }}
      className="relative h-screen w-full overflow-hidden"
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
        editMode={editMode}
        data={selectedElement}
      />

      <div
        ref={containerRef}
        className="h-full w-full cursor-grab active:cursor-grabbing"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <div
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: "0 0",
            gap: `${
              parseInt(spaceBetweenTexts) > 800
                ? 800 + "px"
                : parseInt(spaceBetweenTexts) + "px"
            }`,
          }}
          className="relative w-full h-full flex flex-col items-center justify-center"
        >
          {texts.map((text) => (
            <div
              id={`text-${text.id}`}
              ref={(el) => {
                refs.current[text.id] = el;
              }}
              key={text.id}
              style={{
                fontSize: `${parseInt(text.size)}px`,
                fontFamily: text.fontFamily,
                color: text.color,
                fontWeight: parseInt(text.weight),
              }}
              className={`select-none cursor-pointer relative py-1 px-3 ${
                selected && idSelected === text.id
                  ? "border border-blue-400 rounded-lg"
                  : ""
              }`}
              onClick={() => {
                setSelected(true);
                setIdSelected(text.id);
                setSelectedElement(text);
              }}
            >
              {text.text}
              {selected && idSelected === text.id && (
                <button
                  type="button"
                  onClick={() => {
                    setEditMode(true);
                    setAddText("on");
                  }}
                  className="absolute cursor-pointer ignore-click text-[13px] font-['Inter'] font-normal -top-5 -right-16 transition-all hover:opacity-90 text-white border bg-blue-500 rounded-lg py-1 px-2"
                >
                  Editar texto
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CentralPannel;
