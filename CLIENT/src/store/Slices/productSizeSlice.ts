import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../action";

//create Thunk

const productSizeSlice = createSlice({
  name: "productSizes",
  initialState: {
    productSizes: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actions.getApiProductSizes.pending, (state: any, action) => {
      state.productSizes  = action.payload;
    });
    builder.addCase(actions.getApiProductSizes.fulfilled, (state: any, action) => {
      state.productSizes  = action.payload;
    });
    builder.addCase(actions.getApiProductSizes.rejected, (state: any, action) => {
      state.productSizes  = action.payload;
    });
  },
});

export default productSizeSlice.reducer;
