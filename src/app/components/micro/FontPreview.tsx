// components/FontPreview.tsx
import React, { useRef, useState } from "react";

export const FontPreview: React.FC = () => {
  const [fontName, setFontName] = useState<string | null>(null);
  const [text, setText] = useState("Digite algo aqui...");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFontUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {
      const fontData = event.target?.result;
      if (!fontData) return;

      // Extrai o nome do arquivo sem extensão e espaços
      const rawName = file.name.replace(/\.[^/.]+$/, ""); // Remove extensão
      const safeName = rawName.replace(/\s+/g, "-"); // Substitui espaços por hífen

      // Injeta a @font-face no <head>
      const style = document.createElement("style");
      style.innerHTML = `
        @font-face {
          font-family: '${safeName}';
          src: url(${fontData}) format('truetype');
        }
      `;
      document.head.appendChild(style);
      setFontName(safeName);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept=".ttf,.woff,.woff2,.otf"
        onChange={handleFontUpload}
      />

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          fontFamily: fontName || " Roboto",
          fontSize: 24,
          marginTop: 20,
          width: "100%",
          height: "200px",
          border: "1px solid #ccc",
          padding: 10,
          resize: "none",
        }}
      />

      {fontName && (
        <p style={{ fontFamily: fontName }}>Usando fonte: {fontName}</p>
      )}
    </div>
  );
};
