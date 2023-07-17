import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  fullname: "",
  email: "",
  password: "",
  profilepicture: "",
  role: "",
  contactinformation: "",
};

export const createUser = createAsyncThunk(
  "user/PostUserDetails",
  async (userDetails) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/registerUser",
        userDetails
      );
      return response.data;
    } catch (error) {
      throw error; //
    }
  }
);

export const checkUser = createAsyncThunk(
  "user/checkUserDetails",
  async (userDetails) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/checkUser",
        userDetails
      );
      return response;
    } catch (error) {
      throw error; //
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [createUser.fulfilled]: (state, action) => {
      return;
    },
    [checkUser.fulfilled]: (state, action) => {
      return { ...action.payload.data };
    },
  },
});

export const userReducer = userSlice.reducer;
