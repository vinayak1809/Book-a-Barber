import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  login: true,
};

export const useroptionLogin = createAsyncThunk(
  "user/optionLogin",
  async (options) => {
    if (!options) {
      return false;
    } else {
      return true;
    }
  }
);

export const userOptionSlice = createSlice({
  name: "userOption",
  initialState,
  extraReducers: {
    [useroptionLogin.fulfilled]: (state, action) => {
      state.login = action.payload;
    },
    //[useroptionLogin.pending]: (state, action) => {
    //  console.log("prending");
    //},
  },
});

export const userOptionReducer = userOptionSlice.reducer;
