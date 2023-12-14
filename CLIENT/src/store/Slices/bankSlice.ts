import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../action";

//create Thunk

const bankSlice = createSlice({
  name: "banks",
  initialState: {
    banks: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actions.getApiBank.pending, (state: any, action) => {
      state.banks = action.payload;
    });
    builder.addCase(actions.getApiBank.fulfilled, (state: any, action) => {
      state.banks = action.payload;
    });
    builder.addCase(actions.getApiBank.rejected, (state: any, action) => {
      state.banks = action.payload;
    });
  },
});

export default bankSlice.reducer;
