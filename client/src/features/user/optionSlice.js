import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  login: true,
};

export const useroptionLogin = createAsyncThunk(
  "user/optionLogin", //type name
  async (options) => {
    if (!options) {
      return { login: false };
    } else {
      return { login: true };
    }
  }
);

export const userOptionSlice = createSlice({
  name: "userOption",
  initialState,
  extraReducers: {
    [useroptionLogin.fulfilled]: (state, action) => {
      return { ...action.payload };
    },
  },
});

export const userOptionReducer = userOptionSlice.reducer;
