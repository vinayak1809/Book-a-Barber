import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  success: "",
  user: {
    role: "",
  },
  token: "",
  orders: [],
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
      return response.data;
    } catch (error) {
      throw error;
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

      return response.data;
    } catch (error) {
      return error.response.data;
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
      return response.data;
    } catch (error) {
      return error.response.data;
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

    return response.data;
  } catch (error) {
    return { error: "something went wrong cannot logout" };
    //console.log(error, "error in logout");
  }
});

//Normal User
export const getUserAppointments = createAsyncThunk(
  "user/getUserAppointments",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/get-user-appointments",
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return { error: "something went wrong" };
      //console.log(error, "error in fetching user order");
    }
  }
);

//User who is a Barber
export const getBarborAppointments = createAsyncThunk(
  "user/getBarberAppointments",
  async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/get-barber-appointments/${id}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return { error: "something went wrong" };
    }
  }
);

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

      return response.data;
    } catch (error) {
      return { error: "something went wrong" };
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
    [checkLoginDetails.pending]: (state, action) => {
      state.error = "";
    },
    [checkLoginDetails.fulfilled]: (state, action) => {
      return { ...state, ...action.payload };
    },
    [checkForUser_Token.fulfilled]: (state, action) => {
      return { ...action.payload };
    },
    [getUserAppointments.fulfilled]: (state, action) => {
      return { ...state, ...action.payload };
    },
    [getBarborAppointments.fulfilled]: (state, action) => {
      return { ...state, ...action.payload };
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
