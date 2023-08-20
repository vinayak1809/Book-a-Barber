import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  success: "",
  user: {
    fullname: "",
    email: "",
    password: "",
    profilepicture: "",
    role: "",
    contactinformation: "",
  },
  token: "",
  orders: [],
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
      throw error;
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
      // Store the token in a cookie
      document.cookie = `token=${response.data.token}; path=/;`;

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const checkForUser_Token = createAsyncThunk(
  "user/checkForUser_Token",
  async () => {
    try {
      const response = await axios.get("http://localhost:4000/checkForUser", {
        withCredentials: true,
      });
      console.log(response.data, "dhdhd");
      return response.data;
    } catch (error) {
      console.log(error, "error in check for use token");
    }
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  try {
    const response = await axios.get("http://localhost:4000/logout", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error, "error in logout");
  }
});

export const getUserOrders = createAsyncThunk(
  "user/getUserOrders",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/get-user-orders",
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error, "error in get user orders");
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
      return { ...action.payload };
    },
    [checkForUser_Token.fulfilled]: (state, action) => {
      return { ...action.payload };
    },
    [getUserOrders.fulfilled]: (state, action) => {
      return { ...state, ...action.payload };
    },
    [logout.fulfilled]: (state, action) => {
      return { ...action.payload };
    },
  },
});

export const userReducer = userSlice.reducer;
