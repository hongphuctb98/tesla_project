import { createSlice } from "@reduxjs/toolkit";
import { orderSearchAndPaging } from "../services/order.services";

const userSlice: any = createSlice({
  name: "order",
  initialState: { data: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(orderSearchAndPaging.pending, (state) => {
        state.status = "loading";
      })
      .addCase(orderSearchAndPaging.fulfilled, (state, action) => {
        state.status = "successfully";
        state.data = action.payload;
      })
      .addCase(orderSearchAndPaging.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error as any;
      });
  },
});

export default userSlice.reducer;
