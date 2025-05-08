import React, { useEffect, useRef, useState } from "react";

type AutoSizeTextProps = {
  value: string;
  onChange: (value: string) => void;
  fontSize?: number;
  fontFamily?: string;
};

 const AutoSizeText: React.FC<AutoSizeTextProps> = ({
  value,
  onChange,
  fontSize = 16,
  fontFamily = "sans-serif",
}) => {
  const spanRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 50, height: 20 });

  const style = {
    fontSize: `${fontSize}px`,
    fontFamily: fontFamily,
    whiteSpace: "pre-wrap" as const,
    wordBreak: "break-word" as const,
    lineHeight: 1.2,
    padding: 0,
  };

  useEffect(() => {
    if (spanRef.current) {
      const rect = spanRef.current.getBoundingClientRect();
      setSize({ width: rect.width + 1, height: rect.height + 1 });
    }
  }, [value, fontSize, fontFamily]);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* Hidden mirror */}
      <div
        ref={spanRef}
        style={{
          ...style,
          visibility: "hidden",
          position: "absolute",
          top: 0,
          left: 0,
          whiteSpace: "pre-wrap",
          overflowWrap: "break-word",
        }}
      >
        {value || " "}
      </div>

      {/* Actual textarea */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          ...style,
          width: size.width,
          height: size.height,
          resize: "none",
          overflow: "hidden",
          border: "1px solid #ccc",
          background: "transparent",
        }}
      />
    </div>
  );
};

export default AutoSizeText;
