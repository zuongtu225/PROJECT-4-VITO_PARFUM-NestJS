import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../action";

//create Thunk

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    productDetail: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actions.getApiProducts.pending, (state: any, action) => {
      state.products = action.payload;
    });
    builder.addCase(actions.getApiProducts.fulfilled, (state: any, action) => {
      state.products = action.payload;
    });
    builder.addCase(
      actions.getDetailProduct.fulfilled,
      (state: any, action) => {
        state.productDetail = action.payload;
      }
    );
    builder.addCase(actions.getApiProducts.rejected, (state: any, action) => {
      state.products = action.payload;
    });
  },
});

export default productSlice.reducer;
