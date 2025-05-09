import { configureStore } from "@reduxjs/toolkit";
import textsReducer from "./slices/textsSlice";
import fontsReducer from "./slices/fontsSlice";
import selectedElementReducer from "./slices/selectedElementSlice";

const store = configureStore({
  reducer: {
    texts: textsReducer,
    fonts: fontsReducer,
    selectedElement: selectedElementReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;