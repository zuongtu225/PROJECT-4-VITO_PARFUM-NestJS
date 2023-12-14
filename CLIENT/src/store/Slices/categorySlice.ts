import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../action";

//create Thunk

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    categoryDetail: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actions.getApiCategories.pending, (state: any, action) => {
      state.categories = action.payload;
    });
    builder.addCase(
      actions.getApiCategories.fulfilled,
      (state: any, action) => {
        state.categories = action.payload;
      }
    );
    builder.addCase(
      actions.getDetailCategory.fulfilled,
      (state: any, action) => {
        state.categoryDetail = action.payload;
      }
    );
    builder.addCase(actions.getApiCategories.rejected, (state: any, action) => {
      state.categories = action.payload;
    });
  },
});

export default categorySlice.reducer;
