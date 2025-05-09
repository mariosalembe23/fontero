import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TextArrProps {
  id: number;
  text: string;
  size: string;
  fontFamily: string;
  color: string;
  weight: string;
}

const initialState: TextArrProps[] = [];

const textsSlice = createSlice({
  name: "texts",
  initialState,
  reducers: {
    addText: (state, action: PayloadAction<TextArrProps>) => {
      state.push(action.payload);
      console.log("state ADICIONADO", action.payload);
    },
    updateText: (state, action: PayloadAction<TextArrProps>) => {
      const index = state.findIndex((text) => text.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
      console.log("state", action.payload);
    },
    removeText: (state, action: PayloadAction<number>) => {
      return state.filter((text) => text.id !== action.payload);
    },
  },
});

export const { addText, updateText, removeText } = textsSlice.actions;
export default textsSlice.reducer;