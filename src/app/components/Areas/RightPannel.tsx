import Link from "next/link";
import "tippy.js/dist/tippy.css";
import React, { useRef } from "react";
import { toast, Toaster } from "sonner";
import opentype from "opentype.js";

interface FontComponentProps {
  fontName: string | null;
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
  fontFamily: string;
  fontData: string;
}

const FontComponent: React.FC<FontComponentProps> = ({ fontName }) => {
  return (
    <div className="flex items-center w-full border border-zinc-300 ps-4  rounded-md justify-between gap-2">
      <p className="text-[15px] text-zinc-800">{fontName}</p>
      <button className="text-red-400 border-l border-zinc-300 transition-all hover:text-red-500 cursor-pointer hover:bg-red-400/40 rounded-r-md py-2 px-2 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon size-5 icon-tabler icons-tabler-outline icon-tabler-trash-x"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 7h16" />
          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
          <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
          <path d="M10 12l4 4m0 -4l-4 4" />
        </svg>
      </button>
    </div>
  );
};

const RightPannel: React.FC<{
  fonts: UploadFontsProps[];
  setFonts: React.Dispatch<React.SetStateAction<UploadFontsProps[]>>;
  selectedElement: TextArrProps | null;
}> = ({ fonts, setFonts, selectedElement }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFontUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {
      const fontData = event.target?.result;

      if (!fontData) return;

      const rawName = file.name.replace(/\.[^/.]+$/, "");
      const safeName = rawName.replace(/\s+/g, "-");

      const style = document.createElement("style");
      style.innerHTML = `
          @font-face {
            font-family: '${safeName}';
            src: url(${fontData}) format('truetype');
          }
        `;
      document.head.appendChild(style);
      setFonts((prevFonts) => [
        ...prevFonts,
        { fontFamily: safeName, fontData: fontData as string },
      ]);
      toast.success(`Fonte ${safeName} adicionada com sucesso!`);
    };

    reader.readAsDataURL(file);
  };

  const handleFontClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const downloadSVG = (
    text: string,
    fontFamily: string,
    fontSize: string,
  ) => {
    const fontDataObj = fonts.find((f) => f.fontFamily === fontFamily);
    if (!fontDataObj) {
      alert("Fonte não encontrada para exportação.");
      return;
    }

    const fontSizePx = parseInt(fontSize);

    opentype.load(fontDataObj.fontData, (err, font) => {
      if (err) {
        console.error("Erro ao carregar a fonte:", err);
        return;
      }

      const path = font?.getPath(text, 0, fontSizePx, fontSizePx);
      const bbox = path?.getBoundingBox();
      const svgPath = path?.toSVG(3);

      if (!bbox) {
        console.error("Bounding box is undefined.");
        return;
      }
      const width = Math.ceil(bbox.x2 - bbox.x1);
      const height = Math.ceil(bbox.y2 - bbox.y1);

      const svgContent = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="${bbox.x1} ${bbox.y1} ${width} ${height}">
          ${svgPath}
        </svg>
      `;

      const blob = new Blob([svgContent], {
        type: "image/svg+xml;charset=utf-8",
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${text}-logo.svg`;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div className="border-l h-full flex items-start flex-col justify-between border-zinc-200 px-7 py-8">
      <header>
        <h2 className=" font-medium text-zinc-900">Fontes</h2>
        <small className="text-zinc-500">
          Aqui estarão listadas todas as fontes que você adicionou ou padrões ao
          sistema.
        </small>
        <Toaster position="top-center" />
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept=".ttf,.woff,.woff2,.otf"
          onChange={handleFontUpload}
        />
        <div className="mt-4">
          <div className="grid grid-cols-1 gap-2 mb-4">
            {fonts.slice(1).map((font, index) => (
              <FontComponent key={index} fontName={font.fontFamily} />
            ))}
          </div>
          <button
            onClick={handleFontClick}
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
              className="icon size-5 icon-tabler icons-tabler-outline icon-tabler-typeface"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
              <path d="M17 17a2 2 0 0 1 -2 -2v-8h-5a2 2 0 0 0 -2 2" />
              <path d="M7 17a2.775 2.775 0 0 0 2.632 -1.897l.368 -1.103a13.4 13.4 0 0 1 3.236 -5.236l1.764 -1.764" />
              <path d="M10 14h5" />
            </svg>
            Adicionar fonte
          </button>
        </div>
        <div></div>
      </header>
      <footer className="w-full flex flex-col">
        <div className="grid grid-cols-1 my-5 items-center justify-between">
          <button
            onClick={() => {
              downloadSVG(
                selectedElement?.text || "",
                selectedElement?.fontFamily || "",
                selectedElement?.size || "",
              );
            }}
            disabled={!selectedElement}
            className="transition-all ignore-click disabled:opacity-50 disabled:hover:bg-blue-500 hover:bg-blue-600 cursor-pointer bg-blue-500 py-2 rounded-lg gap-2 text-[15px] text-white flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon size-5 icon-tabler icons-tabler-outline icon-tabler-vector-spline"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M17 3m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
              <path d="M3 17m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
              <path d="M17 5c-6.627 0 -12 5.373 -12 12" />
            </svg>{" "}
            Download
          </button>
        </div>
        <Link
          href={"/"}
          className="flex text-[15px] transition-all hover:text-black text-zinc-600 items-center justify-between w-full"
        >
          Suporte
          <span>
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
              className="icon icon-tabler icons-tabler-outline icon-tabler-help"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
              <path d="M12 17l0 .01" />
              <path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4" />
            </svg>
          </span>
        </Link>
      </footer>
    </div>
  );
};

export default RightPannel;
