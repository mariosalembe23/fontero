import { addFont } from "@/app/Redux/slices/fontsSlice";
import { Dispatch } from "@reduxjs/toolkit";

interface UploadFontsProps {
  fontFamily: string;
  path: string;
  dispatch: Dispatch;
}

const loadDefaultFont = async ({
  fontFamily,
  path,
  dispatch,
}: UploadFontsProps) => {
  const fontUrl = path || "/fonts/Roboto.ttf";
  const response = await fetch(fontUrl);

  if (!response.ok) {
    console.error("Erro ao carregar a fonte Roboto:", response.statusText);
    return;
  }

  const fontData = await response.blob();
  const reader = new FileReader();

  reader.onload = (event) => {
    const base64Font = event.target?.result as string;

    if (!base64Font) {
      console.error("Erro ao converter a fonte para base64.");
      return;
    }

    dispatch(
      addFont({
        id: Date.now(),
        fontFamily: fontFamily.trim() || "Roboto",
        fontData: base64Font,
      })
    );

    const style = document.createElement("style");
    style.id = `font-${fontFamily.trim()}` || `font-Roboto`;
    style.innerHTML = `
          @font-face {
            font-family: ${fontFamily || "Roboto"};
            src: url(${base64Font}) format('truetype');
          }
        `;
    document.head.appendChild(style);
  };

  reader.readAsDataURL(fontData);
};

export default loadDefaultFont;
