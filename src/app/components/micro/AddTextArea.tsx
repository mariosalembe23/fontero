import React, { useEffect } from "react";

type TextProps = "off" | "on" | "none";

const AddTextArea: React.FC<{
  showAddText: string;
  setAddText: React.Dispatch<React.SetStateAction<TextProps>>;
  addTextRef: React.RefObject<HTMLTextAreaElement | null>;
  addNewText: (text: string) => void;
}> = ({ showAddText, addTextRef, addNewText }) => {
  const [text, setText] = React.useState<string>("");
  const [valid, setValid] = React.useState<boolean>(false);

  useEffect(() => {
    if (text.length > 0) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [text]);

  return (
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
        className="border-zinc-300 focus:border-blue-500 text-[15px] outline-none border rounded-md resize-none p-3"
        name="new_text"
        id="new_text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button
        disabled={!valid}
        type="button"
        onClick={() => {
          addNewText(text);
          setText("");
        }}
        className="bg-blue-500 disabled:opacity-40 disabled:hover:bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition-colors duration-200 cursor-pointer"
      >
        Adicionar
      </button>
    </aside>
  );
};

export default AddTextArea;
