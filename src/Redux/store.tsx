import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./Slice/modalSlice";
import loaderReducer from "./Slice/loaderSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    loader:loaderReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;