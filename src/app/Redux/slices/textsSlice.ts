import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TextArrProps {
  id: number;
  text: string;
  size: string;
  fontFamily: string;
  color: string;
  weight: string;
}

interface UpdateTextsFontPayload {
  oldFont: string;
  newFont: string;
}

const initialState: TextArrProps[] = [];

const textsSlice = createSlice({
  name: "texts",
  initialState,
  reducers: {
    addText: (state, action: PayloadAction<TextArrProps>) => {
      state.push(action.payload);
    },
    updateTextsFont: (state, action: PayloadAction<UpdateTextsFontPayload>) => {
      const { oldFont, newFont } = action.payload;
      state.forEach((text) => {
        if (text.fontFamily === oldFont) {
          text.fontFamily = newFont;
        }
      });
    },
    updateText: (state, action: PayloadAction<TextArrProps>) => {
      const index = state.findIndex((text) => text.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      } else {
        console.error("Texto com ID não encontrado:", action.payload.id);
      }
    },
    removeText: (state, action: PayloadAction<number>) => {
      return state.filter((text) => text.id !== action.payload);
    },
  },
});

export const { addText, updateText, removeText, updateTextsFont } = textsSlice.actions;
export default textsSlice.reducer;
