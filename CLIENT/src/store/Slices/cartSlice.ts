import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../action";
const cartSlice = createSlice({
  name: "users",
  initialState: {
    carts: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actions.getCartByUser.pending, (state: any, action) => {
      state.carts = action.payload;
    });
    builder.addCase(actions.getCartByUser.fulfilled, (state: any, action) => {
      state.carts = action.payload;
    });
    builder.addCase(actions.getCartByUser.rejected, (state: any, action) => {
      state.carts = action.payload;
    });
  },
});

export default cartSlice.reducer;
