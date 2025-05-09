import opentype from "opentype.js";
import { toast } from "sonner";

interface UploadFontsProps {
  fontFamily: string;
  fontData: string;
}

const downloadSVG = (
  text: string,
  fontFamily: string,
  fontSize: string,
  fonts: UploadFontsProps[],
  color: string // Adicione o parâmetro de cor
) => {
  const fontDataObj = fonts.find((f) => f.fontFamily === fontFamily);
  if (!fontDataObj) {
    toast.error("Fonte não encontrada para exportação.", {
      classNames: {
        toast: "!text-red-600",
      },
    });
    return;
  }

  const fontSizePx = parseInt(fontSize);

  opentype.load(fontDataObj.fontData, (err, font) => {
    if (err) {
      console.error("Erro ao carregar a fonte:", err);
      console.error("Font data:", fontDataObj.fontData);
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
          <g fill="${color}">${svgPath}</g>
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

export default downloadSVG;
