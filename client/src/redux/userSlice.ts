import { createSlice } from "@reduxjs/toolkit";
import { searchAndPaging } from "../services/user.services";

const userSlice: any = createSlice({
  name: "user",
  initialState: { data: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchAndPaging.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchAndPaging.fulfilled, (state, action) => {
        state.status = "successfully";
        state.data = action.payload;
      })
      .addCase(searchAndPaging.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error as any;
      });
  },
});

export default userSlice.reducer;
