import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UploadFontsProps {
  id: number;
  fontFamily: string;
  fontData: string;
}

const initialState: UploadFontsProps[] = [];

const fontsSlice = createSlice({
  name: "fonts",
  initialState,
  reducers: {
    addFont: (state, action: PayloadAction<UploadFontsProps>) => {
      state.push(action.payload);
    },
    removeFont: (state, action: PayloadAction<string>) => {
      return state.filter((font) => font.fontFamily !== action.payload);
    },
  },
});

export const { addFont, removeFont } = fontsSlice.actions;
export default fontsSlice.reducer;
