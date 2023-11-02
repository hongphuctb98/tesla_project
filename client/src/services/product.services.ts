import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../api/axios";

export const fetchAllProduct = createAsyncThunk(
  "product/fetchAllProduct",
  async () => {
    const response = await instance.get(`products`);
    return response.data.data;
  }
);

export const fetchProductByCarId = createAsyncThunk(
  "product/fetchProductByCarId",
  async (id: number) => {
    const response = await instance.get(`products/${id}`);
    return response.data.data;
  }
);
