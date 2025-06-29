// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./slices/adminSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
