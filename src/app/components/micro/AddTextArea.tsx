import { updateText } from "@/app/Redux/slices/textsSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

type TextProps = "off" | "on" | "none";

interface TextArrProps {
  id: number;
  text: string;
  size: string;
  fontFamily: string;
  color: string;
  weight: string;
}

const AddTextArea: React.FC<{
  showAddText: string;
  setAddText: React.Dispatch<React.SetStateAction<TextProps>>;
  addTextRef: React.RefObject<HTMLTextAreaElement | null>;
  addNewText: (text: string) => void;
  data?: TextArrProps | null;
  editMode: boolean;
}> = ({ showAddText, setAddText, addTextRef, addNewText, editMode, data }) => {
  const [text, setText] = React.useState<string>("");
  const [valid, setValid] = React.useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      setText(data.text);
    }
  }, [data]);

  useEffect(() => {
    if (text.length > 0 || (data?.text !== text && editMode)) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [text, data, editMode]);

  const handleEditText = (id: number) => {
    dispatch(
      updateText({
        id: id,
        text: text,
        size: data?.size || "16px",
        fontFamily: data?.fontFamily.trim() || "Roboto",
        color: data?.color || "#000000",
        weight: data?.weight || "400",
      })
    );
  };

  const multipleFunc = () => {
    if (editMode) {
      if (data?.id !== undefined) {
        handleEditText(data.id);
      }
    }
    if (!editMode) {
      addNewText(text);
    }
    setText("");
    setValid(false);
    setAddText("off");
  };

  return (
    <aside
      ref={addTextRef}
      className={`fixed ignore-click z-30 ${
        showAddText === "off" && "addTextOff"
      } ${showAddText === "none" && "addTextNone"} ${
        showAddText === "on" && "addTextOn"
      }  ${
        showAddText !== "none" &&
        showAddText !== "on" &&
        showAddText !== "off" &&
        "translate-y-[200%]"
      }  bottom-5 p-3 left-1/2 -translate-x-1/2 bg-white gap-2 flex flex-col border border-zinc-200 rounded-xl shadow-md w-[23%]`}
    >
      <div className="flex ignore-click items-center justify-between">
        <label
          htmlFor="new_text"
          className="text-[14px] font-medium text-zinc-700"
        >
          {editMode ? "Editae seu texto" : "Adicionar novo texto"}
        </label>
      </div>
      <textarea
        placeholder="Escreva um texto..."
        className="border-zinc-300 ignore-click focus:border-blue-500 text-[15px] outline-none border rounded-md resize-none p-3"
        name="new_text"
        id="new_text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button
        disabled={!valid}
        type="button"
        onClick={multipleFunc}
        className="bg-blue-500 ignore-click disabled:opacity-40 disabled:hover:bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition-colors duration-200 cursor-pointer"
      >
        {editMode ? "Editar texto" : "Adicionar texto"}
      </button>
    </aside>
  );
};

export default AddTextArea;
