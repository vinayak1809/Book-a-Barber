import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  login: true,
};

export const useroptionLogin = createAsyncThunk(
  "user/optionLogin", //type name
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
  },
});

export const userOptionReducer = userOptionSlice.reducer;
