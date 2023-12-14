import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../action";

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    userDetail: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actions.getApiUsers.pending, (state: any, action) => {
      state.users = action.payload;
    });
    builder.addCase(actions.getApiUsers.fulfilled, (state: any, action) => {
      state.users = action.payload;
    });
    builder.addCase(actions.getDetailUser.fulfilled, (state: any, action) => {
      state.userDetail = action.payload;
    });
    builder.addCase(actions.getApiUsers.rejected, (state: any, action) => {
      state.users = action.payload;
    });
  },
});
export default userSlice.reducer;
