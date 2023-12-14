import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../action";

const paymentSlice = createSlice({
  name: "payments",
  initialState: {
    payments: [],
    paymentDetail: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actions.getPayments.pending, (state: any, action) => {
      state.payments = action.payload;
    });
    builder.addCase(actions.getPayments.fulfilled, (state: any, action) => {
      state.payments = action.payload;
    });
    builder.addCase(
      actions.getDetailPayment.fulfilled,
      (state: any, action) => {
        state.paymentDetail = action.payload;
      }
    );
    builder.addCase(actions.getPayments.rejected, (state: any, action) => {
      state.payments = action.payload;
    });
  },
});

export default paymentSlice.reducer;
