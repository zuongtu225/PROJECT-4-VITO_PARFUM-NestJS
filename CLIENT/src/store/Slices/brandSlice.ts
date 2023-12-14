import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../action";

//create Thunk

const brandSlice = createSlice({
  name: "brands",
  initialState: {
    brands: [],
    brandDetail: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actions.getApiBrands.pending, (state: any, action) => {
      state.brands = action.payload;
    });
    builder.addCase(actions.getApiBrands.fulfilled, (state: any, action) => {
      state.brands = action.payload;
    });
    builder.addCase(actions.getDetailBrand.fulfilled, (state: any, action) => {
      state.brandDetail = action.payload;
    });
    builder.addCase(actions.getApiBrands.rejected, (state: any, action) => {
      state.brands = action.payload;
    });
  },
});

export default brandSlice.reducer;
