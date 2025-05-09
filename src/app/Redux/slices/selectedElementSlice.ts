import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TextArrProps {
  id: number;
  text: string;
  size: string;
  fontFamily: string;
  color: string;
  weight: string;
}

const initialState: TextArrProps | null = null;

const selectedElementSlice = createSlice({
  name: "selectedElement",
  initialState,
  reducers: {
    setSelectedElement: (state, action: PayloadAction<TextArrProps | null>) => {
      if (action.payload !== null) {
        if (state) {
          Object.assign(state, action.payload);
        }
      } else {
        return null;
      }
    },
    clearSelectedElement: () => {
      return null;
    },
  },
});

export const { setSelectedElement, clearSelectedElement } =
  selectedElementSlice.actions;
export default selectedElementSlice.reducer;
