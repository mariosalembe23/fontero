"use client";

import { Provider } from "react-redux";
import store from "./Redux/store";

import { ReactNode } from "react";

const Reducer = ({ children }: { children: ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Reducer;
