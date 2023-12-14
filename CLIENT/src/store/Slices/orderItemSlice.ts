import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../action";
const orderItemSlice = createSlice({
  name: "orderItems",
  initialState: {
    orderItems: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actions.getApiOrderItems.pending, (state: any, action) => {
      state.orderItems = action.payload;
    });
    builder.addCase(actions.getApiOrderItems.fulfilled, (state: any, action) => {
      state.orderItems = action.payload;
    });
    builder.addCase(actions.getApiOrderItems.rejected, (state: any, action) => {
      state.orderItems = action.payload;
    });
  },
});

export default orderItemSlice.reducer;
