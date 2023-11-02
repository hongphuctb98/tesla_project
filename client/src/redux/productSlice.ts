import { createSlice } from "@reduxjs/toolkit";
import { fetchAllProduct } from "../services/product.services";

const productSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    order: {},
    dataEdit: {},
    status: "idle",
    error: null,
  },
  reducers: {
    setOrder: (state, action) => {
      state.order = { ...state.order, ...action.payload };
    },
    setDataEdit: (state, action) => {
      state.dataEdit = { ...state.dataEdit, ...action.payload };
      console.log(state.dataEdit);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProduct.fulfilled, (state, action) => {
        state.status = "successfully";
        state.data = action.payload;
      })
      .addCase(fetchAllProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error as any;
      });
  },
});

export const { setOrder, setDataEdit } = productSlice.actions;
export default productSlice.reducer;
