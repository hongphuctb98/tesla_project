import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import productSlice from "./productSlice";
import orderSlice from "./orderSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    product: productSlice,
    order: orderSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;
