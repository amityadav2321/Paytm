import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      counter: counterReducer
      // add more reducers here later
    }
  });

// A single store instance for most apps
export const store = makeStore();

// Types
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
