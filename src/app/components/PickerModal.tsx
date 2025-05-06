"use client";

import { useEffect } from "react";
import ColorPicker from "./ColorPicket";

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


export default PickerModal;