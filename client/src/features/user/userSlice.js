import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  success: "",
  user: {
    role: "",
  },
  token: "",
  error: "",
};

export const createUser = createAsyncThunk(
  "user/PostUserDetails",
  async (userDetails) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/registerUser",
        userDetails
      );
      return { ...response.data, error: "" };
    } catch (error) {
      return { error: "Unable to Create New User" };
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userDetails) => {
    try {
      const response = await axios.put(
        "http://localhost:4000/update-user",
        userDetails,
        {
          withCredentials: true,
        }
      );
      return { ...response.data, error: "" };
    } catch (error) {
      return { error: "Unable to Update User" };
    }
  }
);

export const checkLoginDetails = createAsyncThunk(
  "user/checkLoginDetails",
  async (userDetails) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/checkLoginDetails",
        userDetails
      );
      // Store the token in a cookie
      document.cookie = `token=${response.data.token}; path=/;`;

      return { ...response.data, error: "" };
    } catch (error) {
      return { error: error.response.data.error };
    }
  }
);

export const checkForUser_Token = createAsyncThunk(
  "user/checkForUser_Token",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/checkForUser_Token",
        {
          withCredentials: true,
        }
      );
      return { ...response.data, error: "" };
    } catch (error) {
      return { error: error.response.data.error };
      //console.log(error, "error in check for use token");
    }
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  try {
    const response = await axios.get("http://localhost:4000/logout", {
      withCredentials: true,
    });

    localStorage.removeItem("persist:root");

    return { ...response.data, error: "" };
  } catch (error) {
    return { error: "something went wrong cannot logout" };
    //console.log(error, "error in logout");
  }
});

export const paymentVerification = createAsyncThunk(
  "user/paymentVerification",
  async (response2) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/payment-verification",
        response2,
        {
          withCredentials: true,
        }
      );

      return { ...response.data, error: "" };
    } catch (error) {
      return { error: "Payment failed" };
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
    [updateUser.fulfilled]: (state, action) => {
      return { ...state, ...action.payload };
    },
    [checkLoginDetails.pending]: (state, action) => {
      state.error = "";
    },
    [checkLoginDetails.fulfilled]: (state, action) => {
      return { ...state, ...action.payload };
    },
    [checkForUser_Token.fulfilled]: (state, action) => {
      return { ...action.payload };
    },
    [logout.fulfilled]: (state, action) => {
      return { ...state, ...action.payload };
    },
    [paymentVerification.fulfilled]: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const userReducer = userSlice.reducer;
