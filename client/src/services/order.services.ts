import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../api/axios";
export const orderSearchAndPaging = createAsyncThunk(
  "user/searchAndPaging",
  async (user: any) => {
    const response = await instance.get(
      `order?keysearch=${user.keySearch}&pagenumber=${user.currentPage}&pagesize=${user.pageSize}`
    );

    return response.data.data;
  }
);
