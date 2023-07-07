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
    console.log(userDetails, "userDetails");
    const user = await axios.post("/registerUser", userDetails);
    return user;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [createUser.fulfilled]: (state, action) => {
      return;
    },
  },
});

export const userReducer = userSlice.reducer;
