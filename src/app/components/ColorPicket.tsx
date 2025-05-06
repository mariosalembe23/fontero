// components/ColorPicker.tsx
"use client";

import { HexColorPicker } from "react-colorful";
import React from "react";

const ColorPicker: React.FC<{
  setColor: React.Dispatch<React.SetStateAction<string>>;
  color: string;
}> = ({ setColor, color }) => {
  return (
    <div className="p-4 space-y-4">
      <HexColorPicker color={color} onChange={setColor} />
    </div>
  );
};
export default ColorPicker;
